/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { EditArticleForm } from '../../_components/edit-article-form';
import { AlertEdit } from '@/components/alert-edit';
import TextDiffHighlighter from '@/components/text-diff';
import { fetchArticleNewsDetail } from '@/lib/api/article-news';
import { fetchUserEditList, updateArticle } from '@/lib/api/user-article';
import { set } from 'react-hook-form';

type Article = {
  title: string;
  textarea: string;
  walletAddress: string;
  source: string;
};

type ArticleVersion = {
  version: number;
  content: string;
};

export default function ArticleDetails({ params }: { params: { id: string } }, { article }: { article: Article }) {
  const { id } = params;
  // 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false); // Alert 상태 추가
  const [version, setVersion] = useState<ArticleVersion[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호

  const [articleDetails, setArticleDetails] = useState<any>(null);
  useEffect(() => {
    // 데이터 가져오기
    const fetchBlogDetails = async () => {
      try {
        const articleDetailsData = await fetchArticleNewsDetail(id); // 최신 버전 데이터
        setArticleDetails(articleDetailsData);

        const oldVersions = articleDetailsData.old_version; // old_version 배열

        // 모든 트랜잭션 해시를 매핑하여 과거 버전 데이터 가져오기
        const oldVersionData = await Promise.all(oldVersions.map((hash: string) => fetchUserEditList(hash)));

        // 버전 데이터 구성
        const allVersions = [
          ...oldVersionData.map((data, index) => ({
            version: index,
            content: data.content,
          })),
          {
            version: oldVersionData.length + 1,
            content: articleDetailsData.content, // 가장 최신 버전
          },
        ];

        // 상태 업데이트
        setVersion(allVersions);
      } catch (error) {
        console.error('Error fetching blog details or old versions:', error);
      }
    };

    fetchBlogDetails();
  }, [id, setArticleDetails]);
  // 현재 페이지에서 비교할 데이터
  const currentVersion = version[currentPage - 1];
  const nextVersion = version[currentPage];

  // 이전 페이지로 이동
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    if (currentPage < version.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 수정 버튼 클릭 핸들러
  const handleEdit = () => {
    setIsEditMode(true);
  };
  const handleCancel = () => {
    setIsEditMode(false);
  };
  const handleSubmit = async (data: any) => {
    // 수정 모드 종료

    // Alert 활성화
    try {
      const dataWithId = {
        ...data, // 기존 data의 모든 필드를 복사
        id: id, // 여기에 id를 추가 (articleId는 전달받거나 정의된 id 값)
        type: 'news',
      };
      const res = await updateArticle(dataWithId);
      alert('수정되었습니다.');
      setArticleDetails(res);
      window.location.href = '/article/list';
    } catch (error) {
      alert('수정에 실패하였습니다.');
    }
    setIsEditMode(false);

    // Alert 활성화
    setAlertVisible(true);

    // Alert을 일정 시간 후 닫기
    setTimeout(() => {
      setAlertVisible(false); // Alert 숨김
    }, 1500); // 3초 동안 Alert 표시
  };

  return (
    <>
      <div className="mt-10 w-full flex flex-col gap-10 justify-center items-center">
        <section className="p-4 w-[80%] h- flex flex-col justify-center items-center shadow-2xl rounded-xl">
          {isEditMode ? (
            <EditArticleForm initialValues={articleDetails} onSubmit={handleSubmit} handleCancel={handleCancel} />
          ) : (
            <div className="w-full h-auto flex flex-col items-start gap-2">
              <h2 className="relative w-full text-center text-lg font-extrabold">
                <span className="text-dunamuMain text-2xl">{articleDetails?.title}</span>
                {/* 페이지네이션 버튼 */}
                <div className="w-full flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="flex gap-1 items-center">
                      <div className="w-6 h-6 bg-green-400"></div>
                      <span className="text-md">추가</span>
                    </span>
                    <span className="flex gap-1 items-center">
                      <div className="w-6 h-6 bg-red-400"></div>
                      <span className="text-md">삭제</span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 0}
                      className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
                      &lt;
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentPage >= version.length - 1}
                      className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
                      &gt;
                    </button>
                  </div>
                </div>
              </h2>
              <div>
                {currentPage === 0 ? (
                  // 기본 문서만 보여주는 경우
                  <>
                    <p className="whitespace-pre-line leading-8">{version[0]?.content || 'Loading base document...'}</p>
                  </>
                ) : // 비교 결과를 보여주는 경우
                currentVersion && nextVersion ? (
                  <>
                    <h2 className="text-lg font-bold">
                      Version {currentPage} vs Version {currentPage + 1}
                    </h2>
                    <TextDiffHighlighter text1={currentVersion.content} text2={nextVersion.content} />
                  </>
                ) : (
                  <p>Loading versions...</p>
                )}
              </div>
              <p>Reference : {articleDetails?.reference}</p>
              <p className="w-[60%] overflow-hidden truncate">Author : {articleDetails?.accountAddress}</p>
              <p>Last Updated : {articleDetails?.updatedAt}</p>
              <button className="w-full px-4 py-2 bg-dunamuMain text-white rounded-xl font-bold" onClick={handleEdit}>
                Edit
              </button>
            </div>
          )}
        </section>
      </div>
      {/* Alert 컴포넌트 조건부 렌더링 */}
      {isAlertVisible && <AlertEdit />}
    </>
  );
}
