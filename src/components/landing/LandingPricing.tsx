'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingDown, Wallet, Calculator } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const pricingFlow = [
  { label: '제조사', margin: '' },
  { label: '총판', margin: '+20%' },
  { label: '대리점', margin: '+15%' },
  { label: '시공업체', margin: '+15%' },
  { label: '고객', margin: '' },
];

const roiItems = [
  { label: '창호 교체 절약', amount: '200만원', icon: Wallet },
  { label: '연간 난방비 절감', amount: '48만원', icon: TrendingDown },
  { label: '3년 누적 절감', amount: '344만원', icon: Calculator },
];

export default function LandingPricing() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#FF6F0F]/10 text-[#FF6F0F] rounded-full text-sm font-bold mb-6">
            가격의 비밀
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4 tracking-tight">
            창호 교체,
            <br />
            <span className="text-[#FF6F0F]">대체 얼마가 적정가일까요?</span>
          </h2>
          <p className="text-lg text-[#767676] max-w-2xl mx-auto">
            같은 제품인데 가격이 다른 이유, 지금 알려드립니다.
          </p>
        </AnimatedSection>

        {/* Price Flow Comparison */}
        <AnimatedSection delay={0.2} className="mb-20">
          <div className="max-w-4xl mx-auto">
            {/* 일반 업체 */}
            <div className="mb-8">
              <p className="text-center text-[#767676] font-bold mb-4">일반 창호업체 유통 구조</p>
              <div className="flex items-center justify-center flex-wrap gap-2 md:gap-4">
                {pricingFlow.map((item, index) => (
                  <div key={item.label} className="flex items-center gap-2 md:gap-4">
                    <div className="relative">
                      <div className={`px-4 py-3 rounded-xl text-center ${
                        index === pricingFlow.length - 1
                          ? 'bg-red-100 border-2 border-red-300'
                          : 'bg-gray-100'
                      }`}>
                        <p className="text-sm font-bold text-[#1E1E1E]">{item.label}</p>
                        {item.margin && (
                          <p className="text-xs text-red-500 font-bold">{item.margin}</p>
                        )}
                      </div>
                    </div>
                    {index < pricingFlow.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center mt-4 text-red-500 font-bold text-lg">
                = 350~450만원
              </p>
            </div>

            {/* 창호의 민족 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2AC1BC]/10 via-[#2AC1BC]/20 to-[#2AC1BC]/10 rounded-3xl" />
              <div className="relative p-6 md:p-8">
                <p className="text-center text-[#2AC1BC] font-bold mb-4">창호의 민족 유통 구조</p>
                <div className="flex items-center justify-center gap-4 md:gap-8">
                  <div className="px-6 py-4 bg-[#2AC1BC] rounded-xl text-center">
                    <p className="text-white font-bold">제조 공장</p>
                    <p className="text-white/80 text-xs">창호의 민족</p>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    className="w-16 md:w-32 h-1 bg-[#2AC1BC] rounded-full origin-left"
                  />
                  <div className="px-6 py-4 bg-[#2AC1BC] rounded-xl text-center">
                    <p className="text-white font-bold">고객님</p>
                    <p className="text-white/80 text-xs">직거래</p>
                  </div>
                </div>
                <p className="text-center mt-4 text-[#2AC1BC] font-extrabold text-2xl">
                  = 180~250만원
                </p>
              </div>
            </div>

            {/* Savings Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#FF6F0F] rounded-2xl shadow-lg shadow-[#FF6F0F]/30">
                <span className="text-white text-lg md:text-xl font-bold">
                  평균 절약 금액
                </span>
                <span className="text-white text-2xl md:text-3xl font-extrabold">
                  150~200만원
                </span>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ROI Calculator */}
        <AnimatedSection delay={0.4}>
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-8">
              3년이면 창호값 본전 뽑습니다
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {roiItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2AC1BC]/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-[#2AC1BC]" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{item.label}</p>
                  <p className="text-white text-2xl md:text-3xl font-extrabold">{item.amount}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">
                창호 교체 비용 200만원 + 3년간 난방비 절감 144만원
              </p>
              <div className="inline-block px-6 py-3 bg-[#2AC1BC] rounded-xl">
                <p className="text-white font-bold text-lg">
                  = 사실상 <span className="text-2xl">무료</span>로 바꾸는 셈!
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.5} className="text-center mt-12">
          <a
            href="#contact-form"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF6F0F] text-white rounded-xl font-bold text-lg hover:bg-[#E5630D] transition-colors shadow-lg shadow-[#FF6F0F]/30 group"
          >
            우리 집은 얼마나 아낄 수 있을까?
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
