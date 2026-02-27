import type { Metadata } from 'next';
import WindowDiagnosisQuiz from '@/components/tools/WindowDiagnosisQuiz';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = {
  title: '내 집 창호 진단 퀴즈 | 창호의 민족',
  description: '5가지 간단한 질문으로 우리 집 창호 상태를 진단해보세요. 외풍, 결로, 소음, 난방비 등을 종합 분석하여 교체 필요성을 알려드립니다.',
};

export default function DiagnosisPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-badge">Window Diagnosis</span>
            <h1 className="page-hero-title">
              우리 집 창호,
              <br />
              <span className="text-[#EF4444]">교체가 필요</span>할까?
            </h1>
            <p className="text-lg text-[#767676] leading-relaxed">
              5가지 간단한 질문으로 창호 상태를 진단해보세요.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <WindowDiagnosisQuiz />
        </div>
      </section>
    </div>
  );
}
