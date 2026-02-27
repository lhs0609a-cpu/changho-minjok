import type { Metadata } from 'next';
import SavingsCalculator from '@/components/tools/SavingsCalculator';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = {
  title: '난방비 절감 계산기 | 창호의 민족',
  description: '창호 교체 시 예상 난방비 절감액을 계산해보세요. 연간 절감액, 10년 누적 절감액, 시공비 대비 회수 기간을 확인할 수 있습니다.',
};

export default function SavingsCalculatorPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-badge">Savings Calculator</span>
            <h1 className="page-hero-title">
              창호 교체하면
              <br />
              <span className="text-[#EF4444]">얼마나 절약</span>될까?
            </h1>
            <p className="text-lg text-[#767676] leading-relaxed">
              3단계 간단 입력으로 예상 절감액을 확인해보세요.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <SavingsCalculator />
        </div>
      </section>
    </div>
  );
}
