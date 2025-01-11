/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { EditArticleForm } from '../../_components/edit-article-form';
import { AlertEdit } from '@/components/alert-edit';
import TextDiffHighlighter from '@/components/text-diff';

type Article = {
  title: string;
  textarea: string;
  walletAddress: string;
  source: string;
};
const text1 = `
“연휴 길어져도 쓸 돈이 없다”…27일 임시공휴일 지정 놓고 싸늘한 여론
"정부와 국민의힘은 설 연휴 전날인 오는 1월 27일을 임시공휴일로 지정하기로 했다. 이번 결정으로 인해 25일부터 시작되는 주말과 설 연휴(28~30일)까지 총 엿새 동안 연속 휴일이 가능해졌다. 당정은 이를 통해 내수 경기 진작과 관광 활성화에 긍정적인 효과를 기대하고 있다.
8일 현대경제연구원에 따르면 임시공휴일 지정 시 4조2000억 원의 생산유발 효과와 1조6300억 원의 부가가치 유발 효과가 발생할 것으로 분석됐다.
국민의힘 김상훈 정책위의장은 “정부와 여당은 내수 경기 활성화뿐만 아니라 국민께 휴식의 기회를 넓혀 삶의 질 향상에도 기여할 수 있을 것으로 판단한다”며, 교통량 분산 등의 추가적인 이점을 언급했다.
그는 이어 “임시공휴일 지정으로 국민 모두가 따뜻하고 여유로운 설 연휴를 보내길 바라며, 소외되는 국민이 없도록 세심히 살피겠다”고 덧붙였다.
임시공휴일 지정이 소비 활성화에 기여한 과거 사례도 일부 있었다.
통계청 실시간 소비지표 ‘나우캐스트’에 따르면, 지난해 10월 2일 임시공휴일이 포함된 주간(9월 30일~10월 6일)에는 전국 신용카드 이용액이 전년 동기 대비 6.0% 증가했다. 전주에 비해 급감했던 소비가 공휴일 지정으로 반등한 것이다. 이처럼 긴 연휴가 소비 심리를 자극한 사례는 이번에도 기대 요인으로 작용한다.
그러나 임시공휴일 지정이 항상 긍정적인 결과를 가져오는 것은 아니다.
한국경영자총협회는 공휴일이 늘어나면 전 산업 생산과 수출에 부정적 영향을 미칠 수 있다고 지적했다. 2013년 대체공휴일 제도 도입 당시, 공휴일이 3.3일 추가되면 연간 28조1000억 원의 생산 감소와 4조3000억 원의 인건비 부담이 발생할 것으로 추정된 바 있다. 휴일근무 수당 지급 부담도 추가적으로 논의되고 있다.
실제 27일 임시공휴일 지정을 두고 국민들의 반응은 엇갈리고 있다.
일부는 “연휴가 길어져도 쓸 돈이 없다”, “내수 효과는커녕 경제는 여전히 어렵다”며 회의적인 반응을 보였다.
정국의 불안으로 올해 한국의 경제 성장에 대한 예측이 1% 후반으로 예측된다. 사진은 7일 서울 중구 명동 중심의 상점이 임대 안내를 붙이고 비어 있는 모습. 연합뉴스
특히 소상공인과 자영업자들은 임시공휴일 지정이 대기업과 공무원 등에게 유리할 뿐, 자신들에게는 불리하다고 주장했다.
한 소상공인은 “오피스 상권에서 장사하는 우리는 공휴일마다 매출이 급감한다”며, 공휴일 지정이 내수 효과를 체감하기 어려운 계층에게는 오히려 손해라고 토로했다. 다른 상인도 “임시공휴일로 직원들 휴일 수당까지 감당해야 하는 상황”이라고 불만을 드러냈다.
반면 긍정적인 평가도 있었다.
일부 상인과 시민들은 긴 연휴를 계기로 국내 여행을 계획하며 숙박 시설을 예약하는 등 긍정적인 움직임을 보였다. 차남수 소상공인연합회 정책홍보본부장은 “내수 활성화를 위해 다양한 정책이 필요하며, 임시공휴일 지정도 그 일환”이라고 강조했다.
전문가들은 ""정부의 임시공휴일 지정은 내수 진작, 교통량 분산, 국민 휴식 확대 등의 긍정적 효과가 기대되지만, 소상공인과 산업계의 부담을 완화할 방안 마련도 시급하다""며 ""정부는 다양한 이해관계를 조율하며 정책의 실효성을 높이는 데 힘써야 할 것""이라고 말했다.
김현주 기자 hjk@segye.com"
`;
const text2 = `
"정부와 국민의힘은 설 연휴 전날인 오는 1월 31일을 임시공휴일로 지정하기로 했다. 이번 결정으로 인해 28일부터 시작되는 주말과 설 연휴(28~익월 2일)까지 총 엿새 동안 연속 휴일이 가능해졌다. 당정은 이를 통해 내수 경기 진작과 관광 활성화에 긍정적인 효과를 기대하고 있다.
국민의힘 김상훈 정책위의장은 “정부와 여당은 내수 경기 활성화뿐만 아니라 국민께 휴식의 기회를 넓혀 삶의 질 향상에도 기여할 수 있을 것으로 판단한다”며, 교통량 분산 등의 추가적인 이점을 언급했다.
그는 이어 “임시공휴일 지정으로 국민 모두가 따뜻하고 여유로운 설 연휴를 보내길 바라며, 소외되는 국민이 없도록 세심히 살피겠다”고 덧붙였다.
임시공휴일 지정이 소비 활성화에 기여한 과거 사례도 일부 있었다.
통계청 실시간 소비지표 ‘나우캐스트’에 따르면, 지난해 10월 2일 임시공휴일이 포함된 주간(9월 30일~10월 6일)에는 전국 신용카드 이용액이 전년 동기 대비 6.0% 증가했다. 전주에 비해 급감했던 소비가 공휴일 지정으로 반등한 것이다. 이처럼 긴 연휴가 소비 심리를 자극한 사례는 이번에도 기대 요인으로 작용한다.
실제로 작년 있었던 임시공휴일 지정은 각각 12조, 13조, 6조의 내수를 진작했다.
그러나 임시공휴일 지정이 항상 긍정적인 결과를 가져오는 것은 아니다.
한국경영자총협회는 공휴일이 늘어나면 전 산업 생산과 수출에 부정적 영향을 미칠 수 있다고 지적했다. 2013년 대체공휴일 제도 도입 당시, 공휴일이 3.3일 추가되면 연간 28조1000억 원의 생산 감소와 4조3000억 원의 인건비 부담이 발생할 것으로 추정된 바 있다. 휴일근무 수당 지급 부담도 추가적으로 논의되고 있다.
실제 27일 임시공휴일 지정을 두고 국민들의 반응은 엇갈리고 있다.
!%@#스타!@%1.27립그녀는바베큐를먹고잠을잤다.다운로드!@지금바로간
일부는 “연휴가 길어져도 쓸 돈이 없다”, “내수 효과는커녕 경제는 여전히 어렵다”며 회의적인 반응을 보였다.
정국의 불안으로 올해 한국의 경제 성장에 대한 예측이 1% 후반으로 에측된다. 사진은 7일 서울 중구 명동 중심의 상점이 임대 안내를 붙이고 비어 있는 모습. 연합뉴스
특히 소상공인과 자영업자들은 임시공휴일 지정이 대기업과 공무원 등에게 유리할 뿐, 자신들에게는 불리하다고 주장했다.
한 소상공인은 “오피스 상권에서 장사하는 우리는 공휴일마다 매출이 급감한다”며, 공휴일 지정이 내수 효과를 체감하기 어려운 계층에게는 오히려 손해라고 토로했다. 다른 상인도 “임시공휴일로 직원들 휴일 수당까지 감당해야 하는 상황”이라고 불만을 드러냈다.
반면 긍정적인 평가도 있었다.
일부 상인과 시민들은 긴 연휴를 계기로 국내 여행을 계하획며 숙박 시설을 예약하는 등 긍정적인 움직임을 보였다. 차남수 소상공인연합회 정책홍보본부장은 “내수 활성화를 위해 다양한 정책이 필요하며, 임시공휴일 지정도 그 일환”이라고 강조했다.
전문가들은 ""정부의 임시공휴일 지정은 내수 진작, 교통량 분산, 국민 휴식 확대 등의 긍정적 효과가 기대되지만, 소상공인과 산업계의 부담을 완화할 방안 마련도 시급하다""며 ""정부는 다양한 이해관계를 조율하며 정책의 실효성을 높이는 데 힘써야 할 것""이라고 말했다.
본 포스팅은 쿠팡의 지원을 받아 작성되었습니다.
김현주 기자 hjk@segye.com"
`;
const text3 = `
"정부와 국민의힘은 설 연휴 전날인 오는 1월 31일을 임시공휴일로 지정하기로 했다. 이번 결정으로 인해 28일부터 시작되는 주말과 설 연휴(28~익월 2일)까지 총 엿새 동안 연속 휴일이 가능해졌다. 당정은 이를 통해 내수 경기 진작과 관광 활성화에 긍정적인 효과를 기대하고 있다.
국민의힘 김상훈 정책위의장은 “정부와 여당은 내수 경기 활성화뿐만 아니라 국민께 휴식의 기회를 넓혀 삶의 질 향상에도 기여할 수 있을 것으로 판단한다”며, 교통량 분산 등의 추가적인 이점을 언급했다.
그는 이어 “임시공휴일 지정으로 국민 모두가 따뜻하고 여유로운 설 연휴를 보내길 바라며, 소외되는 국민이 없도록 세심히 살피겠다”고 덧붙였다.
임시공휴일 지정이 소비 활성화에 기여한 과거 사례도 일부 있었다.
통계청 실시간 소비지표 ‘나우캐스트’에 따르면, 지난해 10월 2일 임시공휴일이 포함된 주간(9월 30일~10월 6일)에는 전국 신용카드 이용액이 전년 동기 대비 6.0% 증가했다. 전주에 비해 급감했던 소비가 공휴일 지정으로 반등한 것이다. 이처럼 긴 연휴가 소비 심리를 자극한 사례는 이번에도 기대 요인으로 작용한다.
그러나 임시공휴일 지정이 항상 긍정적인 결과를 가져오는 것은 아니다.
한국경영자총협회는 공휴일이 늘어나면 전 산업 생산과 수출에 부정적 영향을 미칠 수 있다고 지적했다. 2013년 대체공휴일 제도 도입 당시, 공휴일이 3.3일 추가되면 연간 28조1000억 원의 생산 감소와 4조3000억 원의 인건비 부담이 발생할 것으로 추정된 바 있다. 휴일근무 수당 지급 부담도 추가적으로 논의되고 있다.
실제 27일 임시공휴일 지정을 두고 국민의 반응은 엇갈리고 있다.
일부는 “연휴가 길어져도 쓸 돈이 없다”, “내수 효과는커녕 경제는 여전히 어렵다”, "연휴가 길어져 오히려 해외 여행 비율이 늘어날 것 같다"며 회의적인 반응을 보였다.
정국의 불안으로 올해 한국의 경제 성장에 대한 예측이 1% 후반으로 에측된다. 사진은 7일 서울 중구 명동 중심의 상점이 임대 안내를 붙이고 비어 있는 모습. 연합뉴스
특히 소상공인과 자영업자들은 임시공휴일 지정이 대기업과 공무원 등에게 유리할 뿐, 자신들에게는 불리하다고 주장했다.
한 소상공인은 “오피스 상권에서 장사하는 우리는 공휴일마다 매출이 급감한다”며, 공휴일 지정이 내수 효과를 체감하기 어려운 계층에게는 오히려 손해라고 토로했다. 다른 상인도 “임시공휴일로 직원들 휴일 수당까지 감당해야 하는 상황”이라고 불만을 드러냈다.
반면에 긍정적인 평가도 있었다.
일부 상인과 시민들은 긴 연휴를 계기로 국내 여행을 계획하며 숙박 시설을 예약하는 등 긍정적인 움직임을 보였다. 차남수 소상공인연합회 정책홍보본부장은 “내수 활성화를 위해 다양한 정책이 필요하며, 임시공휴일 지정도 그 일환”이라고 강조했다.
전문가들은 ""정부의 임시공휴일 지정은 내수 진작, 교통량 분산, 국민 휴식 확대 등의 긍정적 효과가 기대되지만, 소상공인과 산업계의 부담을 완화할 방안 마련도 시급하다""며 ""정부는 다양한 이해관계를 조율하며 정책의 실효성을 높이는 데 힘써야 할 것""이라고 말했다.
본 포스팅은 쿠팡의 지원을 받아 작성되었습니다.
김현주 기자 hjk@segye.com"
`;

