/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { EditArticleForm } from '../../_components/edit-article-form';
import { AlertEdit } from '@/components/alert-edit';

type Article = {
  title: string;
  textarea: string;
  walletAddress: string;
  source: string;
};

export default function ArticleDetails({ params }: { params: { id: string } }, { article }: { article: Article }) {
  const { id } = params;
  // 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false); // Alert 상태 추가

  const [articleData, setArticleData] = useState({
    title: 'Sample Title',
    usewallet: '0xSampleWallet',
    textarea:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    source: 'Sample Source',
  });
  // 수정 버튼 클릭 핸들러
  const handleEdit = () => {
    setIsEditMode(true);
  };
  const handleCancel = () => {
    setIsEditMode(false);
  };
  const handleSubmit = async (data: any) => {
    // 수정 모드 종료
    setIsEditMode(false);

    // Alert 활성화
    setAlertVisible(true);

    // Alert을 일정 시간 후 닫기
    setTimeout(() => {
      setAlertVisible(false); // Alert 숨김
    }, 1500); // 3초 동안 Alert 표시
    // (updatedData) => {
    //     console.log('Updated data:', updatedData);
    //     setArticleData(updatedData);
    //     setIsEditMode(false); // 수정 완료 후 모드 종료
    // }
    // try {
    //     await
    // }
  };

  return (
    <>
      <div className="mt-10 w-full flex flex-col gap-10 justify-center items-center">
        <header className="text-xl md:text-xl text-upBitBlus font-bold">
          <h1>CredIT Article Details</h1>
        </header>
        <section className="p-4 w-[50%] h- flex flex-col justify-center items-center shadow-2xl rounded-xl">
          {isEditMode ? (
            <EditArticleForm initialValues={articleData} onSubmit={handleSubmit} handleCancel={handleCancel} />
          ) : (
            <div className="w-full h-auto flex flex-col items-start gap-6">
              <h2 className="w-full text-center text-lg font-bold">{articleData.title}</h2>
              <p>{articleData.textarea}</p>
              <p>Source : {articleData.source}</p>
              <p>Wallet : {articleData.usewallet}</p>
              <p>Last Updated : {new Date().toLocaleDateString()}</p>
              <button className="w-full px-4 py-2 bg-upBitLightBlue text-white rounded-xl" onClick={handleEdit}>
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
