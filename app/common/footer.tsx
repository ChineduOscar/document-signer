import TelIcon from '@/app/assets/telIcon';
const Footer = () => {
  return (
    <footer className='bg-white shadow-md px-6 md:px-20 py-4 md:py-6'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div>
          <p className='font-bold text-lg text-[#088484]'>PDFAnnotate</p>
        </div>
        <div className='mt-2 md:mt-0'>
          <p className='text-gray-600 text-sm'>
            © {new Date().getFullYear()} by{' '}
            <span className='font-medium'>Oscar Chinedu</span>
          </p>
        </div>
        <div className='mt-2 md:mt-0'>
          <a
            href='tel:+2348122551232'
            className='text-xs text-gray-500 hover:text-[#088484] flex items-center'
          >
            <TelIcon />
            +234 812 255 1232
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
