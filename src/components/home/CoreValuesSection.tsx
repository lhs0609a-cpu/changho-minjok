'use client';

import { Factory, Truck, Wrench } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const values = [
  {
    icon: Factory,
    title: '직접 제조',
    description: '3,500평 스마트 팩토리에서 전 공정을 직접 관리하여 일관된 품질을 보장합니다.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Truck,
    title: '공장 직영',
    description: '중간 유통 마진 없이 공장에서 직접 고객님께 공급하여 합리적인 가격을 제공합니다.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Wrench,
    title: '전문 시공',
    description: '숙련된 전문 시공팀이 제품 특성을 정확히 이해하고 완벽하게 설치합니다.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

export default function CoreValuesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            제조-영업-시공 원스톱 서비스
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            창호의 민족은 제조부터 시공까지 모든 과정을 직접 책임집니다.
            <br className="hidden md:block" />
            중간 단계 없이 최상의 품질과 합리적인 가격을 동시에 제공합니다.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.1}>
              <div className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div
                  className={`inline-flex p-4 rounded-xl ${value.bgColor} mb-6`}
                >
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
