import { Metadata } from 'next';
import EstimateWizard from '@/components/estimate/EstimateWizard';

export const metadata: Metadata = {
  title: '견적 시뮬레이션',
  description: '30초 만에 창호 교체 예상 견적을 확인하세요. 건물 유형과 사양만 선택하면 바로 예상 가격을 확인할 수 있습니다.',
};

export default function EstimatePage() {
  return <EstimateWizard />;
}
