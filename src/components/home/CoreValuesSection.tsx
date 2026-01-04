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
    gradient: 'from-blue-500 to-indigo-500',
    lightGradient: 'from-blue-500/10 to-indigo-500/10',
    number: '01',
  },
  {
    icon: Truck,
    title: '공장 직영',
    subtitle: 'FACTORY DIRECT',
    description: '중간 유통 마진 없이 공장에서 직접 고객님께 공급하여 합리적인 가격을 제공합니다.',
    gradient: 'from-emerald-500 to-teal-500',
    lightGradient: 'from-emerald-500/10 to-teal-500/10',
    number: '02',
  },
  {
    icon: Wrench,
    title: '전문 시공',
    subtitle: 'EXPERT INSTALLATION',
    description: '숙련된 전문 시공팀이 제품 특성을 정확히 이해하고 완벽하게 설치합니다.',
    gradient: 'from-amber-500 to-orange-500',
    lightGradient: 'from-amber-500/10 to-orange-500/10',
    number: '03',
  },
];

export default function CoreValuesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05)_0%,transparent_50%)]" />

      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-6">
            <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            제조-영업-시공
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              원스톱 서비스
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            창호의 민족은 제조부터 시공까지 모든 과정을 직접 책임집니다.
            <br className="hidden md:block" />
            중간 단계 없이 최상의 품질과 합리적인 가격을 동시에 제공합니다.
          </p>
        </AnimatedSection>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.1}>
              <div className="group relative h-full">
                {/* Card */}
                <div className="relative h-full bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2">
                  {/* Number */}
                  <span className="absolute top-6 right-6 text-7xl font-black text-gray-100 group-hover:text-gray-50 transition-colors select-none">
                    {value.number}
                  </span>

                  {/* Icon */}
                  <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.lightGradient} mb-6`}>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <value.icon className={`relative h-7 w-7 text-gray-900 group-hover:text-white transition-colors duration-300`} />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                      {value.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {value.description}
                    </p>

                    {/* Arrow Link */}
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-600 transition-colors font-medium">
                      <span className="text-sm">자세히 보기</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className={`absolute bottom-0 left-6 right-6 h-1 rounded-full bg-gradient-to-r ${value.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="mt-16 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors group"
          >
            창호의 민족 더 알아보기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
