'use client';

import { useEffect, useState } from 'react';
import { RetrieveForm } from './_components/retrieve-form';
import ArticleCard from '../article/_components/article-card';
import { fetchUserArticleList, fetchUserBlogList } from '@/lib/api/user-article';
import BlogCard from '../blog/_components/blog-card';
import LoadingSpinner from '@/components/loading-spinner';

const fetchArticles = async (walletAddress: string) => {
  // 실제 API 호출 시 이 부분을 대체하세요.
  return [
    { id: 1, content: '글 본문 내용입니다 1' },
    { id: 2, content: '글 본문 내용입니다 2' },
    { id: 3, content: '글 본문 내용입니다 3' },
  ];
};

export default function RetrievePage() {
  const [currentPage, setCurrentPage] = useState<'form' | 'result'>('form');
  const [articles, setArticles] = useState<{ id: number; content: string }[]>([]);
  const [blog, setBlog] = useState<{ id: number; content: string }[]>([]);

  // const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleSubmit = async (wallAddress: string) => {
    setIsLoading(true); // 로딩 시작
    // setWalletAddress(wallAddress); // 지갑 주소 저장

    try {
      const fetchedArticles = await fetchUserArticleList(wallAddress, 'article'); // 함수 호출
      const fetchedBlog = await fetchUserBlogList(wallAddress, 'blog'); // 함수 호출

      setArticles(fetchedArticles); // 상태에 글 목록 저장
      setBlog(fetchedBlog); // 상태에 블로그 목록 저장
      setCurrentPage('result'); // 결과 페이지로 전환
    } catch (error) {
      console.error(error); // 에러 발생 시 콘솔에 표시
    } finally {
      setTimeout(() => setIsLoading(false), 1000); // 로딩 종료 (1초 후)
    }
  };
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); // 로딩 종료 (1초 후)
  }, [isLoading]);

  const handleBack = () => {
    setCurrentPage('form'); // 폼 화면으로 돌아가기
    setArticles([]); // 글 목록 초기화
    // setWalletAddress(""); // 지갑 주소 초기화
  };

  return (
    <div className="mt-10 w-full h-[70vh] flex flex-col justify-center items-center">
      {currentPage === 'result' ? (
        <section className="mt-10 w-[80%] h-auto flex flex-col justify-center items-center">
          {isLoading ? (
            <LoadingSpinner/> // 로딩 중일 때 로딩 애니메이션 표시
          ) : (
            <section className="w-full h-auto flex flex-col items-center overflow-y-auto scrollbar-hide">
              <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 scrollbar-hide">
                {[...Array(4)].map((_, idx) => (
                  <ArticleCard
                    key={idx}
                    id={idx}
                    title={`Sample Article Title ${idx + 1}`}
                    textarea={
                      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                    }
                    author={`Author ${idx + 1}`}
                    date={new Date().toLocaleDateString()}
                  />
                ))}
                {[...Array(4)].map((_, idx) => (
                  <BlogCard
                    key={idx}
                    id={idx}
                    title={`Sample Blog Title ${idx + 1}`}
                    textarea={
                      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                    }
                    author={`Author ${idx + 1}`}
                    date={new Date().toLocaleDateString()}
                  />
                ))}
              </main>
            </section>
          )}
        </section>
      ) : (
        <RetrieveForm handleSubmit={handleSubmit} />
      )}
    </div>
  );
}

