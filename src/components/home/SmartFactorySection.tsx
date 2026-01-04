'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, motion } from 'framer-motion';
import { Play, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Link from 'next/link';

const stats = [
  { value: 10, suffix: '년+', label: '제조 경력', description: '2015년 설립' },
  { value: 3500, suffix: '평', label: '공장 규모', description: '경기도 소재' },
  { value: 30, suffix: '세대/일', label: '일일 생산량', description: '안정적 공급' },
  { value: 15000, suffix: '+', label: '누적 시공', description: '고객 만족' },
];

const features = [
  '전 공정 자동화 시스템',
  'TPS 단열 간봉 자동화 라인',
  '내외부 전체 가스켓 마감',
  '실시간 품질 모니터링',
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function SmartFactorySection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-blue-400 font-medium text-sm">Smart Factory</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                스마트 팩토리로
                <br />
                완성한{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                  제조의 혁신
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl">
                경기도에 위치한 3,500평 규모의 스마트 팩토리에서
                첨단 자동화 설비와 숙련된 장인의 기술력이 만납니다.
                일관된 품질과 빠른 납기를 보장합니다.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {features.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/support/tour"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-blue-600/25 transition-all"
                >
                  공장 견학 예약
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about/factory"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  공장 영상 보기
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Stats Grid */}
          <div>
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-cyan-600/10 transition-all duration-300" />

                    <div className="relative text-center">
                      <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-white font-semibold mb-1">{stat.label}</div>
                      <div className="text-gray-500 text-sm">{stat.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Quote Card */}
            <AnimatedSection delay={0.4} direction="right">
              <div className="mt-6 relative p-6 rounded-2xl overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
                <div className="absolute inset-0 backdrop-blur-sm" />
                <div className="absolute inset-0 border border-white/10 rounded-2xl" />

                <div className="relative">
                  <p className="text-lg text-white font-medium mb-2 italic">
                    &quot;견적만 비교하지 마시고, 공장을 방문해 주십시오&quot;
                  </p>
                  <p className="text-gray-400 text-sm">
                    직접 눈으로 확인하는 것이 가장 정확합니다
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
