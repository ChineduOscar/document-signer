'use client';
import React, { useCallback, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UploadIcon from '@/app/assets/uplaodIcon';
import { useDropzone, FileRejection } from 'react-dropzone';
import { useAppDispatch } from '@/app/store';
import { setFiles } from '@/app/store/slices/pdfSlice';

interface UploadProps {
  onUploadComplete?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

const DragAndDropUpload: React.FC<UploadProps> = ({
  onUploadComplete,
  maxFiles = 1,
  maxSize = 5242880,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const fileURL = URL.createObjectURL(file);

      const fileMetadata = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      };
      dispatch(
        setFiles({
          fileMetadata,
          fileURL,
        })
      );

      router.push('/workspace');
      if (onUploadComplete) {
        onUploadComplete(acceptedFiles);
      }
    },
    [dispatch, router, onUploadComplete]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const errors = fileRejections.map((rejection) => {
      if (rejection.errors.some((error) => error.code === 'file-too-large')) {
        return `File should not be more than 5MB`;
      }
      return `${rejection.file.name}: ${rejection.errors[0].message}`;
    });
    setUploadError(errors.join('\n'));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxFiles,
    maxSize,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      <div className='border-2 border-dashed border-gray-400 p-10 rounded-3xl shadow-lg cursor-pointer hover:bg-[#366d6d] flex flex-col items-center justify-center gap-6'>
        <div className='flex flex-col items-center justify-center'>
          <UploadIcon />
          <button className='flex items-center justify-center gap-1 bg-white hover:bg-gray-200 py-2 px-8 rounded-3xl text-gray-800 mt-5 text-xl font-semibold cursor-pointer'>
            <PlusCircle size={30} className='text-gray-800' width={20} />
            <span>Upload PDF</span>
          </button>
          <p className='text-white font-medium mt-8'>
            Drop file here or click to upload
          </p>
          <p className='text-sm text-white mt-2'>
            Supported format:
            <span className='px-2 py-1 bg-red-400 rounded-full text-xs font-semibold'>
              PDF
            </span>
          </p>
          {uploadError && (
            <p className='text-red-700 mt-3 text-[18px]'>{uploadError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragAndDropUpload;
