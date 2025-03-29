import React from 'react';
import DragAndDropUpload from './dragAndDropUplaod';

const Hero = () => {
  return (
    <section className='p-6 md:px-24 lg:px-64 py-10 md:py-20 text-center flex flex-col items-center'>
      <h1 className='text-3xl md:text-5xl font-bold text-gray-800 mb-4'>
        Annotate and Sign PDFs Easily
      </h1>
      <p className='text-lg text-gray-700 max-w-2xl mb-6'>
        Quickly upload your PDFs, highlight important sections, add comments,
        and sign documents with ease.
      </p>
      <div className='bg-[#088484] hover:bg-[#366d6d] p-3 w-full min-h-64 rounded-3xl'>
        <DragAndDropUpload />
      </div>
    </section>
  );
};

export default Hero;
