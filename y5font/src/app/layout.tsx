import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'sonner';
import HomeHeader from '@/components/home-header';

export const metadata: Metadata = {
  title: 'CredIT',
  description: 'Secured on BlockChain',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css"
        />
      </head>
      <body className="w-full h-[100dvh]" style={{ fontFamily: 'NanumSquareAc' }}>
        <HomeHeader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
