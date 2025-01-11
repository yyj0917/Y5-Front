'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import itemImage from '@/assets/images/about-slyce/item.webp';

type AboutSlyceProps = {
  children: React.ReactNode;
  useShortcut?: boolean;
};

export function AboutCredit({ children, useShortcut = false }: AboutSlyceProps) {
  // If Dialog or Drawer is open
  const [open, setOpen] = useState(false);
  // Media Query
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  // Shortcut
  useEffect(() => {
    if (useShortcut) {
      const keyDown = (e: KeyboardEvent) => {
        if (e.key === 'k' && e.metaKey) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener('keydown', keyDown);
      return () => document.removeEventListener('keydown', keyDown);
    }
  }, [useShortcut]);

  // Tablet & Desktop
  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-200 max-w-200 max-h-[calc(100%-5rem)] py-12 px-10 bg-neutral-100 text-neutral-500 rounded-lg overflow-y-scroll scrollbar-hide">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-lg text-upBitLightBlue dark:text-neutral-50 font-extrabold tracking-wide">
              <span>WHAT IS </span>
              <span className="font-black tracking-[-0.02em]">CredIT</span>
              <span>?</span>
            </DialogTitle>
            <DialogDescription className="pt-0.5 text-sm text-neutral-800 dark:text-neutral-400 leading-[1.7]">
              CredIT은 <span className="text-upBitBlus font-bold">블록체인</span>을 활용해 글 자체와 그 출처 (인용 근거)
              를 <span className="text-upBitBlus font-bold">불변</span>형태로 기록합니다.
              <br />
              누가 언제 어떤 내용, 출처를 작성했는지 <span className="text-upBitBlus font-bold">
                임의 수정
              </span>이나 <span className="text-upBitBlus font-bold">로그 삭제</span>없이 영구 보존하는 플랫폼, CredIT을
              통해 글과 글의 출처를 분변형태로 기록하여 판별하세요.
            </DialogDescription>
          </DialogHeader>
          <ul className="mt-5 h-70 grid grid-cols-3 gap-4">
            <li className="group relative col-span-1 py-5 px-4 space-y-2 bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-700 rounded-md shadow-[0_3px_2px_0_rgba(0,0,0,0.08)] overflow-hidden">
              <h1 className="text-sm text-neutral-900 dark:text-neutral-50 font-bold">작성글 블록체인 기록</h1>
              <h2 className="text-xsb text-neutral-600 dark:text-neutral-400 font-normal">
                자신 혹은 타인이 작성한 글을 블록체인에 기록된 형태로 확인하세요.
              </h2>
            </li>
            <li className="group relative col-span-1 py-5 px-4 space-y-2 bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-700 rounded-md shadow-[0_3px_2px_0_rgba(0,0,0,0.08)] overflow-hidden">
              <h1 className="text-sm text-neutral-900 dark:text-neutral-50 font-bold">임의 수정 방지</h1>
              <h2 className="text-xsb text-neutral-600 dark:text-neutral-400 font-normal">
                블록체인에 기록된 내용은 임의로 삭제, 변경하기가 어렵기 때문에 가짜뉴스, 거짓정보 조작을 막을 수
                있습니다.
              </h2>
              {/* <FigureB className="absolute top-25 left-17 z-10" /> */}
            </li>
            <li className="group relative col-span-1 py-5 px-4 space-y-2 bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-700 rounded-md shadow-[0_3px_2px_0_rgba(0,0,0,0.08)] overflow-hidden">
              <h1 className="text-sm text-neutral-900 dark:text-neutral-50 font-bold">출처 연동</h1>
              <h2 className="text-xsb text-neutral-600 dark:text-neutral-400 font-normal">
                문장별로 인용 근거나 통계출처를 블록체인에 기록하고, 사용자는 기록된 수정사항과 출처를 투명하게 조회할
                수 있습니다.
              </h2>
              {/* <FigureC className="absolute top-25 left-8" /> */}
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[95%] bg-neutral-100 text-neutral-500">
        <div className="flex-1 overflow-y-scroll scrollbar-hide">
          <DrawerHeader className="px-4 mt-3 space-y-3">
            <DrawerTitle className="text-xl text-upBitLightBlue font-black">
              <span>WHAT IS </span>
              <span className="font-black tracking-[-0.02em]">CredIT</span>
              <span>?</span>
            </DrawerTitle>
            <DrawerDescription className="text-xs max-sm:text-xsb text-neutral-500 dark:text-neutral-400 font-light leading-[1.7]">
              CredIT은 <span className="text-upBitBlus font-bold">블록체인</span>을 활용해 글 자체와 그 출처 (인용 근거)
              를 <span className="text-upBitBlus font-bold">불변</span>형태로 기록합니다.
              <br />
              누가 언제 어떤 내용, 출처를 작성했는지 <span className="text-upBitBlus font-bold">
                임의 수정
              </span>이나 <span className="text-upBitBlus font-bold">로그 삭제</span>없이 영구 보존하는 플랫폼, CredIT을
              통해 글과 글의 출처를 분변형태로 기록하여 판별하세요.
            </DrawerDescription>
          </DrawerHeader>
          <ul className="mt-3 px-4 pb-12 flex flex-col gap-5">
            <li className="relative aspect-[5/4] max-sm:aspect-square py-4 px-5 space-y-2 bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-700 rounded-lg shadow-[0_3px_1px_0_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="absolute top-3 right-3 size-5 inline-flex items-center justify-center text-end text-xs text-neutral-400 font-bold tracking-wide">
                1/3
              </div>
              <h1 className="text-lgb text-neutral-900  font-bold">작성글 블록체인 기록</h1>
              <h2 className="text-sm text-neutral-600  font-bold">
                자신 혹은 타인이 작성한 글을 블록체인에 기록된 형태로 확인하세요.
              </h2>
              {/* <FigureA className="absolute top-[42%] -right-1 z-20 scale-[1.2] group-hover:scale-[1.3]" />
              <FigureA className="absolute top-[42%] translate-y-2 -right-4 z-10 scale-[1.2] group-hover:scale-[1.3]" /> */}
            </li>
            <li className="relative aspect-[5/4] max-sm:aspect-square py-4 px-5 space-y-2 bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-700 rounded-lg shadow-[0_3px_1px_0_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="absolute top-3 right-3 size-5 inline-flex items-center justify-center text-end text-xs text-neutral-400 font-bold tracking-wide">
                2/3
              </div>
              <h1 className="text-lgb text-neutral-900 dark:text-neutral-50 font-bold">임의 수정 방지</h1>
              <h2 className="text-xs text-neutral-600 dark:text-neutral-400 font-bold">
                블록체인에 기록된 내용은 임의로 삭제, 변경하기가 어렵기 때문에 가짜뉴스, 거짓정보 조작을 막을 수
                있습니다.
              </h2>
              {/* <FigureB className="absolute top-[45%] right-0 z-10 scale-[1.2]" /> */}
            </li>
            <li className="relative aspect-[5/4] max-sm:aspect-square py-4 px-5 space-y-2 bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-700 rounded-lg shadow-[0_3px_1px_0_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="absolute top-3 right-3 size-5 inline-flex items-center justify-center text-end text-xs text-neutral-400 font-bold tracking-wide">
                3/3
              </div>
              <h1 className="text-lgb text-neutral-900 dark:text-neutral-50 font-bold">출처 연동</h1>
              <h2 className="text-xs text-neutral-600 dark:text-neutral-400 font-bold">
                문장별로 인용 근거나 통계출처를 블록체인에 기록하고, 사용자는 기록된 수정사항과 출처를 투명하게 조회할
                수 있습니다.
              </h2>
              {/* <FigureC className="absolute top-[50%] -right-2 scale-[1.15]" /> */}
            </li>
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

type FigureProps = {
  className?: string;
};

function FigureA({ className }: FigureProps) {
  return (
    <figure
      className={cn(
        'min-w-60 flex flex-col bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700/80 rounded-md transition duration-300',
        className,
      )}>
      <div className="py-[7px] px-2.5 space-x-1 flex border-b dark:border-neutral-700/80">
        <div className="size-2 bg-[#FF3B30] bg-opacity-90 rounded-full"></div>
        <div className="size-2 bg-[#FFCC00] bg-opacity-90 rounded-full"></div>
        <div className="size-2 bg-[#34C759] bg-opacity-90 rounded-full"></div>
      </div>
      <div className="p-2.5 flex space-x-2">
        <Image
          src={itemImage}
          alt="상품 이미지"
          height={65}
          width={52}
          className="bg-[#E9E8E4] dark:bg-neutral-400 rounded select-none pointer-events-none"></Image>
        <div className="mt-0.5 flex flex-col">
          <div className="h-3 w-25 bg-[#E9E8E4] dark:bg-neutral-700 rounded-sm" />
          <div className="mt-1 h-3 w-16 bg-[#E9E8E4] dark:bg-neutral-700 rounded-sm" />
          <div className="relative mt-1.5 flex space-x-1.5">
            <div className="text-[9.5px] text-neutral-500/70 font-semibold -tracking-[0.02em] line-through">
              ₩216,000원
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-[45%] inline-flex justify-center items-center py-0.5 px-1 bg-blue-600/10 dark:bg-blue-500/30 text-[9px] text-blue-600 dark:text-blue-500 font-bold -tracking-[0.02em] rounded-[3px]">
              40%
            </div>
          </div>
          <div className="text-[9.5px] text-neutral-900 dark:text-neutral-50 font-semibold -tracking-[0.02em]">
            ₩129,600원
          </div>
        </div>
      </div>
    </figure>
  );
}

function FigureB({ className }: FigureProps) {
  return (
    <figure
      className={cn(
        'size-55 flex flex-col bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700/80 rounded-md transition duration-300',
        className,
      )}>
      <div className="h-9 w-full p-1.5 flex items-center gap-1.5">
        <div className="h-full aspect-square bg-[#E9E8E4] dark:bg-neutral-700 rounded-full" />
        <div className="text-xsb text-neutral-600 dark:text-neutral-400 font-medium -tracking-[0.02em] leading-none">
          slyce.me
        </div>
      </div>
      <div className="relative flex-1 animate-shimmer-slow bg-[length:200%_100%] bg-[linear-gradient(110deg,#e9e8e4,45%,#f8f8f8,55%,#e9e8e4)] dark:bg-[linear-gradient(110deg,#202020,45%,#303030,55%,#202020)]">
        <div className="absolute top-9 left-17 inline-flex flex-col select-none group-hover:scale-110 transition duration-300">
          <span className="py-1.5 px-2.5 bg-neutral-600 text-[9px] text-neutral-50 font-medium rounded">tag_brand</span>
          <span className="self-center inline-block h-0 w-0 align-top border-b-[6px] border-l-[6px] border-r-[6px] border-b-neutral-600 border-l-black/0 border-r-black/0 rotate-180 -translate-y-[1px]" />
        </div>
      </div>
    </figure>
  );
}

function FigureC({ className }: FigureProps) {
  return (
    <figure
      className={cn(
        'h-70 w-60 flex flex-col bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700/80 rounded-md transition duration-300',
        className,
      )}>
      <div className="h-9 w-full p-2.5 text-xsb text-neutral-900 dark:text-neutral-50 font-medium border-b dark:border-neutral-700/80">
        승인된 컨텐츠
      </div>
      <div className="flex-1 p-2 flex flex-col gap-2.5">
        <div className="relative w-full p-2 flex gap-2.5 rounded-md">
          <div className="absolute top-1 left-1 size-[5.5px] bg-[#34C759] dark:bg-[#3a9250] rounded-full" />
          <div className="size-6 bg-[#E9E8E4] dark:bg-neutral-700 rounded-full"></div>
          <div className="space-y-2.5">
            <div className="space-y-[3px]">
              <div className="h-[10.5px] w-31 bg-[#E9E8E4] dark:bg-neutral-700 rounded-sm" />
              <div className="h-[10.5px] w-18 bg-[#E9E8E4] dark:bg-neutral-700 rounded-sm" />
            </div>
            <div className="relative flex gap-2">
              <Image
                src={itemImage}
                alt="2차 활용"
                width={28}
                height={36}
                className="w-7 bg-[#E9E8E4] dark:bg-neutral-400 dark:border-neutral-500 rounded z-10 select-none pointer-events-none"
              />
              <div className="flex flex-col justify-between">
                <div className="mt-[1px] h-fit w-fit inline-flex items-center justify-center py-0.5 px-1.5 text-[8px] text-blue-600 dark:text-blue-500 font-medium bg-blue-600/10 dark:bg-blue-500/30 rounded">
                  지급 예정
                </div>
                <div className="inline-flex justify-center items-center text-xsb text-neutral-900 dark:text-neutral-50 font-bold rounded ">
                  ₩86,400원
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full px-2 py-3 flex gap-2.5 bg-[#E9E8E4] dark:bg-neutral-800 bg-opacity-70 rounded-md">
          <div className="size-6 bg-neutral-300 dark:bg-neutral-500 rounded-full"></div>
          <div className="space-y-2.5">
            <div className="space-y-[3px]">
              <div className="h-[10.5px] w-31 bg-neutral-300 dark:bg-neutral-500 rounded-sm" />
              <div className="h-[10.5px] w-18 bg-neutral-300 dark:bg-neutral-500 rounded-sm" />
            </div>
            <div className="relative flex gap-2">
              <Image
                src={itemImage}
                alt="2차 활용"
                width={28}
                height={36}
                className="w-7 bg-neutral-300 dark:bg-neutral-400 rounded z-10 select-none pointer-events-none"
              />
              <div className="flex flex-col justify-between">
                <div className="h-fit w-fit py-0.5 px-1.5 text-[8px] text-blue-600 font-medium bg-blue-600/10 rounded">
                  지급 예정
                </div>
                <div className="inline-flex justify-center items-center text-xsb text-neutral-900 dark:text-neutral-50 font-bold rounded ">
                  ₩86,400원
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
