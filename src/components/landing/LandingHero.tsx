'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Shield, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/constants/navigation';

const stats = [
  { number: '200', unit: '만원+', label: '평균 절약 금액' },
  { number: '15,000', unit: '+', label: '세대 시공 완료' },
  { number: '10', unit: '년', label: '무상 A/S 보증' },
];

const trustBadges = [
  { icon: Shield, text: '전문건설업 면허 보유' },
  { icon: Award, text: 'KCC글라스 공식 파트너' },
  { icon: Users, text: '대기업 출신 10년+ 기술팀' },
];

export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1E1E1E]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/trust/factory-aerial.jpg"
          alt="창호의 민족 스마트 팩토리"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#1E1E1E]" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Badge - 핵심 이득 강조 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-start mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6F0F] rounded-full text-white text-sm font-bold shadow-lg shadow-[#FF6F0F]/30">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              평균 200만원 절약 · 공장 직거래
            </div>
          </motion.div>

          {/* Main Headline - 고객 관점 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight text-center lg:text-left"
          >
            창호 견적,
            <br />
            <span className="text-[#2AC1BC]">받아보고 놀라셨죠?</span>
            <br />
            <span className="text-[#FF6F0F]">여기서 30% 더 빠집니다</span>
          </motion.h1>

          {/* Sub Headline - 구체적 증거 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed text-center lg:text-left"
          >
            똑같은 KCC·휴그린 창호,
            <br className="md:hidden" />
            <span className="text-[#2AC1BC] font-semibold"> 왜 200만원 더 내세요?</span>
            <br />
            <span className="text-white/70 text-base md:text-lg">
              3,500평 공장에서 직접 만들어 유통 마진 0원.
              <br className="hidden md:block" />
              15,000세대가 선택한 이유, 지금 확인하세요.
            </span>
          </motion.p>

          {/* Stats Row - 고객 이득 중심 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center lg:justify-start gap-6 md:gap-12 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  {stat.number}
                  <span className="text-lg md:text-xl text-[#2AC1BC]">{stat.unit}</span>
                </div>
                <div className="text-xs md:text-sm text-white/60 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - 클릭 유도 강화 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          >
            <Button
              asChild
              size="lg"
              className="h-16 px-10 bg-[#FF6F0F] hover:bg-[#E5630D] text-white rounded-2xl font-bold text-xl shadow-lg shadow-[#FF6F0F]/30 group"
            >
              <a href="#contact-form" className="flex items-center gap-3">
                우리 집 얼마나 아낄 수 있을까?
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-16 px-10 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-[#1E1E1E] rounded-2xl font-bold text-xl"
            >
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-3">
                <Phone className="w-6 h-6" />
                지금 바로 상담
              </a>
            </Button>
          </motion.div>

          {/* Trust Badges - 신뢰 강화 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
              >
                <badge.icon className="w-4 h-4 text-[#2AC1BC]" />
                <span className="text-white/80 text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-sm">아래로 스크롤</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
