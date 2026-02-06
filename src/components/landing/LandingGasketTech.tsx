'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Thermometer, Droplets, Check } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const gasketTypes = [
  {
    title: '창호의민족 자체 브랜드',
    subtitle: '창짝 내/외부 모두 가스켓 타입',
    badge: '프리미엄',
    badgeColor: 'bg-[#2AC1BC]',
    description: '단열성 및 기밀성을 극대화하고, 실리콘 노후화로 인한 문제를 원천 차단합니다.',
    features: [
      { icon: Thermometer, text: '최상급 단열 성능' },
      { icon: Shield, text: '완벽한 기밀성' },
      { icon: Droplets, text: '결로 원천 차단' },
    ],
    highlight: true,
  },
  {
    title: '대기업 브랜드 (발코니창호)',
    subtitle: '창짝 내부 노턴 테이프 + 외부 가스켓',
    badge: '표준 사양',
    badgeColor: 'bg-[#767676]',
    description: '대기업 브랜드의 표준 사양을 준수하면서도, 시공 효율성과 안정적인 품질을 동시에 확보합니다.',
    features: [
      { icon: Thermometer, text: '우수한 단열 성능' },
      { icon: Shield, text: '검증된 기밀성' },
      { icon: Droplets, text: '결로 방지 효과' },
    ],
    highlight: false,
  },
];

export default function LandingGasketTech() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-[#1E1E1E]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-2 bg-[#2AC1BC]/20 text-[#2AC1BC] rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            기술 차별화
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            <span className="text-[#2AC1BC]">가스켓 타입</span> 공법의 비밀
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#767676] max-w-2xl mx-auto px-2">
            같은 창호도 마감 공법에 따라 성능이 달라집니다.
            <br />
            <span className="text-white font-semibold">창호의민족은 최상급 마감을 기본으로 합니다.</span>
          </p>
        </AnimatedSection>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {gasketTypes.map((type, index) => (
            <AnimatedSection key={type.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`relative bg-[#292929] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-2 ${
                  type.highlight
                    ? 'border-[#2AC1BC] shadow-lg shadow-[#2AC1BC]/20'
                    : 'border-[#3A3A3A]'
                } transition-all h-full`}
              >
                {/* Badge */}
                <span
                  className={`inline-block px-3 py-1 ${type.badgeColor} text-white text-xs sm:text-sm font-bold rounded-full mb-4`}
                >
                  {type.badge}
                </span>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                  {type.title}
                </h3>
                <p className="text-[#2AC1BC] font-semibold text-sm sm:text-base mb-4">
                  {type.subtitle}
                </p>

                {/* Description */}
                <p className="text-[#767676] text-sm sm:text-base leading-relaxed mb-6">
                  {type.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {type.features.map((feature) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-3 p-3 bg-[#1E1E1E] rounded-xl"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${
                          type.highlight ? 'bg-[#2AC1BC]/20' : 'bg-[#3A3A3A]'
                        } flex items-center justify-center`}
                      >
                        <feature.icon
                          className={`w-4 h-4 ${
                            type.highlight ? 'text-[#2AC1BC]' : 'text-[#767676]'
                          }`}
                        />
                      </div>
                      <span className="text-white text-sm font-medium">
                        {feature.text}
                      </span>
                      {type.highlight && (
                        <Check className="w-4 h-4 text-[#2AC1BC] ml-auto" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Highlight Badge for Premium */}
                {type.highlight && (
                  <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-[#FF6F0F] text-white text-xs font-bold rounded-full shadow-lg">
                    추천
                  </div>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Comparison Image */}
        <AnimatedSection delay={0.3} className="mt-10 sm:mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full aspect-[16/12] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#3A3A3A]">
              <Image
                src="/images/landing/comparison.png"
                alt="마감 방식 및 단열 간봉 비교"
                fill
                className="object-contain bg-[#F5F5F5]"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom Note */}
        <AnimatedSection delay={0.4} className="text-center mt-8 sm:mt-12">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 bg-[#2AC1BC]/10 rounded-full">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC]" />
            <span className="text-sm sm:text-base text-[#2AC1BC] font-semibold">
              창호의민족은 제품 특성에 맞는 최적의 공법을 적용합니다
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
