import { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingProblem from '@/components/landing/LandingProblem';
import LandingSolution from '@/components/landing/LandingSolution';
import LandingFactory from '@/components/landing/LandingFactory';
import LandingPricing from '@/components/landing/LandingPricing';
import LandingCases from '@/components/landing/LandingCases';
import LandingTrust from '@/components/landing/LandingTrust';
import LandingProducts from '@/components/landing/LandingProducts';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingCTA from '@/components/landing/LandingCTA';
import FloatingCTA from '@/components/landing/FloatingCTA';
import StickyHeader from '@/components/landing/StickyHeader';

export const metadata: Metadata = {
  title: '창호 견적, 받아보고 놀라셨죠? 여기서 30% 더 빠집니다 | 창호의 민족',
  description:
    '똑같은 KCC·휴그린 창호, 왜 200만원 더 내세요? 3,500평 공장 직영으로 유통 마진 0원. 15,000세대 시공 완료, 10년 무상 A/S. 지금 30초 무료 견적 받아보세요.',
  keywords: [
    '창호 교체',
    '창문 교체',
    '창호 시공',
    'PVC 창호',
    '시스템 창호',
    '아파트 창호',
    '창호 가격',
    '창호 견적',
  ],
  openGraph: {
    title: '창호 견적, 받아보고 놀라셨죠? 여기서 30% 더 빠집니다 | 창호의 민족',
    description:
      '똑같은 KCC창호인데 왜 200만원 더 내세요? 공장 직거래로 유통 마진 0원. 10년 무상 A/S.',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <StickyHeader />
      <LandingHero />
      <LandingProblem />
      <LandingSolution />
      <LandingFactory />
      <LandingPricing />
      <LandingCases />
      <LandingTrust />
      <LandingProducts />
      <LandingFAQ />
      <LandingCTA />
      <FloatingCTA />
    </main>
  );
}
