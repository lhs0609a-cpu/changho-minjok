'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/shared/AnimatedSection';

const partners = [
  {
    name: 'KCC창호',
    logo: '/images/partners/kcc-window.png',
    title: 'KCC창호',
    description: '국내 대표 창호 브랜드',
    detail: '고품질 시스템창호 공급',
  },
  {
    name: 'KCC글라스',
    logo: '/images/partners/kcc-glass.png',
    title: 'KCC글라스',
    description: '국내 유리 산업 1위 기업',
    detail: '프리미엄 복층유리 공급',
  },
  {
    name: '휴그린',
    logo: '/images/partners/hugreen.jpg',
    title: '금호석유화학 휴그린',
    description: '국내 대표 PVC 창호 브랜드',
    detail: '고품질 프로파일 공급',
  },
];

export default function PartnersSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-12">
          <p className="text-[#2AC1BC] text-sm font-bold tracking-widest mb-4">
            TRUSTED PARTNERS
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4">
            국내 최고 대기업과<br />함께합니다
          </h2>
          <p className="text-[#767676] text-base md:text-lg">
            까다로운 품질 기준을 통과한 검증된 파트너십
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="space-y-4 mb-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center gap-6"
              >
                <div className="w-32 h-20 md:w-40 md:h-24 relative flex-shrink-0 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-2 mix-blend-multiply"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1E1E1E] mb-1">
                    {partner.title}
                  </h3>
                  <p className="text-[#767676] text-sm md:text-base">
                    {partner.description}
                  </p>
                  <p className="text-[#767676] text-sm md:text-base">
                    {partner.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="bg-white rounded-2xl p-6 border-2 border-[#2AC1BC]/30 mb-8">
            <h3 className="text-[#2AC1BC] font-bold text-lg mb-2">
              대기업 수준의 품질
            </h3>
            <p className="text-[#767676]">
              수많은 관공서 및 대형 건설 현장 납품 실적으로<br />
              검증된 품질을 제공합니다.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="bg-[#1E1E1E] rounded-2xl py-8 px-6 text-center">
            <p className="text-white text-lg md:text-xl font-bold">
              <span className="text-[#2AC1BC]">대기업 품질</span>에
            </p>
            <p className="text-white text-lg md:text-xl font-bold">
              <span className="text-[#2AC1BC]">공장 직영</span>
              <span className="text-[#F59E0B]">만족가격</span>을 더했습니다
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
