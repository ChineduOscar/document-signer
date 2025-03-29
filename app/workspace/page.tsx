'use client';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('../components/workspace/PDFViewer'), {
  ssr: false,
});

export default function Workspace() {
  return (
    <div className='container mx-auto p-4'>
      <PDFViewer />
    </div>
  );
}
