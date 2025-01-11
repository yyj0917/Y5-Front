'use client';

import { Button } from '@/components/ui/button';
import { ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

type NavButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function NavButton({ children, className, ...props }: NavButtonProps) {
  return (
    <Button variant="link" className={className} {...props}>
      {children}
    </Button>
  );
}
