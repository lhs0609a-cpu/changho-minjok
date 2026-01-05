import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';
import FAQAccordion from '@/components/support/FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description: '창호 교체에 대해 자주 묻는 질문들을 확인하세요. 견적, 시공, A/S에 대한 답변을 찾아보세요.',
};

const faqCategories = [
  {
    category: '견적 관련',
    items: [
      {
        question: '견적은 어떻게 받을 수 있나요?',
        answer: '홈페이지의 무료 견적 시뮬레이션을 이용하시면 약 30초 만에 예상 견적을 확인하실 수 있습니다. 정확한 견적을 위해서는 무료 현장 방문 상담을 신청해주세요.',
      },
      {
        question: '견적 비용이 발생하나요?',
        answer: '아니요, 현장 방문 상담 및 견적은 100% 무료입니다. 부담 없이 신청해주세요.',
      },
      {
        question: '견적 후 반드시 계약해야 하나요?',
        answer: '전혀 그렇지 않습니다. 견적은 참고용이며, 충분히 비교 검토 후 결정하시면 됩니다.',
      },
      {
        question: '창호 가격은 어떻게 결정되나요?',
        answer: '창호 가격은 프레임 종류(PVC, 하이샤시, 시스템), 유리 사양, 창문 크기 및 개수, 철거 범위 등에 따라 달라집니다. 정확한 가격은 현장 실측 후 안내드립니다.',
      },
    ],
  },
  {
    category: '시공 관련',
    items: [
      {
        question: '시공 기간은 얼마나 걸리나요?',
        answer: '일반 아파트 기준 1~2일이면 시공이 완료됩니다. 전체 창호 교체 시에도 대부분 하루 안에 마무리됩니다.',
      },
      {
        question: '시공 중 거주가 가능한가요?',
        answer: '네, 거주하시면서 시공 가능합니다. 다만 시공 중 먼지와 소음이 발생할 수 있어, 시공 당일은 외출을 권장드립니다.',
      },
      {
        question: '기존 창호 철거는 어떻게 하나요?',
        answer: '기존 창호는 저희가 철거 및 폐기 처리합니다. 철거 비용은 견적에 포함되어 있습니다.',
      },
      {
        question: '창호 시공 시 벽지 손상이 있나요?',
        answer: '최소한의 손상으로 시공하지만, 창틀 주변 일부 보수가 필요할 수 있습니다. 필요 시 마감 처리를 함께 진행해드립니다.',
      },
    ],
  },
  {
    category: '제품 관련',
    items: [
      {
        question: 'PVC 창호와 시스템창호의 차이는 무엇인가요?',
        answer: 'PVC 창호는 경제적이고 일반적인 선택이며, 시스템창호는 유럽식 고기밀 창호로 단열/방음 성능이 월등합니다. 시스템창호는 패시브하우스 기준에도 부합합니다.',
      },
      {
        question: '로이(Low-E) 유리가 무엇인가요?',
        answer: '로이유리는 유리 표면에 특수 금속막을 코팅하여 열 손실을 줄이고 에너지 효율을 높인 유리입니다. 겨울에는 실내 열을 보존하고, 여름에는 외부 열을 차단합니다.',
      },
      {
        question: 'TPS 단열간봉의 장점은 무엇인가요?',
        answer: 'TPS 단열간봉은 알루미늄 간봉 대비 열전도율이 1/1000 수준으로 결로 방지에 탁월합니다. 저희는 자체 스마트 팩토리에서 TPS를 직접 생산하여 품질과 가격 모두 경쟁력이 있습니다.',
      },
    ],
  },
  {
    category: 'A/S 관련',
    items: [
      {
        question: 'A/S 보증 기간은 얼마인가요?',
        answer: '제품 및 시공에 대해 기본 2년 무상 A/S를 제공하며, 제품 자체 결함에 대해서는 10년간 품질을 보증합니다.',
      },
      {
        question: 'A/S 신청은 어떻게 하나요?',
        answer: '고객센터 전화 또는 홈페이지 상담 신청을 통해 접수하시면 빠르게 방문 처리해드립니다.',
      },
      {
        question: '보증 기간 이후 수리 비용은 얼마인가요?',
        answer: '보증 기간 이후에는 실비로 수리가 진행되며, 부품 및 작업 내용에 따라 비용이 달라집니다. 사전에 비용 안내 후 진행됩니다.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-badge">FAQ</span>
            <h1 className="page-hero-title">자주 묻는 질문</h1>
            <p className="page-hero-subtitle">
              창호 교체에 대해 궁금한 점을 확인해보세요.
              <br />
              원하는 답변이 없다면 상담을 신청해주세요.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <AnimatedSection key={category.category} delay={categoryIndex * 0.1} className="mb-12 last:mb-0">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">
                    {categoryIndex + 1}
                  </span>
                  {category.category}
                </h2>
                <FAQAccordion items={category.items} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              원하는 답변을 찾지 못하셨나요?
            </h2>
            <p className="text-sky-100 mb-8">
              전문 상담원이 친절하게 답변해드립니다.
            </p>
            <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50 rounded-xl">
              <Link href="/support/inquiry">
                상담 신청하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
