import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type TextLogoProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
};

export function TextLogo({ className, href, ...props }: TextLogoProps) {
  return (
    <Link href={'/'}>
      <Button
        variant="custom"
        className={cn(
          'px-0 hover:drop-shadow-[6px_6px_6px_rgba(256,256,256,30%)] transition duration-200 ease-linear text-[26px] text-dunamuMain font-black -tracking-[0.02em] dark:text-neutral-50',
          className,
        )}
        {...props}
        asChild>
        <h1>
          <Image src="/logo.jpg" alt="logo" width={40} height={40} />
          <span>Cred</span>
          <span>IT</span>
        </h1>
      </Button>
    </Link>
  );
}
