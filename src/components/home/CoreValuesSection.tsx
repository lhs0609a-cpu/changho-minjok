'use client';

import { Factory, Truck, Wrench, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Link from 'next/link';

const values = [
  {
    icon: Factory,
    title: '직접 제조',
    subtitle: 'SMART FACTORY',
    description: '3,500평 스마트 팩토리에서 전 공정을 직접 관리하여 일관된 품질을 보장합니다.',
    number: '01',
  },
  {
    icon: Truck,
    title: '공장 직영',
    subtitle: 'FACTORY DIRECT',
    description: '중간 유통 마진 없이 공장에서 직접 고객님께 공급하여 합리적인 가격을 제공합니다.',
    number: '02',
  },
  {
    icon: Wrench,
    title: '전문 시공',
    subtitle: 'EXPERT INSTALLATION',
    description: '숙련된 전문 시공팀이 제품 특성을 정확히 이해하고 완벽하게 설치합니다.',
    number: '03',
  },
];

export default function CoreValuesSection() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-6 tracking-tight">
            제조-영업-시공
            <br />
            <span className="text-[#2AC1BC]">원스톱 서비스</span>
          </h2>
          <p className="text-lg text-[#767676] leading-relaxed">
            창호의 민족은 제조부터 시공까지 모든 과정을 직접 책임집니다.
            <br className="hidden md:block" />
            중간 단계 없이 최상의 품질과 합리적인 가격을 동시에 제공합니다.
          </p>
        </AnimatedSection>

        {/* Cards Grid - 배민 스타일 */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.1}>
              <div className="group relative h-full">
                <div className="relative h-full bg-white rounded-3xl p-8 lg:p-10 border-2 border-[#EEEEEE] hover:border-[#2AC1BC] transition-all duration-300 hover:-translate-y-2">
                  {/* Number */}
                  <span className="absolute top-6 right-6 text-7xl font-extrabold text-[#F5F5F5] group-hover:text-[#E8F8F7] transition-colors select-none">
                    {value.number}
                  </span>

                  {/* Icon */}
                  <div className="relative w-16 h-16 rounded-2xl bg-[#E8F8F7] flex items-center justify-center mb-6 group-hover:bg-[#2AC1BC] transition-colors">
                    <value.icon className="h-8 w-8 text-[#2AC1BC] group-hover:text-white transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <span className="text-xs font-bold text-[#C4C4C4] uppercase tracking-wider block mb-2">
                      {value.subtitle}
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#1E1E1E] mb-4 tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-[#767676] leading-relaxed mb-6">
                      {value.description}
                    </p>

                    {/* Arrow Link */}
                    <div className="flex items-center gap-2 text-[#C4C4C4] group-hover:text-[#2AC1BC] transition-colors font-bold">
                      <span className="text-sm">자세히 보기</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Line */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 rounded-full bg-[#2AC1BC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA - 배민 스타일 */}
        <AnimatedSection delay={0.4} className="mt-16 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E1E1E] text-white rounded-xl font-bold hover:bg-[#292929] transition-colors group"
          >
            창호의 민족 더 알아보기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
