'use client';

import { useEffect, useState } from 'react';
import { RetrieveForm } from './_components/retrieve-form';
import ArticleCard from '../article/_components/article-card';
import { fetchUserArticleList, fetchUserBlogList } from '@/lib/api/user-article';
import BlogCard from '../blog/_components/blog-card';
import LoadingSpinner from '@/components/loading-spinner';

type Article = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    reference: string[];
    old_version: string[];
    };
type ArticleProps = Article[];
type Blog = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    reference: string[];
    old_version: string[];
    };
type BlogProps = Blog[];

export default function RetrievePage() {
  const formatDateTime = (isoString: string) => {
    const [date, time] = isoString.split('T');
    const formattedTime = time.split('.')[0];
    return { date, formattedTime };
  };
  const [currentPage, setCurrentPage] = useState<'form' | 'result'>('form');
  const [articles, setArticles] = useState<ArticleProps>([]);
  const [account, setAccount] = useState('');
  const [blog, setBlog] = useState<BlogProps>([]);

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleSubmit = async (wallAddress: string) => {
    setAccount(wallAddress);

    try {
      const fetchedArticles = await fetchUserArticleList(wallAddress, 'news'); // 함수 호출
      const fetchedBlog = await fetchUserBlogList(wallAddress, 'blog'); // 함수 호출
      setArticles(fetchedArticles); // 상태에 글 목록 저장
      setBlog(fetchedBlog); // 상태에 블로그 목록 저장
      setCurrentPage('result'); // 결과 페이지로 전환
    } catch (error) {
      console.error(error); // 에러 발생 시 콘솔에 표시
    } 
  };

  return (
    <div className="mt-10 w-full h-[70vh] flex flex-col justify-center items-center">
      {currentPage === 'result' ? (
        <section className="mt-10 w-[80%] h-auto flex flex-col justify-center items-center">
          {isLoading ? (
            <LoadingSpinner /> // 로딩 중일 때 로딩 애니메이션 표시
          ) : (
            <section className="w-full h-auto flex flex-col items-center overflow-y-auto scrollbar-hide">
              <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 scrollbar-hide">
                {Array.isArray(articles) && articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    textarea={article.content}
                    author={account}
                    date={formatDateTime(article.createdAt).date}
                    time={formatDateTime(article.createdAt).formattedTime}
                  />
                ))}
                {Array.isArray(blog) && blog.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    textarea={blog.content}
                    author={account}
                    date={formatDateTime(blog.createdAt).date}
                    time={formatDateTime(blog.createdAt).formattedTime}
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
