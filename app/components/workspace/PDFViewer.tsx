'use client';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/app/store';
import Link from 'next/link';

type WebViewerInstanceType = {
  Core: {
    documentViewer: {
      addEventListener: (event: string, callback: () => void) => void;
      removeEventListener: (event: string, callback: () => void) => void;
      loadDocument: (
        blob: Blob,
        options: { filename: string; extension: string }
      ) => Promise<void>;
    };
  };
  [key: string]: any;
};

export default function PDFViewer() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [instance, setInstance] = useState<WebViewerInstanceType | any>(null);
  const [domReady, setDomReady] = useState(false);
  const fileURL = useAppSelector((state) => state.pdf.fileURL);
  const fileMetadata = useAppSelector((state) => state.pdf.fileMetadata);

  useEffect(() => {
    setDomReady(true);
    return () => setDomReady(false);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !viewerRef.current || !domReady)
      return;

    const viewerElement = viewerRef.current;
    let isMounted = true;
    const initTimer = setTimeout(async () => {
      try {
        const WebViewer = (await import('@pdftron/webviewer')).default;
        const licenseKey = process.env.NEXT_PUBLIC_LICENSE_KEY;

        const webViewerInstance = await WebViewer(
          {
            path: '/lib/webviewer',
            licenseKey: licenseKey,
            fullAPI: true,
            disabledElements: [
              'toolsHeader',
              'searchPanel',
              'leftPanel',
              'annotationPopup',
            ],
          },
          viewerElement
        );

        if (isMounted) {
          setInstance(webViewerInstance);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to initialize PDF viewer'
          );
          setIsLoading(false);
        }
      }
    }, 10);

    return () => {
      isMounted = false;
      clearTimeout(initTimer);
    };
  }, [domReady]);

  useEffect(() => {
    if (!instance || !fileURL || !fileMetadata) return;

    let isMounted = true;
    let loadTimeoutId: NodeJS.Timeout | null = null;
    setIsLoading(true);

    const loadDocument = async () => {
      try {
        const { documentViewer } = instance.Core;

        const onDocumentLoaded = () => {
          if (isMounted) {
            setIsLoading(false);
          }
        };

        const onDocumentLoadFailure = () => {
          if (isMounted) {
            setError(
              'Failed to load the document. Please check if the file is valid.'
            );
            setIsLoading(false);
          }
        };

        documentViewer.addEventListener('documentLoaded', onDocumentLoaded);
        documentViewer.addEventListener(
          'documentLoadFailure',
          onDocumentLoadFailure
        );

        loadTimeoutId = setTimeout(() => {
          if (isMounted && isLoading) {
            setError(
              'Document loading timed out. Please try again with a different file.'
            );
            setIsLoading(false);
          }
        }, 15000);
        const response = await fetch(fileURL);
        const blob = await response.blob();

        await documentViewer.loadDocument(blob, {
          filename: fileMetadata.name,
          extension: 'pdf',
        });

        return () => {
          if (loadTimeoutId) clearTimeout(loadTimeoutId);
          documentViewer.removeEventListener(
            'documentLoaded',
            onDocumentLoaded
          );
          documentViewer.removeEventListener(
            'documentLoadFailure',
            onDocumentLoadFailure
          );
        };
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to load the document'
          );
          setIsLoading(false);
        }
        return () => {
          if (loadTimeoutId) clearTimeout(loadTimeoutId);
        };
      }
    };

    let cleanup: (() => void) | undefined;

    loadDocument()
      .then((cleanupFn) => {
        cleanup = cleanupFn;
      })
      .catch((err) => {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unexpected error loading document'
          );
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      if (cleanup) cleanup();
    };
  }, [instance, fileURL, fileMetadata, isLoading]);

  if (!fileMetadata || !fileURL) {
    return (
      <div className='flex items-center justify-center h-24 md:h-40'>
        <div className='flex flex-col items-center justify-center gap-3'>
          <p className='text-center text-gray-800 font-bold text-2xl'>
            No PDF uploaded yet.
          </p>
          <Link href='/'>
            <button className='text-white bg-[#088484] hover:bg-[#366d6d] py-2 px-8 rounded-3xl mt-5 text-xl font-semibold cursor-pointer'>
              Back Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='relative'>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-80'>
          <div className='flex flex-col items-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#088484] mb-4'></div>
            <p className='text-[#088484] font-medium'>Loading document...</p>
          </div>
        </div>
      )}

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
          <strong className='font-bold'>Error:</strong>
          <span className='block sm:inline'> {error}</span>
          <div className='mt-3'>
            <Link href='/'>
              <button className='text-white bg-[#088484] hover:bg-[#366d6d] py-2 px-8 rounded-3xl text-sm font-semibold cursor-pointer'>
                Back Home
              </button>
            </Link>
          </div>
        </div>
      )}

      <div
        id='pdf-viewer-container'
        ref={viewerRef}
        className='webviewer'
        style={{
          height: '80vh',
          width: '100%',
          display: error ? 'none' : 'block',
        }}
      ></div>
    </div>
  );
}
