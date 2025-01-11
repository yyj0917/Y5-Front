import { SearchIcon } from 'lucide-react';
import { NavButton } from './nav-button';
import { TextLogo } from './text-logo';
import { Button } from './ui/button';
import { AboutCredit } from './about-credit';
import Link from 'next/link';

export default function HomeHeader() {
  return (
    <header className="sticky top-0 px-10 w-full flex justify-center border-b border-neutral-100 dark:border-neutral-800 z-50 bg-white">
      <nav className="w-full max-xl:max-w-none">
        {/* Tablet, Desktop: Nav */}
        <div className="w-full h-14 hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <TextLogo />
            <div className="flex space-x-1">
              <Button variant="link" className="text-[16px] text-upBitLightBlue font-semibold">
                Home
              </Button>
              <Link href={'/article/list'}>
                <NavButton className="text-[16px] text-upBitLightBlue font-semibold">Article</NavButton>
              </Link>
              <Link href={'/blog/list'}>
                <NavButton className="text-[16px] text-upBitLightBlue font-semibold">Blog</NavButton>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AboutCredit useShortcut>
              <Button
                variant="outline"
                size="sm"
                className="pl-4 pr-2 max-lg:pr-5 py-4 text-dunamuWhite space-x-4 bg-upBitLightBlue border-white rounded">
                <div className="flex items-center space-x-2">
                  <SearchIcon size={14} />
                  <div className="font-normal space-x-1">
                    <span className="font-medium tracking-tight">
                      <span>CredIT</span>
                    </span>
                    <span> 서비스란?</span>
                  </div>
                </div>
                <kbd className="h-5 px-1.5 inline-flex items-center gap-1 text-2xs text-upBitLightBlue bg-white rounded border border-neutral-200 pointer-events-none select-none  max-lg:hidden">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </AboutCredit>
          </div>
        </div>
        {/* Mobile: Nav */}
        <div className="flex md:hidden flex-col">
          <div className="pt-2.5 flex items-center justify-between">
            <TextLogo />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-x-4">
              <Button variant="link" className="text-sm text-upBitLightBlue font-bold px-0">
                Home
              </Button>
              <NavButton className="text-sm text-upBitLightBlue dark:text-neutral-200 font-semibold px-0">
                Exclusive
              </NavButton>
              <NavButton className="text-sm text-upBitLightBlue dark:text-neutral-200 font-semibold px-0">
                New
              </NavButton>
              <NavButton className="text-sm text-upBitLightBlue dark:text-neutral-200 font-semibold px-0">
                Brands
              </NavButton>
            </div>
            <AboutCredit useShortcut>
              <Button
                variant="outline"
                size="sm"
                className="pl-4 pr-2 max-lg:pr-5 py-4 text-dunamuWhite space-x-4 bg-upBitLightBlue rounded dark:text-neutral-300">
                <div className="flex items-center space-x-2">
                  <SearchIcon size={14} />
                  <div className="font-normal space-x-1">
                    <span className="font-medium tracking-tight">
                      <span>CredIT</span>
                    </span>
                    <span>서비스란?</span>
                  </div>
                </div>
                <kbd className="h-5 px-1.5 inline-flex items-center gap-1 text-2xs bg-neutral-50/90 rounded border border-neutral-200 pointer-events-none select-none dark:bg-neutral-900/90 dark:border-neutral-700 max-lg:hidden">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </AboutCredit>
          </div>
        </div>
      </nav>
    </header>
  );
}
