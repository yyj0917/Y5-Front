import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'sonner';
import HomeHeader from '@/components/home-header';

const fontPretendard = localFont({
  src: '../assets/fonts/pretendard-variable.woff2',
  weight: '300 800',
  display: 'swap',
  variable: '--font-pretendard',
});
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${fontPretendard.variable}`} suppressHydrationWarning>
      <body className="font-pretendard w-full">
        <HomeHeader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
