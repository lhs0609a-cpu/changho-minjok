'use client';

import { motion } from 'framer-motion';
import { Coins, Users, ShieldCheck, Check, X } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const solutions = [
  {
    icon: Coins,
    number: '01',
    title: '유통업자 배 불리는 돈, 이제 그만',
    subtitle: '동일 제품 평균 200만원 절약',
    description: '제조사→총판→대리점→시공업체? 저희는 공장에서 바로 고객님께. 중간 마진 4단계가 0단계로 줄어듭니다.',
    highlight: '200만원 절약',
    color: 'bg-[#FF6F0F]',
  },
  {
    icon: Users,
    number: '02',
    title: '브랜드 현장 검증 기술진이 직접 시공',
    subtitle: '신축 리모델링 아파트 다수 경험 및 대기업 경력 보유',
    description: '발코니창호 브랜드 현장에서 10년↑ 검증받은 기술진. 고난도 현장도 완벽하게 마감합니다.',
    highlight: '10년↑ 베테랑',
    color: 'bg-[#2AC1BC]',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: '10년 이상 A/S, 책임질 수 있는 이유',
    subtitle: '전문건설업 면허 + 3,500평 공장',
    description: '인터넷 업체가 1년 뒤에도 있을까요? 저희는 면허와 공장이 있습니다. 도망갈 수가 없어요.',
    highlight: '10년 이상 무상보증',
    color: 'bg-[#1E1E1E]',
  },
];

const comparisonData = [
  { label: '제조 방식', others: '외주 위탁', ours: '자체 공장 직접 제조' },
  { label: '유통 단계', others: '3~4단계 (마진 누적)', ours: '0단계 (직거래)' },
  { label: '평균 견적가', others: '700~900만원', ours: '500~700만원' },
  { label: '시공팀 경력', others: '확인 불가', ours: '신축 리모델링 아파트 다수 경험 및 대기업 경력 보유' },
  { label: 'A/S 보증', others: '1~2년', ours: '10년 이상 무상' },
  { label: '공장 견학', others: false, ours: true },
];

export default function LandingSolution() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-2 bg-[#FFF3EB] text-[#FF6F0F] rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            왜 창호의민족인가?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-3 sm:mb-4 tracking-tight leading-tight">
            같은 창호인데
            <br />
            <span className="text-[#FF6F0F]">왜 가격이 다를까요?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#767676] max-w-2xl mx-auto px-2">
            비밀은 간단합니다. <span className="text-[#1E1E1E] font-bold">중간에서 빠지는 돈이 없으니까요.</span>
          </p>
        </AnimatedSection>

        {/* Solution Cards - 3가지로 압축 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20">
          {solutions.map((solution, index) => (
            <AnimatedSection key={solution.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-2 border-gray-100 hover:border-[#2AC1BC] transition-all h-full group"
              >
                {/* Number Badge */}
                <span className="absolute top-4 sm:top-6 right-4 sm:right-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-100 group-hover:text-[#E8F8F7] transition-colors">
                  {solution.number}
                </span>

                {/* Icon */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#E8F8F7] flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-[#2AC1BC] transition-colors">
                  <solution.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#2AC1BC] group-hover:text-white transition-colors" />
                </div>

                {/* Highlight Badge */}
                <span className={`inline-block px-2 sm:px-3 py-1 ${solution.color} text-white text-[10px] sm:text-xs font-bold rounded-full mb-3 sm:mb-4`}>
                  {solution.highlight}
                </span>

                {/* Content */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1E1E1E] mb-1 sm:mb-2 leading-tight pr-8">
                  {solution.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FF6F0F] font-semibold mb-2 sm:mb-3">
                  {solution.subtitle}
                </p>
                <p className="text-[#767676] leading-relaxed text-xs sm:text-sm">
                  {solution.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Comparison Table */}
        <AnimatedSection delay={0.3}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-[#1E1E1E] mb-6 sm:mb-8">
              한눈에 비교해보세요
            </h3>
            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-gray-100 shadow-lg overflow-x-auto">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-[#1E1E1E] text-white min-w-[320px]">
                <div className="p-3 sm:p-4 md:p-6 font-bold text-[11px] sm:text-sm md:text-base">비교 항목</div>
                <div className="p-3 sm:p-4 md:p-6 font-bold text-center text-[11px] sm:text-sm md:text-base border-l border-white/20">일반 업체</div>
                <div className="p-3 sm:p-4 md:p-6 font-bold text-center text-[11px] sm:text-sm md:text-base border-l border-white/20 bg-[#2AC1BC]">창호의 민족</div>
              </div>

              {/* Table Rows */}
              {comparisonData.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 min-w-[320px] ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <div className="p-3 sm:p-4 md:p-5 font-semibold text-[#1E1E1E] text-[11px] sm:text-sm md:text-base">
                    {row.label}
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 text-center text-[#767676] text-[11px] sm:text-sm md:text-base border-l border-gray-100">
                    {typeof row.others === 'boolean' ? (
                      row.others ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mx-auto" />
                      )
                    ) : (
                      row.others
                    )}
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 text-center font-semibold text-[#FF6F0F] text-[11px] sm:text-sm md:text-base border-l border-gray-100 bg-[#FFF3EB]/30">
                    {typeof row.ours === 'boolean' ? (
                      row.ours ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mx-auto" />
                      )
                    ) : (
                      row.ours
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-6 sm:mt-8 px-2">
              <p className="text-sm sm:text-base text-[#767676] mb-2">
                💡 <span className="font-bold text-[#1E1E1E]">같은 KCC창호</span>인데 왜 가격이 다르냐고요?
              </p>
              <p className="text-base sm:text-lg font-bold text-[#FF6F0F]">
                중간에서 빠지는 마진이 없으니까요.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
