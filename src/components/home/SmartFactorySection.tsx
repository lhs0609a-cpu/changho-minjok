'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, motion } from 'framer-motion';
import { Play, ArrowRight, CheckCircle } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Link from 'next/link';

const stats = [
  { value: 10, suffix: '년 이상 →', label: '제조 경력', description: '2015년 설립' },
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
    <section className="relative py-16 md:py-24 lg:py-32 bg-gray-50 overflow-hidden">
      {/* Gradient Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-400 rounded-full blur-[200px] opacity-5" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <AnimatedSection>
              <span className="inline-block px-4 py-2 bg-[#1E1E1E] rounded-full text-white text-sm font-bold mb-8">
                Smart Factory
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#1E1E1E] mb-4 md:mb-6 tracking-tight leading-[1.1]">
                스마트 팩토리로
                <br />
                완성한{' '}
                <span className="text-[#EF4444]">제조의 혁신</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-lg text-[#767676] leading-relaxed mb-10 max-w-xl">
                경기도에 위치한 3,500평 규모의 스마트 팩토리에서
                첨단 자동화 설비와 숙련된 장인의 기술력이 만납니다.
                일관된 품질과 빠른 납기를 보장합니다.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {features.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border-2 border-gray-200"
                  >
                    <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-[#1E1E1E] text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link
                  href="/support/tour"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 px-5 md:px-6 py-3 md:py-4 bg-[#EF4444] rounded-xl text-white font-bold hover:bg-[#DC2626] transition-colors text-sm md:text-base"
                >
                  공장 견학 예약
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about/factory"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 px-5 md:px-6 py-3 md:py-4 bg-white border-2 border-gray-200 rounded-xl text-[#1E1E1E] font-bold hover:border-gray-400 transition-colors text-sm md:text-base"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#1E1E1E] transition-colors">
                    <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
                  </div>
                  공장 둘러보기
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Factory Images & Stats */}
          <div>
            {/* Factory YouTube Video - 자동재생 음소거 루프 */}
            <AnimatedSection direction="right">
              <div className="relative aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/Wie9aS4jxdQ?autoplay=1&mute=1&loop=1&playlist=Wie9aS4jxdQ&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  title="창호의민족 스마트 팩토리 소개"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
                {/* Overlay gradient */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                  <p className="text-white font-bold text-base md:text-lg">3,500평 규모 스마트 팩토리</p>
                  <p className="text-white/80 text-xs md:text-sm">자동화 생산 라인 실시간 영상</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Stats Grid */}
            <AnimatedSection delay={0.2} direction="right">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 text-center"
                  >
                    <div className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#1E1E1E] mb-1 tracking-tight">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[#1E1E1E] text-xs md:text-sm font-bold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Quote Card */}
            <AnimatedSection delay={0.4} direction="right">
              <Link href="/support/tour" className="block p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#1E1E1E] hover:bg-[#292929] transition-colors group">
                <p className="text-base md:text-xl text-white font-bold mb-1 md:mb-2">
                  &quot;견적만 비교하지 마시고, 공장을 방문해 주십시오&quot;
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-white/80 text-sm md:text-base">
                    직접 눈으로 확인하는 것이 가장 정확합니다
                  </p>
                  <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
