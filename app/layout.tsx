import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from './common/header';
import ReduxProvider from '@/app/store/provider';
import Footer from './common/footer';

const outfit = Outfit({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PDF Annotator and Signer',
  description:
    'Easily upload, highlight, underline, comment, and sign your PDF documents online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${outfit.className} antialiased`}>
        <ReduxProvider>
          <Header />
          <div className='bg-white'>{children}</div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
