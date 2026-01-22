'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const faqs = [
  {
    question: '시공 기간은 얼마나 걸리나요?',
    answer:
      '일반적인 아파트 기준 1~2일 내로 완료됩니다. 창호 개수와 현장 상황에 따라 다소 차이가 있을 수 있으며, 정확한 일정은 현장 실측 후 안내드립니다.',
  },
  {
    question: '거주 중에도 시공이 가능한가요?',
    answer:
      '네, 거주 중에도 시공이 가능합니다. 시공 순서를 조정하여 생활에 불편이 최소화되도록 진행하며, 먼지와 소음 관리에도 각별히 신경 씁니다.',
  },
  {
    question: '견적은 어떻게 받을 수 있나요?',
    answer:
      '홈페이지에서 30초 무료 견적을 신청하시거나, 전화/카카오톡으로 문의주시면 담당자가 신속하게 연락드립니다. 현장 실측 후 정확한 견적을 무료로 제공해 드립니다.',
  },
  {
    question: 'A/S는 어떻게 받나요?',
    answer:
      '제품 하자에 대해서는 10년간 무상 A/S를 제공합니다. 전화 한 통으로 신속하게 접수되며, 전문 기술팀이 직접 방문하여 처리해 드립니다.',
  },
  {
    question: '다른 업체보다 가격이 저렴한 이유가 뭔가요?',
    answer:
      '중간 유통 단계 없이 자체 공장에서 직접 제조하여 공급하기 때문입니다. 3,500평 규모의 스마트 팩토리에서 대량 생산으로 원가를 절감하고, 그 혜택을 고객님께 돌려드립니다.',
  },
  {
    question: '공장 견학이 가능한가요?',
    answer:
      '네, 경상북도 청도군에 위치한 공장을 직접 방문하실 수 있습니다. 사전 예약을 통해 생산 시설과 품질 관리 시스템을 눈으로 확인해 보세요.',
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
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4 sm:mb-6 tracking-tight">
            자주 묻는 <span className="text-[#2AC1BC]">질문</span>
          </h2>
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
