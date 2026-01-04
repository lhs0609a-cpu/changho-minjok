'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import AnimatedSection from '@/components/shared/AnimatedSection';

const stats = [
  { value: 10, suffix: '년+', label: '제조 경력' },
  { value: 3500, suffix: '평', label: '공장 규모' },
  { value: 30, suffix: '세대/일', label: '일일 생산량' },
  { value: 5000, suffix: '+', label: '누적 시공' },
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
    <section className="py-20 md:py-28 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <AnimatedSection>
              <span className="text-blue-400 font-medium text-sm tracking-wider uppercase">
                Smart Factory
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
                스마트 팩토리로 완성한
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  제조의 혁신
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                경기도에 위치한 3,500평 규모의 스마트 팩토리에서
                첨단 자동화 설비와 숙련된 장인의 기술력이 만납니다.
                <br /><br />
                TPS 단열 간봉 자동화 라인을 포함한 전 공정 자동화 시스템으로
                일관된 품질과 빠른 납기를 보장합니다.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <ul className="space-y-4">
                {[
                  '전 공정 자동화 시스템',
                  'TPS 단열 간봉 자동화 라인',
                  '내외부 전체 가스켓 마감',
                  '실시간 품질 모니터링',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Stats Grid */}
          <div>
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6 text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={0.3} direction="right">
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl">
                <p className="text-gray-300 mb-4">
                  &quot;견적만 비교하지 마시고, 공장을 방문해 주십시오&quot;
                </p>
                <a
                  href="/support/tour"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                >
                  공장 견학 예약하기 →
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
