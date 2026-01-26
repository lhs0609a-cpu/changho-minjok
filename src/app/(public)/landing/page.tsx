import { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingPromo from '@/components/landing/LandingPromo';
import LandingProblem from '@/components/landing/LandingProblem';
import LandingSolution from '@/components/landing/LandingSolution';
import LandingProcess from '@/components/landing/LandingProcess';
import LandingPricing from '@/components/landing/LandingPricing';
import LandingCases from '@/components/landing/LandingCases';
import LandingReviews from '@/components/landing/LandingReviews';
import LandingObjections from '@/components/landing/LandingObjections';
import LandingFactory from '@/components/landing/LandingFactory';
import LandingTrust from '@/components/landing/LandingTrust';
import LandingProducts from '@/components/landing/LandingProducts';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingCTA from '@/components/landing/LandingCTA';
import FloatingCTA from '@/components/landing/FloatingCTA';
import StickyHeader from '@/components/landing/StickyHeader';

export const metadata: Metadata = {
  title: '창호 견적 받고 심장 떨어지셨죠? 200만원 돌려드립니다 | 창호의 민족',
  description:
    'KCC·휴그린 정품 창호, 공장 직거래로 평균 203만원 절약. 5,000가구+ 시공 완료. 원데이 시공 + 10년 무상 A/S. 추가비용 0원 서면 보장. 지금 30초 무료 견적 받아보세요.',
  keywords: [
    '창호 교체',
    '창문 교체',
    '창호 시공',
    'PVC 창호',
    '시스템 창호',
    '아파트 창호',
    '창호 가격',
    '창호 견적',
    '원데이 시공',
    '창호 공장 직거래',
  ],
  openGraph: {
    title: '창호 견적 받고 심장 떨어지셨죠? 200만원 돌려드립니다 | 창호의 민족',
    description:
      'KCC·휴그린 정품을 공장 직거래로. 5,000가구+ 시공, 평균 203만원 절약, 원데이 시공, 10년 무상 A/S.',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <StickyHeader />
      {/* 1. Hero - 후킹 (3초 룰) */}
      <LandingHero />
      {/* 2. Promo - 긴급성/한정 혜택 */}
      <LandingPromo />
      {/* 3. Problem - 고통 인식 (PAS의 P) */}
      <LandingProblem />
      {/* 4. Solution - 해결책 제시 (PAS의 S) + 비교표 */}
      <LandingSolution />
      {/* 5. Pricing - 가격 앵커링 + ROI */}
      <LandingPricing />
      {/* 6. Process - 원데이 시공 프로세스 */}
      <LandingProcess />
      {/* 7. Cases - Before/After 시각적 증거 */}
      <LandingCases />
      {/* 8. Reviews - 사회적 증거 */}
      <LandingReviews />
      {/* 9. Objections - 의심 파괴 (핵심!) */}
      <LandingObjections />
      {/* 10. Factory - 공장 신뢰 */}
      <LandingFactory />
      {/* 11. Trust - 인증/파트너 */}
      <LandingTrust />
      {/* 12. Products - 제품 라인업 */}
      <LandingProducts />
      {/* 13. FAQ - 마지막 반론 처리 */}
      <LandingFAQ />
      {/* 14. CTA - 최종 전환 */}
      <LandingCTA />
      <FloatingCTA />
    </main>
  );
}
