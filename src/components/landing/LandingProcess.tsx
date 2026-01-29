'use client';

import { motion } from 'framer-motion';
import { Clock, Phone, Ruler, FileText, Wrench, HeartHandshake, CheckCircle2, Zap } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const processSteps = [
  {
    step: '01',
    icon: Phone,
    title: '무료 상담',
    description: '전화 또는 온라인으로 간편 상담',
    duration: '5분',
  },
  {
    step: '02',
    icon: Ruler,
    title: '무료 방문견적',
    description: '전문가가 직접 방문하여 정확한 실측',
    duration: '30분',
  },
  {
    step: '03',
    icon: FileText,
    title: '맞춤 견적',
    description: '합리적인 가격으로 투명한 견적서 제공',
    duration: '당일',
  },
  {
    step: '04',
    icon: Wrench,
    title: '1-day 시공',
    description: '숙련된 기술진의 빠르고 깔끔한 시공',
    duration: '1일',
    highlight: true,
  },
  {
    step: '05',
    icon: HeartHandshake,
    title: '10년 A/S',
    description: '시공 후에도 책임지는 장기 보증',
    duration: '10년',
  },
];

const oneDayBenefits = [
  { text: '철거부터 마감까지 하루 완료', icon: Clock },
  { text: '생활 불편 최소화', icon: CheckCircle2 },
  { text: '추가 비용 없는 원스톱 서비스', icon: Zap },
];

export default function LandingProcess() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-gradient-to-b from-white to-[#F8F9FA]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* One Day Badge */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-[#FF6F0F] rounded-2xl sm:rounded-full text-white mb-6 sm:mb-8 shadow-lg shadow-[#FF6F0F]/30"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-lg sm:text-xl md:text-2xl font-extrabold">1-day 시공</span>
            </div>
            <span className="hidden sm:block w-px h-6 bg-white/30" />
            <span className="text-sm sm:text-base font-medium">
              아침에 시작해서 저녁에 완료!
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4 sm:mb-6 tracking-tight leading-tight">
            거주하시면서
            <br className="sm:hidden" />
            <span className="text-[#2AC1BC]"> 하루만에 끝</span>납니다
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#767676] max-w-2xl mx-auto px-2">
            이사 갈 필요 없이, 생활하시면서 창호 교체 가능합니다.
            <br />
            <span className="font-semibold text-[#1E1E1E]">철거부터 마감까지 단 하루!</span>
          </p>
        </AnimatedSection>

        {/* One Day Benefits */}
        <AnimatedSection delay={0.1} className="mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {oneDayBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-[#E8F8F7] rounded-full"
              >
                <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC]" />
                <span className="text-xs sm:text-sm font-semibold text-[#1E1E1E]">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Process Timeline */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-[#1E1E1E] mb-8 sm:mb-12">
              상담부터 A/S까지, <span className="text-[#2AC1BC]">5단계 원스톱 서비스</span>
            </h3>

            {/* Desktop Timeline */}
            <div className="hidden md:block relative">
              {/* Connection Line */}
              <div className="absolute top-16 left-0 right-0 h-1 bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="h-full bg-[#2AC1BC]"
                />
              </div>

              <div className="grid grid-cols-5 gap-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Icon Circle */}
                    <div
                      className={`relative z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
                        step.highlight
                          ? 'bg-[#FF6F0F] shadow-[#FF6F0F]/30'
                          : 'bg-[#2AC1BC] shadow-[#2AC1BC]/30'
                      }`}
                    >
                      <step.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                      {step.highlight && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#1E1E1E] text-white text-[10px] font-bold rounded-full">
                          핵심
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <span className="text-xs text-[#2AC1BC] font-bold mb-1">STEP {step.step}</span>
                    <h4 className="text-base lg:text-lg font-bold text-[#1E1E1E] mb-1">{step.title}</h4>
                    <p className="text-xs lg:text-sm text-[#767676] mb-2 px-2">{step.description}</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        step.highlight
                          ? 'bg-[#FF6F0F]/10 text-[#FF6F0F]'
                          : 'bg-gray-100 text-[#767676]'
                      }`}
                    >
                      {step.duration}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 ${
                    step.highlight
                      ? 'bg-[#FF6F0F]/5 border-[#FF6F0F]'
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      step.highlight ? 'bg-[#FF6F0F]' : 'bg-[#2AC1BC]'
                    }`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#2AC1BC] font-bold">STEP {step.step}</span>
                      {step.highlight && (
                        <span className="px-2 py-0.5 bg-[#FF6F0F] text-white text-[10px] font-bold rounded-full">
                          핵심
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[#1E1E1E] mb-0.5">{step.title}</h4>
                    <p className="text-xs text-[#767676]">{step.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                      step.highlight
                        ? 'bg-[#FF6F0F]/10 text-[#FF6F0F]'
                        : 'bg-gray-100 text-[#767676]'
                    }`}
                  >
                    {step.duration}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-10 sm:mt-16">
          <p className="text-sm sm:text-base text-[#767676] mb-4">
            복잡한 절차 없이, <span className="font-bold text-[#1E1E1E]">전화 한 통이면 시작</span>됩니다
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#1E1E1E] text-white rounded-xl font-bold text-sm sm:text-base hover:bg-[#292929] transition-colors"
          >
            <Ruler className="w-4 h-4 sm:w-5 sm:h-5" />
            무료 방문견적 신청하기
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
