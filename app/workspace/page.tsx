'use client';
import '@/app/libs/pdfWorker';
import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../store';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Link from 'next/link';

const Workspace = () => {
  const file = useAppSelector((state) => state.upload.file);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        setContainerWidth(newWidth);
      }
    };

    updateWidth(); // Set initial width
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (!file) {
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
    <div className='flex flex-col items-center p-4'>
      <div
        ref={containerRef}
        className='border-2 p-2 shadow-md w-full max-w-[90vw] md:max-w-[800px] overflow-hidden'
      >
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className='w-full'
        >
          {numPages &&
            Array.from({ length: numPages }, (_, index) => (
              <Page key={index} pageNumber={index + 1} width={containerWidth} />
            ))}
        </Document>
      </div>
    </div>
  );
};

export default Workspace;
