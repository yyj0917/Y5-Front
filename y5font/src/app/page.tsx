import Link from 'next/link';
import { Suspense } from 'react';
import { SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TextLogo } from '@/components/text-logo';
import { MemberCard } from '@/components/member-card';
import { AboutCredit } from '@/components/about-credit';
import { NavButton } from '@/components/nav-button';
import { FlipWords } from '@/components/ui/filp-words';

export default function Home() {
  const words = ['BlockChain', 'Dunamu', 'Nodit'];

  return (
    <div className="relative min-h-svh lg:min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 flex flex-col ">
          <section className="relative flex-1 flex flex-col justify-center py-10 lg:py-16">
            <div className="container px-20 max-xl:max-w-none lg:px-32">
              <div className="w-full flex items-center">
                <div className="relative w-full lg:max-w-140 z-10  gap-10 lg:px-6 select-none">
                  <div className="inline-flex py-1 px-2 w-fit items-center justify-center text-xs text-neutral-50 font-semibold bg-dunamuMain rounded">
                    Credit Only
                  </div>
                  <h2 className="mt-2 flex flex-col text-4xl max-sm:text-3xl font-extrabold dark:font-bold select-none">
                    <span>Your Write,</span>
                    <span className="-mt-0.5 -tracking-[0.02em]">
                      Secured on <FlipWords words={words} />
                    </span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <Link href="/article/write">
                      <Button variant={'primary'} size={'lg'} className="w-[140px] mt-6 rounded bg-upBitLightBlue">
                        기사 작성하기
                      </Button>
                    </Link>
                    <Link href="/blog/write">
                      <Button variant={'primary'} size={'lg'} className="w-[140px] mt-6 rounded bg-upBitLightBlue">
                        블로그 글쓰기
                      </Button>
                    </Link>
                  </div>
                  <h3 className="pl-0.5 pt-6 flex flex-col text-xs text-neutral-800 dark:text-neutral-300/70 font-normal md:font-normal leading-[1.65]">
                    <span>가짜 뉴스와 거짓 정보가 넘치는 시대,</span>
                    <span>블록체인을 활용해 글과 출처를 영구히 보존합니다.</span>
                    <span>임의 수정, 삭제 없이 신뢰할 만한 기록을 남겨보세요.</span>
                  </h3>
                  <div className="flex flex-col">
                    <AboutCredit>
                      <Button
                        variant="link"
                        size="custom"
                        className="self-start pl-0.5 my-6 text-[13px] text-neutral-700 space-x-1 font-semibold dark:text-neutral-200 focus:ring-0 focus-visible:ring-0">
                        <span>CredIT</span> 서비스 안내 →
                      </Button>
                    </AboutCredit>
                    <Link href={'/retrieve'}>
                      <Button
                        variant="link"
                        size="custom"
                        className="text-upBitLightBlue flex items-center gap-1 font-bold">
                        <span>지갑 주소로 글 검색하기</span>
                        <span>
                          <SearchIcon size={16} strokeWidth={2} />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute w-full h-full inset-0 hidden lg:block">
                <Suspense fallback={null}>
                  <MemberCard />
                </Suspense>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
