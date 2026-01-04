'use client';

import Link from 'next/link';
import { Calculator, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

const features = [
  { icon: Calculator, text: '실시간 견적 계산' },
  { icon: Clock, text: '30초 만에 완료' },
  { icon: CheckCircle, text: '부담 없는 무료 견적' },
];

export default function EstimateCTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-white/80 text-sm mb-6">
              온라인 견적 시뮬레이션
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              30초 만에 예상 견적 확인
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              복잡한 창호 견적, 더 이상 어렵게 생각하지 마세요.
              <br className="hidden md:block" />
              건물 유형과 사양만 선택하면 예상 가격을 바로 확인할 수 있습니다.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {features.map((feature) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-2 text-white/90"
                >
                  <feature.icon className="w-5 h-5 text-blue-300" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 hover:bg-white/90 text-lg px-10 py-6 h-auto shadow-xl"
            >
              <Link href="/estimate">지금 바로 견적 받기</Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
