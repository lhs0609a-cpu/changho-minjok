'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Wallet, Star, Heart, Volume2, Crown, Check } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const recommendations = [
  {
    id: 1,
    name: '실속형',
    subtitle: 'PVC + 일반유리',
    description: '비용 부담 없이 창호 교체하고 싶은 분',
    icon: Wallet,
    features: ['기본 단열 성능', '합리적 가격대', '빠른 시공'],
    priceRange: '300~400만원대',
    target: '예산 중시',
    color: 'bg-gray-500',
    popular: false,
  },
  {
    id: 2,
    name: '베스트셀러',
    subtitle: 'PVC + 로이유리',
    description: '가성비와 단열 모두 잡고 싶은 분',
    icon: Star,
    features: ['로이유리 단열 30% UP', '결로 방지 효과', '난방비 절감'],
    priceRange: '400~500만원대',
    target: '가장 많이 선택',
    color: 'bg-[#FF6F0F]',
    popular: true,
  },
  {
    id: 3,
    name: '신혼부부 추천',
    subtitle: '시스템창호 + 로이유리',
    description: '인테리어와 성능 둘 다 챙기고 싶은 분',
    icon: Heart,
    features: ['슬림한 프레임', '모던한 디자인', '우수한 기밀성'],
    priceRange: '500~600만원대',
    target: '디자인 + 성능',
    color: 'bg-pink-500',
    popular: false,
  },
  {
    id: 4,
    name: '방음 특화',
    subtitle: '시스템창호 + 이중유리',
    description: '층간소음, 외부 소음이 심한 분',
    icon: Volume2,
    features: ['이중 유리 방음', '소음 차단 효과', '쾌적한 실내'],
    priceRange: '550~650만원대',
    target: '소음 고민 해결',
    color: 'bg-blue-500',
    popular: false,
  },
  {
    id: 5,
    name: '프리미엄 올인원',
    subtitle: '하이샤시 + 로이이중유리',
    description: '최고급 사양으로 확실하게 바꾸고 싶은 분',
    icon: Crown,
    features: ['넓은 채광', '최상급 단열', '프리미엄 마감'],
    priceRange: '650~800만원대',
    target: '최고급 사양',
    color: 'bg-purple-500',
    popular: false,
  },
];

export default function LandingProducts() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-2 bg-[#FF6F0F]/10 text-[#FF6F0F] rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            Expert's Pick
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4 sm:mb-6 tracking-tight">
            전문가가 추천하는
            <br />
            <span className="text-[#2AC1BC]">창호 조합</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#767676] max-w-2xl mx-auto px-2">
            어떤 창호를 선택해야 할지 모르겠다면?
            <br />
            <span className="text-[#1E1E1E] font-semibold">상황별 맞춤 추천으로 고민 끝!</span>
          </p>
        </AnimatedSection>

        {/* Recommendation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {recommendations.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-2xl border-2 ${
                  item.popular ? 'border-[#FF6F0F] shadow-lg shadow-[#FF6F0F]/20' : 'border-gray-100'
                } hover:border-[#2AC1BC] transition-all overflow-hidden h-full flex flex-col`}
              >
                {/* Popular Badge */}
                {item.popular && (
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF6F0F] text-white text-xs font-bold rounded-b-lg">
                    BEST
                  </div>
                )}

                {/* Header */}
                <div className={`${item.color} p-4 sm:p-5 ${item.popular ? 'pt-6' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg">{item.name}</h3>
                      <p className="text-white/80 text-xs sm:text-sm">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className="inline-block px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                    {item.target}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <p className="text-sm text-[#767676] mb-4">{item.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-4 flex-1">
                    {item.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2AC1BC] flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-[#1E1E1E]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-[#767676] mb-1">예상 견적</p>
                    <p className="text-lg sm:text-xl font-bold text-[#1E1E1E]">{item.priceRange}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.5} className="text-center mt-8 sm:mt-12 px-2">
          <div className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-[#767676] mb-2">
              우리 집에는 어떤 조합이 맞을까?
            </p>
            <p className="text-base sm:text-lg font-bold text-[#1E1E1E] mb-4">
              전문가가 직접 방문해서 맞춤 추천해드립니다
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#FF6F0F] text-white rounded-xl font-bold text-sm sm:text-base hover:bg-[#E5630D] transition-colors shadow-lg shadow-[#FF6F0F]/30 w-full sm:w-auto"
            >
              무료 맞춤 상담 신청하기
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
