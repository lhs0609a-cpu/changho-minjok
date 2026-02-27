'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import BeforeAfterSlider from '@/components/tools/BeforeAfterSlider';

export default function BeforeAfterShowcase() {
  return (
    <section className="py-24 md:py-32 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-badge">Before &amp; After</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-6 tracking-tight">
            시공 전후를
            <br />
            <span className="text-[#EF4444]">직접 비교</span>해보세요
          </h2>
          <p className="text-lg text-[#767676] leading-relaxed">
            슬라이더를 좌우로 움직여 시공 전후 변화를 확인하세요.
          </p>
        </AnimatedSection>

        {/* Slider */}
        <AnimatedSection delay={0.2} className="max-w-4xl mx-auto">
          <BeforeAfterSlider
            beforeSrc="/images/portfolio/before-sample.jpg"
            afterSrc="/images/portfolio/after-sample.jpg"
            beforeAlt="시공 전 - 낡은 창호"
            afterAlt="시공 후 - 새 창호"
          />
          <p className="text-center text-[#767676] text-sm mt-4">
            드래그하여 비교해보세요
          </p>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E1E1E] text-white rounded-xl font-bold hover:bg-[#292929] transition-colors group"
          >
            시공사례 더 보기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
