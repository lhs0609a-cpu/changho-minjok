'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const features = [
  { icon: Calculator, text: '실시간 견적 계산', description: 'AI 기반 정확한 계산' },
  { icon: Clock, text: '30초 만에 완료', description: '간편한 6단계' },
  { icon: CheckCircle, text: '무료 견적', description: '부담 없이 확인' },
];

export default function EstimateCTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-[#2AC1BC] overflow-hidden">
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
                온라인 견적 시뮬레이션
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                30초 만에
                <br />
                예상 견적 확인
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                복잡한 창호 견적, 더 이상 어렵게 생각하지 마세요.
                <br className="hidden md:block" />
                건물 유형과 사양만 선택하면 예상 가격을 바로 확인할 수 있습니다.
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
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#2AC1BC] transition-colors">
                      <feature.icon className="w-7 h-7 text-white group-hover:text-[#2AC1BC]" />
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
              className="group inline-flex items-center gap-4 px-10 py-5 bg-[#1E1E1E] text-white rounded-2xl font-bold text-lg hover:bg-[#292929] transition-all duration-300"
            >
              지금 바로 견적 받기
              <div className="w-12 h-12 rounded-xl bg-[#2AC1BC] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
            </Link>

            <p className="mt-6 text-white/60 text-sm font-medium">
              회원가입 없이 바로 이용 가능합니다
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
