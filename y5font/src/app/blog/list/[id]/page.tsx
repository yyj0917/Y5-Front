/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { AlertEdit } from '@/components/alert-edit';
import { EditBlogForm } from '../../_components/edit-blog-form';

export default function BlogDetails({ params }: { params: { id: string } }, { article }: { article: any }) {
  const { id } = params;
  // 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false); // Alert 상태 추가

  const [blogData, setBlogData] = useState({
    title: 'Sample Title',
    textarea:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    walletAddress: '0xSampleWallet',
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
          <h1>CredIT Blog Details</h1>
        </header>
        <section className="p-4 w-[50%] h- flex flex-col justify-center items-center shadow-2xl rounded-xl">
          {isEditMode ? (
            <EditBlogForm initialValues={blogData} onSubmit={handleSubmit} handleCancel={handleCancel} />
          ) : (
            <div className="w-full h-auto flex flex-col items-start gap-6">
              <h2 className="w-full text-center text-lg font-bold">{blogData.title}</h2>
              <p>{blogData.textarea}</p>
              <p>Source : {blogData.source}</p>
              <p>Wallet : {blogData.walletAddress}</p>
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
