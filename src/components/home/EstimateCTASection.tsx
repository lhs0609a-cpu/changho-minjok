'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, Clock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const features = [
  { icon: Calculator, text: '실시간 견적 계산', description: 'AI 기반 정확한 계산' },
  { icon: Clock, text: '30초 만에 완료', description: '간편한 6단계' },
  { icon: CheckCircle, text: '무료 견적', description: '부담 없이 확인' },
];

export default function EstimateCTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-[100px]"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-white/90 font-medium text-sm">온라인 견적 시뮬레이션</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                <span className="block">30초 만에</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200">
                  예상 견적 확인
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                복잡한 창호 견적, 더 이상 어렵게 생각하지 마세요.
                <br className="hidden md:block" />
                건물 유형과 사양만 선택하면 예상 가격을 바로 확인할 수 있습니다.
              </p>
            </AnimatedSection>
          </div>

          {/* Feature Cards */}
          <AnimatedSection delay={0.3}>
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative p-6 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-0.5">{feature.text}</h3>
                      <p className="text-white/60 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA Button */}
          <AnimatedSection delay={0.4} className="text-center">
            <Link
              href="/estimate"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/25 hover:-translate-y-1 transition-all duration-300"
            >
              지금 바로 견적 받기
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>

            <p className="mt-6 text-white/50 text-sm">
              회원가입 없이 바로 이용 가능합니다
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
