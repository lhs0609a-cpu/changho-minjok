'use client';

import { motion } from 'framer-motion';
import { Wind, Droplets, Volume2, Thermometer, AlertTriangle } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const problems = [
  {
    icon: Wind,
    title: '이불 덮고 TV 보세요?',
    subtitle: '외풍 때문에',
    description: '창틀 1mm 틈새가 실내 온도 5도 떨어뜨립니다. 보일러 아무리 틀어도 소용없죠.',
    stat: '온도 5°C↓',
  },
  {
    icon: Droplets,
    title: '겨울마다 창문 닦느라 지치셨죠?',
    subtitle: '결로 곰팡이',
    description: '창문 물방울, 귀찮은 걸로 끝나면 다행입니다. 곰팡이 포자는 아이 호흡기에 치명적입니다.',
    stat: '호흡기 질환↑',
  },
  {
    icon: Volume2,
    title: '새벽 4시에 차 소리에 깼던 날',
    subtitle: '층간소음 스트레스',
    description: '수면 부채가 쌓이면 건강을 갉아먹습니다. 방음 창호 하나로 숙면이 가능합니다.',
    stat: '수면 품질↓',
  },
  {
    icon: Thermometer,
    title: '지난달 난방비 얼마 나왔습니까?',
    subtitle: '에너지 낭비',
    description: '30평 기준 월 4만원 손해. 1년이면 48만원, 10년이면 480만원. 창호값보다 비쌉니다.',
    stat: '연 48만원 손해',
  },
];

export default function LandingProblem() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header - 고통 강조 */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
            지금 손해보고 계십니다
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-3 sm:mb-4 tracking-tight leading-tight">
            낡은 창호 1년 방치하면
            <br />
            <span className="text-red-500">난방비만 48만원 더 나갑니다</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#767676] max-w-2xl mx-auto px-2">
            창호 교체 미루는 동안, 매일 돈이 새고 있습니다
          </p>
        </AnimatedSection>

        {/* Problem Cards - 고통 증폭 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {problems.map((problem, index) => (
            <AnimatedSection key={problem.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-gray-100 hover:border-red-300 transition-colors h-full relative overflow-hidden"
              >
                {/* Stat Badge */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full">
                  {problem.stat}
                </div>

                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-red-100 flex items-center justify-center mb-3 sm:mb-5">
                  <problem.icon className="w-5 h-5 sm:w-7 sm:h-7 text-red-500" />
                </div>

                <p className="text-[10px] sm:text-sm text-red-500 font-semibold mb-0.5 sm:mb-1">
                  {problem.subtitle}
                </p>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#1E1E1E] mb-2 sm:mb-3 leading-tight">
                  {problem.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#767676] leading-relaxed hidden sm:block">
                  {problem.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Message - 해결책 예고 */}
        <AnimatedSection delay={0.5} className="text-center mt-8 sm:mt-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-[#E8F8F7] rounded-xl sm:rounded-2xl">
            <span className="text-lg sm:text-2xl">👇</span>
            <p className="text-sm sm:text-lg font-bold text-[#1E1E1E]">
              지금 바꾸면{' '}
              <span className="text-[#2AC1BC]">올겨울부터 난방비 30% 절감</span>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
