'use client';

import { motion } from 'framer-motion';
import {
  Wallet,
  Factory,
  Phone,
  Clock,
  ShieldCheck,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const objections = [
  {
    icon: Wallet,
    doubt: '"싸다고 해놓고 추가비용 붙이는 거 아냐?"',
    answer: '추가비용 0원 서면 보장',
    detail: '현장 방문 후 견적 = 최종 금액. 철거비, 마감비, 부자재비 전부 포함. 계약서에 명시하고, 추가 청구 시 전액 환불해드립니다.',
    badge: '0원 보장',
    color: 'bg-green-500',
  },
  {
    icon: Factory,
    doubt: '"진짜 공장이 있긴 한 거야?"',
    answer: '3,500평 공장 직접 오셔서 보세요',
    detail: '경북 청도군에 위치한 스마트 팩토리. 매주 토요일 공장 투어 운영 중. 실제 생산 라인과 품질 검사 과정을 눈으로 확인하세요.',
    badge: '공장 투어',
    color: 'bg-[#2AC1BC]',
  },
  {
    icon: Phone,
    doubt: '"시공 후 연락 안 되면 어쩌지?"',
    answer: '카톡으로 사진만 보내세요',
    detail: 'A/S 전담팀 상시 대기. 카카오톡으로 하자 사진만 보내면 24시간 내 기사 방문. 10년간 무상, 그 후에도 실비로 평생 A/S.',
    badge: '24시간 내 방문',
    color: 'bg-[#FF6F0F]',
  },
  {
    icon: Clock,
    doubt: '"하루 만에 된다더니 실제로는 며칠 걸리는 거 아냐?"',
    answer: '창호 미리 제작 → 설치만 당일 진행',
    detail: '창호는 계약 후 공장에서 미리 제작 완료. 시공 당일은 철거→설치→마감만. 그래서 아침 9시 시작, 저녁 6시 완료가 가능합니다.',
    badge: '1-day 시공',
    color: 'bg-purple-500',
  },
];

const guarantees = [
  { icon: ShieldCheck, text: '추가비용 발생 시 전액 환불' },
  { icon: MessageSquare, text: '카톡 A/S 접수 24시간 내 방문' },
  { icon: Factory, text: '공장 견학 후 계약 취소 가능' },
];

export default function LandingObjections() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-[#1E1E1E]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 text-white rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
            의심 해소 보장
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            아직도 <span className="text-[#FF6F0F]">찜찜하시다면</span>
            <br />
            이것만 확인하세요
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            고객님이 걱정하시는 부분, 저희가 먼저 해결해 드립니다
          </p>
        </AnimatedSection>

        {/* Objection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
          {objections.map((obj, index) => (
            <AnimatedSection key={obj.doubt} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#292929] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-[#3A3A3A] hover:border-[#2AC1BC] transition-all h-full"
              >
                {/* Badge */}
                <span className={`inline-block px-2 sm:px-3 py-1 ${obj.color} text-white text-[10px] sm:text-xs font-bold rounded-full mb-3 sm:mb-4`}>
                  {obj.badge}
                </span>

                {/* Doubt (Question) */}
                <div className="flex items-start gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm sm:text-base">?</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-400 italic leading-relaxed">
                    {obj.doubt}
                  </p>
                </div>

                {/* Answer */}
                <div className="flex items-start gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#2AC1BC]/20 flex items-center justify-center flex-shrink-0">
                    <obj.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC]" />
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
                    {obj.answer}
                  </p>
                </div>

                {/* Detail */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed pl-11 sm:pl-13">
                  {obj.detail}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Guarantee Badges */}
        <AnimatedSection delay={0.4}>
          <div className="bg-gradient-to-r from-[#2AC1BC]/20 to-[#2AC1BC]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#2AC1BC]/30">
            <h3 className="text-center text-white font-bold text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
              창호의 민족 <span className="text-[#2AC1BC]">3대 보장</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {guarantees.map((g, index) => (
                <motion.div
                  key={g.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#2AC1BC] flex items-center justify-center flex-shrink-0">
                    <g.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white text-sm sm:text-base font-medium">{g.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.5} className="text-center mt-8 sm:mt-12 px-2">
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#FF6F0F] text-white rounded-xl font-bold text-sm sm:text-lg hover:bg-[#E5630D] transition-colors shadow-lg shadow-[#FF6F0F]/30 group w-full sm:w-auto"
          >
            의심 말고 일단 견적부터 받아보세요
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-gray-500 text-xs sm:text-sm mt-3">
            * 강매 없음 · 부담 없이 비교만 해보세요
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
