'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const features = [
  { icon: Phone, text: '전화 한 통으로 시작', description: '전문 상담원 즉시 안내' },
  { icon: Clock, text: '빠른 무료 방문 견적', description: '정확한 현장 실측' },
  { icon: CheckCircle, text: '부담 없는 상담', description: '강매 없이 비교만' },
];

export default function EstimateCTASection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-[#FF6F0F] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-20 h-20 bg-white/10 rounded-2xl rotate-12"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[10%] w-32 h-32 bg-white/10 rounded-3xl -rotate-12"
      />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-sm font-bold mb-8">
                무료 상담 신청
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                지금 바로
                <br />
                무료 상담 신청
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                복잡한 창호 견적, 더 이상 어렵게 생각하지 마세요.
                <br className="hidden md:block" />
                전화 한 통이면 전문 상담원이 친절하게 안내해드립니다.
              </p>
            </AnimatedSection>
          </div>

          {/* Feature Cards - 배민 스타일 */}
          <AnimatedSection delay={0.3}>
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#FF6F0F] transition-colors">
                      <feature.icon className="w-7 h-7 text-white group-hover:text-[#FF6F0F]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-0.5">{feature.text}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA Button - 배민 스타일 */}
          <AnimatedSection delay={0.4} className="text-center">
            <Link
              href="/estimate"
              className="group inline-flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 bg-[#1E1E1E] text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-[#292929] transition-all duration-300"
            >
              무료 상담 신청하기
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#FF6F0F] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </Link>

            <p className="mt-4 md:mt-6 text-white/60 text-xs md:text-sm font-medium">
              회원가입 없이 바로 이용 가능합니다
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
