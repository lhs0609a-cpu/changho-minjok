import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | 창호의민족',
  description:
    '창호의민족((주)현경시스템) 웹사이트 이용약관입니다. 서비스 이용에 관한 제반 사항을 규정합니다.',
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#1E1E1E] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold">이용약관</h1>
          <p className="mt-4 text-[#999] text-sm sm:text-base">
            (주)현경시스템(이하 &quot;회사&quot;)이 운영하는
            창호의민족 웹사이트(이하 &quot;사이트&quot;)의 이용과 관련하여
            회사와 이용자 간의 권리·의무 및 책임사항을 규정합니다.
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
            '목적',
            '용어의 정의',
            '약관의 효력 및 변경',
            '서비스의 제공 및 변경',
            '서비스의 중단',
            '이용자의 의무',
            '회사의 의무',
            '지적재산권',
            '상담 및 견적 서비스',
            '면책사항',
            '분쟁해결',
            '시행일',
          ].map((item, i) => (
            <li key={i}>
              <a
                href={`#terms-${i + 1}`}
                className="hover:text-[#FF6F0F] transition-colors"
              >
                제{i + 1}조. {item}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 본문 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-gray-800 leading-relaxed text-[15px]">
        {/* 1 */}
        <section id="terms-1">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제1조 (목적)
          </h2>
          <p>
            이 약관은 (주)현경시스템(이하 &quot;회사&quot;)이 운영하는
            창호의민족 웹사이트(이하 &quot;사이트&quot;)에서 제공하는 온라인
            서비스(이하 &quot;서비스&quot;)를 이용함에 있어 회사와 이용자 간의
            권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        {/* 2 */}
        <section id="terms-2">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제2조 (용어의 정의)
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>&quot;사이트&quot;</strong>란 회사가 창호 제품 및 시공
              서비스에 관한 정보를 이용자에게 제공하기 위하여 운영하는
              웹사이트(changhopeople.com)를 말합니다.
            </li>
            <li>
              <strong>&quot;이용자&quot;</strong>란 사이트에 접속하여 이 약관에
              따라 회사가 제공하는 서비스를 이용하는 자를 말합니다.
            </li>
            <li>
              <strong>&quot;서비스&quot;</strong>란 회사가 사이트를 통해 제공하는
              창호 제품 정보, 상담 신청, 견적 요청, 공장 견학 예약, 시공사례
              열람, 칼럼 등 일체의 서비스를 말합니다.
            </li>
          </ol>
        </section>

        {/* 3 */}
        <section id="terms-3">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제3조 (약관의 효력 및 변경)
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              이 약관은 사이트를 통해 온라인으로 공시하고, 이용자가 사이트를
              이용함으로써 효력이 발생합니다.
            </li>
            <li>
              회사는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는
              범위에서 이 약관을 변경할 수 있으며, 변경된 약관은 사이트에
              공지함으로써 효력이 발생합니다.
            </li>
            <li>
              이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수
              있으며, 변경된 약관의 효력 발생일 이후에도 서비스를 계속 이용할
              경우 약관 변경에 동의한 것으로 간주합니다.
            </li>
          </ol>
        </section>

        {/* 4 */}
        <section id="terms-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제4조 (서비스의 제공 및 변경)
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              회사는 다음과 같은 서비스를 제공합니다.
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>창호 제품(PVC, 알루미늄, 시스템창호 등) 정보 제공</li>
                <li>온라인 상담 신청 및 견적 요청 서비스</li>
                <li>공장 견학 예약 서비스</li>
                <li>시공사례 및 전문 칼럼 정보 제공</li>
                <li>FAQ 및 공지사항 안내</li>
                <li>프로모션 및 이벤트 정보 제공</li>
              </ul>
            </li>
            <li>
              회사는 서비스의 내용을 변경하거나 추가할 수 있으며, 변경 사항은
              사이트에 공지합니다.
            </li>
          </ol>
        </section>

        {/* 5 */}
        <section id="terms-5">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제5조 (서비스의 중단)
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의
              두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할
              수 있습니다.
            </li>
            <li>
              회사는 제1항의 사유로 서비스 제공이 일시적으로 중단됨으로 인하여
              이용자 또는 제3자가 입은 손해에 대하여 배상하지 않습니다. 단,
              회사에 고의 또는 중대한 과실이 있는 경우에는 그러하지 아니합니다.
            </li>
          </ol>
        </section>

        {/* 6 */}
        <section id="terms-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제6조 (이용자의 의무)
          </h2>
          <p className="mb-2">이용자는 다음 행위를 하여서는 안 됩니다.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>상담 신청 또는 견적 요청 시 허위 정보를 기재하는 행위</li>
            <li>회사의 서비스 정보를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제, 유통, 조장하거나 상업적으로 이용하는 행위</li>
            <li>타인의 개인정보를 도용하여 서비스를 이용하는 행위</li>
            <li>회사의 지적재산권을 침해하는 행위</li>
            <li>회사의 서비스 운영을 고의로 방해하는 행위</li>
            <li>기타 관계 법령에 위반되는 행위</li>
          </ul>
        </section>

        {/* 7 */}
        <section id="terms-7">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제7조 (회사의 의무)
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              회사는 관련 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를
              하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위해 최선을
              다합니다.
            </li>
            <li>
              회사는 이용자의 개인정보를 보호하기 위해 보안시스템을 갖추며
              개인정보처리방침을 공시하고 준수합니다.
            </li>
            <li>
              회사는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정할
              경우에는 적절한 절차를 거쳐 처리하여야 합니다.
            </li>
          </ol>
        </section>

        {/* 8 */}
        <section id="terms-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제8조 (지적재산권)
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              사이트에 게시된 모든 콘텐츠(텍스트, 이미지, 동영상, 디자인, 로고
              등)에 대한 지적재산권은 회사에 귀속됩니다.
            </li>
            <li>
              이용자는 회사의 사전 서면 동의 없이 사이트의 콘텐츠를 복제, 배포,
              전송, 출판, 방송, 기타 방법에 의하여 영리 목적으로 이용하거나
              제3자에게 이용하게 하여서는 안 됩니다.
            </li>
          </ol>
        </section>

        {/* 9 */}
        <section id="terms-9">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제9조 (상담 및 견적 서비스)
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              사이트를 통한 상담 신청 및 견적 요청은 계약의 체결을 의미하지
              않으며, 구체적인 계약 조건은 별도의 계약서를 통해 정해집니다.
            </li>
            <li>
              사이트에 게시된 제품 가격 및 시공 비용은 참고용이며, 실제 비용은
              현장 상황, 제품 사양, 시공 조건 등에 따라 달라질 수 있습니다.
            </li>
            <li>
              회사는 상담 신청을 접수한 후 합리적인 기간 내에 이용자에게 연락을
              드리며, 부득이한 사유로 응대가 지연될 경우 사전 안내를 위해
              노력합니다.
            </li>
          </ol>
        </section>

        {/* 10 */}
        <section id="terms-10">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제10조 (면책사항)
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등
              불가항력으로 인해 서비스를 제공할 수 없는 경우에는 책임이
              면제됩니다.
            </li>
            <li>
              회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여
              책임을 지지 않습니다.
            </li>
            <li>
              회사는 이용자가 사이트에 게재한 정보, 자료, 사실의 신뢰도,
              정확성 등에 관해서는 책임을 지지 않습니다.
            </li>
            <li>
              사이트에서 제공하는 정보는 참고 목적이며, 이를 기반으로 한 의사
              결정에 대한 최종 책임은 이용자에게 있습니다.
            </li>
          </ol>
        </section>

        {/* 11 */}
        <section id="terms-11">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제11조 (분쟁해결)
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              회사와 이용자 간에 발생한 분쟁에 관하여는 대한민국 법을
              적용합니다.
            </li>
            <li>
              서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의
              본사 소재지를 관할하는 법원을 전속 관할법원으로 합니다.
            </li>
          </ol>
        </section>

        {/* 12 */}
        <section id="terms-12">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            제12조 (시행일)
          </h2>
          <p>이 약관은 2025년 1월 1일부터 시행합니다.</p>
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
