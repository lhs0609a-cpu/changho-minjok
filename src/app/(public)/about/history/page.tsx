import { Metadata } from 'next';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = {
  title: '연혁',
  description: '창호의 민족의 역사와 발자취를 소개합니다. 2015년 설립부터 현재까지의 성장 과정을 확인하세요.',
};

const history = [
  {
    year: '2026',
    events: [
      { month: '01월', title: '창호의민족 자체 브랜드 생산 개시', highlight: true },
      { month: '', title: 'OEM 방식 자체 제품 생산 시스템 구축' },
      { month: '', title: '부속품 개발 및 특허권 보유' },
    ],
  },
  {
    year: '2024',
    events: [
      { month: '09월', title: '3,500평 스마트 팩토리 신축 완공', highlight: true },
      { month: '06월', title: 'TPS 단열간봉 자동화 라인 구축' },
      { month: '03월', title: '창호의민족 브랜드 런칭' },
    ],
  },
  {
    year: '2023',
    events: [
      { month: '12월', title: '연간 시공 5,000세대 달성' },
      { month: '08월', title: 'KCC글라스 공식 파트너십 체결' },
      { month: '02월', title: '품질경영시스템 ISO 9001 인증' },
    ],
  },
  {
    year: '2022',
    events: [
      { month: '10월', title: '휴그린 공식 대리점 계약' },
      { month: '05월', title: '전문 시공팀 확대 (20명 → 50명)' },
    ],
  },
  {
    year: '2020',
    events: [
      { month: '11월', title: '누적 시공 10,000세대 돌파' },
      { month: '09월', title: 'KCC창호, KCC글라스, 휴그린 대리점 계약 및 협력', highlight: true },
      { month: '06월', title: '경기 남부권 영업망 확장' },
    ],
  },
  {
    year: '2019',
    events: [
      { month: '08월', title: '자동화 생산설비 도입' },
      { month: '01월', title: '서울/경기 전역 서비스 확대' },
    ],
  },
  {
    year: '2017',
    events: [
      { month: '06월', title: '복층유리 제작 부문 별도 설립/가동', highlight: true },
    ],
  },
  {
    year: '2015',
    events: [
      { month: '03월', title: '(주)현경시스템 법인 설립', highlight: true },
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-badge">History</span>
            <h1 className="page-hero-title">연혁</h1>
            <p className="page-hero-subtitle">
              2015년 작은 공장에서 시작해 대한민국 대표 창호 기업으로 성장하기까지,
              창호의 민족의 발자취입니다.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {history.map((yearGroup, groupIndex) => (
              <AnimatedSection key={yearGroup.year} delay={groupIndex * 0.1}>
                <div className="relative pl-8 pb-12 last:pb-0">
                  {/* Year Badge */}
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-16 h-16 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-sky-500/25">
                    {yearGroup.year}
                  </div>

                  {/* Events */}
                  <div className="ml-12 space-y-4">
                    {yearGroup.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`p-4 rounded-xl border transition-colors ${
                          event.highlight
                            ? 'bg-sky-50 border-sky-200'
                            : 'bg-white border-gray-100 hover:border-sky-100'
                        }`}
                      >
                        <span className="text-sm text-sky-600 font-medium">{event.month}</span>
                        <h3 className={`font-semibold mt-1 ${event.highlight ? 'text-sky-700' : 'text-gray-900'}`}>
                          {event.title}
                        </h3>
                      </div>
                    ))}
                  </div>

                  {/* Connector Line */}
                  {groupIndex < history.length - 1 && (
                    <div className="absolute left-0 top-16 bottom-0 w-0.5 bg-sky-200 -translate-x-1/2" />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
