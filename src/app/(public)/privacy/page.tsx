import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 창호의민족',
  description:
    '창호의민족((주)현경시스템)의 개인정보처리방침입니다. 개인정보 수집·이용·보관·파기 등에 관한 사항을 안내합니다.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#1E1E1E] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold">개인정보처리방침</h1>
          <p className="mt-4 text-[#999] text-sm sm:text-base">
            (주)현경시스템(이하 &quot;회사&quot;)은 「개인정보 보호법」에 따라
            이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게
            처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>
        </div>
      </section>

      {/* 목차 */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 py-8 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          목차
        </h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
          {[
            '개인정보의 수집 항목 및 수집 방법',
            '개인정보의 수집·이용 목적',
            '개인정보의 보유 및 이용 기간',
            '개인정보의 제3자 제공',
            '개인정보 처리의 위탁',
            '정보주체의 권리·의무 및 행사 방법',
            '개인정보의 파기 절차 및 방법',
            '쿠키의 설치·운영 및 거부',
            '개인정보의 안전성 확보 조치',
            '개인정보보호책임자',
            '개인정보 처리방침의 변경',
            '시행일',
          ].map((item, i) => (
            <li key={i}>
              <a
                href={`#section-${i + 1}`}
                className="hover:text-[#FF6F0F] transition-colors"
              >
                {i + 1}. {item}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 본문 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-gray-800 leading-relaxed text-[15px]">
        {/* 1 */}
        <section id="section-1">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제1조 (개인정보의 수집 항목 및 수집 방법)
          </h2>
          <h3 className="font-semibold mt-4 mb-2">1. 수집 항목</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>필수항목:</strong> 이름, 연락처(전화번호), 이메일 주소,
              주소(시공 현장 주소)
            </li>
            <li>
              <strong>선택항목:</strong> 건물 유형, 창호 종류, 상담 희망 시간,
              기타 요청사항
            </li>
            <li>
              <strong>자동 수집 항목:</strong> IP 주소, 쿠키, 방문 일시, 서비스
              이용 기록, 브라우저 종류 및 OS 정보
            </li>
          </ul>
          <h3 className="font-semibold mt-4 mb-2">2. 수집 방법</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>홈페이지 상담 신청 양식(온라인 문의, 견적 요청)</li>
            <li>전화, 이메일, 카카오톡 채널을 통한 상담</li>
            <li>공장 견학 예약 신청</li>
            <li>자동 수집 장치(쿠키 등)를 통한 수집</li>
          </ul>
        </section>

        {/* 2 */}
        <section id="section-2">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제2조 (개인정보의 수집·이용 목적)
          </h2>
          <p className="mb-2">
            회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>상담 및 견적 서비스 제공:</strong> 창호 상담, 견적 산출,
              시공 상담 등 고객 요청에 대한 응대
            </li>
            <li>
              <strong>계약 이행 및 서비스 제공:</strong> 창호 제품 납품, 시공
              서비스 이행, 배송 관리
            </li>
            <li>
              <strong>고객 관리:</strong> 본인 확인, 불만처리, 고지사항 전달,
              A/S 안내
            </li>
            <li>
              <strong>마케팅 및 광고:</strong> 이벤트·프로모션 안내, 서비스 관련
              정보 제공 (동의자에 한함)
            </li>
            <li>
              <strong>서비스 개선:</strong> 서비스 이용 통계 분석, 신규 서비스
              개발, 웹사이트 이용 환경 개선
            </li>
          </ul>
        </section>

        {/* 3 */}
        <section id="section-3">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제3조 (개인정보의 보유 및 이용 기간)
          </h2>
          <p className="mb-2">
            회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를
            지체 없이 파기합니다. 단, 관계 법령에 의한 보존이 필요한 경우 아래
            기간 동안 보관합니다.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    보존 항목
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    보존 근거
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    보존 기간
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    계약 또는 청약철회 기록
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    전자상거래법
                  </td>
                  <td className="border border-gray-300 px-4 py-2">5년</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    대금결제 및 재화 공급 기록
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    전자상거래법
                  </td>
                  <td className="border border-gray-300 px-4 py-2">5년</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    소비자 불만 또는 분쟁처리 기록
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    전자상거래법
                  </td>
                  <td className="border border-gray-300 px-4 py-2">3년</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    웹사이트 방문 기록
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    통신비밀보호법
                  </td>
                  <td className="border border-gray-300 px-4 py-2">3개월</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 */}
        <section id="section-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제4조 (개인정보의 제3자 제공)
          </h2>
          <p>
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만
            아래의 경우에는 예외로 합니다.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>이용자가 사전에 동의한 경우</li>
            <li>
              법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에
              따라 수사기관의 요구가 있는 경우
            </li>
          </ul>
        </section>

        {/* 5 */}
        <section id="section-5">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제5조 (개인정보 처리의 위탁)
          </h2>
          <p className="mb-2">
            회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리업무를
            위탁하고 있습니다.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    수탁업체
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    위탁 업무 내용
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    카카오(주)
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    카카오톡 채널 상담 서비스
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    (주)네이버클라우드
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    이메일 발송 및 클라우드 서비스 운영
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을
            규정하고 있으며, 위탁 처리하는 정보는 위탁 목적 외 이용을
            금지합니다.
          </p>
        </section>

        {/* 6 */}
        <section id="section-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제6조 (정보주체의 권리·의무 및 행사 방법)
          </h2>
          <p className="mb-2">
            이용자(정보주체)는 회사에 대해 언제든지 다음 각 호의 개인정보 보호
            관련 권리를 행사할 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리정지 요구</li>
          </ul>
          <p className="mt-3">
            위 권리 행사는 전화(1668-1453), 이메일(changhopeople@naver.com) 또는
            서면을 통해 할 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.
          </p>
        </section>

        {/* 7 */}
        <section id="section-7">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제7조 (개인정보의 파기 절차 및 방법)
          </h2>
          <p className="mb-2">
            회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
          </p>
          <h3 className="font-semibold mt-4 mb-2">1. 파기 절차</h3>
          <p>
            이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우
            별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후
            혹은 즉시 파기됩니다.
          </p>
          <h3 className="font-semibold mt-4 mb-2">2. 파기 방법</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>전자적 파일:</strong> 기록을 재생할 수 없는 기술적 방법을
              사용하여 삭제
            </li>
            <li>
              <strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각하여 파기
            </li>
          </ul>
        </section>

        {/* 8 */}
        <section id="section-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제8조 (쿠키의 설치·운영 및 거부)
          </h2>
          <p className="mb-2">
            회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용 정보를
            저장하고 수시로 불러오는 &apos;쿠키(Cookie)&apos;를 사용합니다.
          </p>
          <h3 className="font-semibold mt-4 mb-2">1. 쿠키 사용 목적</h3>
          <p>
            방문 빈도, 이용 형태 등을 분석하여 이용자에게 최적화된 정보를
            제공하기 위해 사용됩니다.
          </p>
          <h3 className="font-semibold mt-4 mb-2">2. 쿠키 설정 거부 방법</h3>
          <p>
            웹 브라우저 상단의 &quot;도구 &gt; 인터넷 옵션 &gt;
            개인정보&quot;에서 쿠키 저장을 거부할 수 있습니다. 다만 쿠키 저장을
            거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
          </p>
        </section>

        {/* 9 */}
        <section id="section-9">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제9조 (개인정보의 안전성 확보 조치)
          </h2>
          <p className="mb-2">
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>관리적 조치:</strong> 내부관리계획 수립·시행, 개인정보
              취급 직원의 최소화 및 교육
            </li>
            <li>
              <strong>기술적 조치:</strong> 개인정보처리시스템 접근 권한 관리,
              접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치
            </li>
            <li>
              <strong>물리적 조치:</strong> 전산실, 자료보관실 등의 접근 통제
            </li>
          </ul>
        </section>

        {/* 10 */}
        <section id="section-10">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제10조 (개인정보보호책임자)
          </h2>
          <p className="mb-4">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
            관련한 이용자의 불만 처리 및 피해 구제 등을 위하여 아래와 같이
            개인정보보호책임자를 지정하고 있습니다.
          </p>
          <div className="bg-gray-50 rounded-lg p-5 space-y-1">
            <p>
              <strong>개인정보보호책임자</strong>
            </p>
            <p>성명: 허자현</p>
            <p>직위: 대표이사</p>
            <p>연락처: 1668-1453</p>
            <p>이메일: changhopeople@naver.com</p>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에
            문의하시기 바랍니다.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-gray-600">
            <li>
              개인정보침해신고센터 (한국인터넷진흥원): (국번없이) 118
            </li>
            <li>
              개인정보분쟁조정위원회: (국번없이) 1833-6972
            </li>
            <li>대검찰청 사이버수사과: (국번없이) 1301</li>
            <li>경찰청 사이버수사국: (국번없이) 182</li>
          </ul>
        </section>

        {/* 11 */}
        <section id="section-11">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제11조 (개인정보 처리방침의 변경)
          </h2>
          <p>
            이 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용의
            추가·삭제 및 수정이 있을 시에는 변경사항의 시행 7일 전부터
            홈페이지의 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>

        {/* 12 */}
        <section id="section-12">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제12조 (시행일)
          </h2>
          <p>이 개인정보처리방침은 2025년 1월 1일부터 시행합니다.</p>
        </section>

        {/* 회사 정보 */}
        <div className="border-t border-gray-200 pt-8 text-sm text-gray-500">
          <p>
            <strong>(주)현경시스템</strong> | 대표: 허자현 | 사업자등록번호:
            268-86-01889
          </p>
          <p>주소: 경상북도 청도군 청도읍 청매로 86-29</p>
          <p>전화: 1668-1453 | 이메일: changhopeople@naver.com</p>
        </div>
      </div>
    </div>
  );
}