const text4 = `
"정부와 국민의힘은 설 연휴 전날인 오는 1월 27일을 임시공휴일로 지정하기로 했다. 이번 결정으로 인해 25일부터 시작되는 주말과 설 연휴(25~30일)까지 총 엿새 동안 연속 휴일이 가능해졌다. 당정은 이를 통해 내수 경기 진작과 관광 활성화에 긍정적인 효과를 기대하고 있다.
국민의힘 김상훈 정책위의장은 “정부와 여당은 내수 경기 활성화뿐만 아니라 국민께 휴식의 기회를 넓혀 삶의 질 향상에도 기여할 수 있을 것으로 판단한다”며, 교통량 분산 등의 추가적인 이점을 언급했다.
그는 이어 “임시공휴일 지정으로 국민 모두가 따뜻하고 여유로운 설 연휴를 보내길 바라며, 소외되는 국민이 없도록 세심히 살피겠다”고 덧붙였다.
임시공휴일 지정이 소비 활성화에 기여한 과거 사례도 일부 있었다.
통계청 실시간 소비지표 ‘나우캐스트’에 따르면, 지난해 10월 2일 임시공휴일이 포함된 주간(9월 30일~10월 6일)에는 전국 신용카드 이용액이 전년 동기 대비 6.0% 증가했다. 전주에 비해 급감했던 소비가 공휴일 지정으로 반등한 것이다. 이처럼 긴 연휴가 소비 심리를 자극한 사례는 이번에도 기대 요인으로 작용한다.
그러나 임시공휴일 지정이 항상 긍정적인 결과를 가져오는 것은 아니다.
한국경영자총협회는 공휴일이 늘어나면 전 산업 생산과 수출에 부정적 영향을 미칠 수 있다고 지적했다. 2013년 대체공휴일 제도 도입 당시, 공휴일이 3.3일 추가되면 연간 28조1000억 원의 생산 감소와 4조3000억 원의 인건비 부담이 발생할 것으로 추정된 바 있다. 휴일근무 수당 지급 부담도 추가적으로 논의되고 있다.
실제 27일 임시공휴일 지정을 두고 국민의 반응은 엇갈리고 있다.
일부는 “연휴가 길어져도 쓸 돈이 없다”, “내수 효과는커녕 경제는 여전히 어렵다”, "연휴가 길어져 오히려 해외 여행 비율이 늘어날 것 같다"며 회의적인 반응을 보였다.
정국의 불안으로 올해 한국의 경제 성장에 대한 예측이 1% 후반으로 에측된다. 사진은 7일 서울 중구 명동 중심의 상점이 임대 안내를 붙이고 비어 있는 모습. 연합뉴스
특히 소상공인과 자영업자들은 임시공휴일 지정이 대기업과 공무원 등에게 유리할 뿐, 자신들에게는 불리하다고 주장했다.
한 소상공인은 “오피스 상권에서 장사하는 우리는 공휴일마다 매출이 급감한다”며, 공휴일 지정이 내수 효과를 체감하기 어려운 계층에게는 오히려 손해라고 토로했다. 다른 상인도 “임시공휴일로 직원들 휴일 수당까지 감당해야 하는 상황”이라고 불만을 드러냈다.
반면에 긍정적인 평가도 있었다.
일부 상인과 시민들은 긴 연휴를 계기로 국내 여행을 계획하며 숙박 시설을 예약하는 등 긍정적인 움직임을 보였다. 차남수 소상공인연합회 정책홍보본부장은 “내수 활성화를 위해 다양한 정책이 필요하며, 임시공휴일 지정도 그 일환”이라고 강조했다.
전문가들은 "정부의 임시공휴일 지정은 내수 진작, 교통량 분산, 국민 휴식 확대 등의 긍정적 효과가 기대되지만, 소상공인과 산업계의 부담을 완화할 방안 마련도 시급하다"며 "정부는 다양한 이해관계를 조율하며 정책의 실효성을 높이는 데 힘써야 할 것"이라고 말했다.
김현주 기자 hjk@segye.com"
`;

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

  const [articleData, setArticleData] = useState({
    title: 'Sample Title',
    usewallet: '0xSampleWallet',
    textarea:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    source: 'Sample Source',
  });
  useEffect(() => {
    setVersion([
      { version: 1, content: text1 },
      { version: 2, content: text2 },
      { version: 3, content: text3 },
      { version: 4, content: text4 },
    ]);
  }, []);
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
        <section className="p-4 w-[80%] h- flex flex-col justify-center items-center shadow-2xl rounded-xl">
          {isEditMode ? (
            <EditArticleForm initialValues={articleData} onSubmit={handleSubmit} handleCancel={handleCancel} />
          ) : (
            <div className="w-full h-auto flex flex-col items-start gap-2">
              <h2 className="relative w-full text-center text-lg font-extrabold">
                <span className="text-upBitLightBlue">{articleData.title}</span>
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
