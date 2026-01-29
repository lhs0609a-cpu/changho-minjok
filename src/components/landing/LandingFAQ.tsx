'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const faqs = [
  {
    question: '"싼 게 비지떡 아닌가요? 품질이 걱정돼요"',
    answer:
      '저희는 발코니창호 공식 파트너입니다. 똑같은 정품인데 왜 저렴하냐? 중간 유통상이 없으니까요. 총판→대리점→시공업체를 거치면 50% 마진이 붙습니다. 저희는 공장에서 바로 고객님 집으로 가니까 그 마진이 0원입니다.',
  },
  {
    question: '"견적 받으면 계약할 때까지 전화 폭탄 오는 거 아니에요?"',
    answer:
      '절대 그렇지 않습니다. 저희는 공장 운영하느라 바빠서 강매할 시간이 없어요. 견적 한 번 드리고, 비교해보시라고 끝. 3개월 뒤에 연락 주셔도 같은 가격 적용해드립니다. 강매하면 뭐합니까, 입소문 나쁘게 나면 공장 접어야죠.',
  },
  {
    question: '"하루 만에 된다는데 날림 공사 아닌가요?"',
    answer:
      '창호는 이미 공장에서 완성되어 옵니다. 시공 당일은 "설치만" 하는 거예요. 기존 창 철거 2시간 + 새 창 설치 4시간 + 마감 2시간. 신축 리모델링 아파트 다수 경험 및 대기업 경력 보유 기술진이 직접 시공하니까 가능합니다. 날림이면 10년 A/S를 왜 걸겠습니까.',
  },
  {
    question: '"A/S 한다더니 연락 안 되면 어떡해요?"',
    answer:
      '카카오톡 채널로 사진만 보내주세요. 24시간 내 기사가 방문합니다. 저희는 3,500평 공장과 전문건설업 면허가 있는 법인입니다. 연락 안 받고 도망가면 면허 취소당해요. 도망갈 수가 없습니다.',
  },
  {
    question: '"현장에서 추가 비용 청구하는 거 아니에요?"',
    answer:
      '방문 실측 후 드리는 견적서 = 최종 금액입니다. 철거비, 마감비, 부자재비 전부 포함. 계약서에 "추가 비용 발생 시 전액 환불"이라고 명시합니다. 추가 청구했다가 환불해드리면 저희만 손해잖아요.',
  },
  {
    question: '"공장이 진짜 있긴 한 거예요?"',
    answer:
      '경상북도 청도군에 3,500평 스마트 팩토리 있습니다. 매주 토요일 공장 투어 운영해요. 직접 오셔서 생산 라인 보시고, 마음에 안 드시면 계약 안 하셔도 됩니다. 와보시면 왜 저렴한지 바로 이해되실 겁니다.',
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-4 sm:py-6 flex items-center justify-between text-left group"
      >
        <span className="text-sm sm:text-base md:text-lg font-bold text-[#1E1E1E] group-hover:text-[#2AC1BC] transition-colors pr-4 sm:pr-8">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#767676]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 sm:pb-6 text-xs sm:text-sm md:text-base text-[#767676] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 md:py-28 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-2 bg-[#E8F8F7] text-[#2AC1BC] rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            솔직한 Q&A
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-3 sm:mb-4 tracking-tight">
            고객님들이 <span className="text-[#2AC1BC]">실제로</span> 물어보신 것들
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#767676] max-w-2xl mx-auto px-2">
            듣기 좋은 말 대신, 솔직하게 답변드립니다
          </p>
        </AnimatedSection>

        {/* FAQ List */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border-2 border-gray-100">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
