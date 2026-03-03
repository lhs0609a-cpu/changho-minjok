import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import ThermalVisualizer from '@/components/tools/ThermalVisualizer';

export default function ThermalInsulationSection() {
  return (
    <section className="py-24 md:py-32 bg-[#1E1E1E]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-badge">Thermal Insulation</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            단열 성능의 차이를
            <br />
            <span className="text-[#EF4444]">눈으로 확인</span>하세요
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            외부 온도를 조절하여 일반 창호와 단열 창호의 열 손실 차이를 비교해보세요.
          </p>
        </AnimatedSection>

        {/* Visualizer */}
        <AnimatedSection delay={0.2}>
          <ThermalVisualizer />
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Link
            href="/estimate"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#EF4444] text-white rounded-xl font-bold hover:bg-[#DC2626] transition-colors group"
          >
            무료 단열 상담받기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
