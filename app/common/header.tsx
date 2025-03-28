import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/logo.png';

const Header = () => {
  return (
    <header className='bg-white shadow-md px-6 md:px-20 py-4 md:py-6'>
      <Link href={'/'}>
        <div className='flex gap-3 items-center'>
          <Image
            src={logo}
            alt='PDFAnnotate Logo'
            width={100}
            height={100}
            className='w-[30px] h-[30px]'
          />
          <p className='font-bold text-xl text-[#088484]'>PDFAnnotate</p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
