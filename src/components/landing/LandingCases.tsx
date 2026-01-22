'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const cases = [
  {
    id: 'yangjung',
    name: '양정현대아파트',
    location: '부산 부산진구',
    before: '/images/landing/cases/yangjung/before.jpg',
    after: '/images/landing/cases/yangjung/after.jpg',
  },
  {
    id: 'dongwon',
    name: '동원로얄듀크',
    location: '부산 동래구',
    before: '/images/landing/cases/dongwon/before.jpg',
    after: '/images/landing/cases/dongwon/after.jpg',
  },
  {
    id: 'cheongdo',
    name: '청도주택',
    location: '경북 청도군',
    before: '/images/landing/cases/cheongdo/before.jpg',
    after: '/images/landing/cases/cheongdo/after.jpg',
  },
  {
    id: 'towol',
    name: '토월성원아파트',
    location: '대구 달서구',
    before: '/images/landing/cases/towol/before.jpg',
    after: '/images/landing/cases/towol/after.jpg',
  },
];

export default function LandingCases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(true);

  const currentCase = cases[currentIndex];

  const nextCase = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const prevCase = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#E8F8F7] text-[#2AC1BC] rounded-full text-sm font-bold mb-6">
            Before & After
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-6 tracking-tight">
            <span className="text-[#2AC1BC]">이렇게</span> 달라집니다
          </h2>
          <p className="text-lg text-[#767676]">
            실제 시공 사례를 확인해보세요
          </p>
        </AnimatedSection>

        {/* Case Viewer */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-4xl mx-auto">
            {/* Main Image */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentCase.id}-${showAfter ? 'after' : 'before'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={showAfter ? currentCase.after : currentCase.before}
                    alt={`${currentCase.name} ${showAfter ? '시공 후' : '시공 전'}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Label */}
              <div
                className={`absolute top-6 left-6 px-5 py-2 rounded-full font-bold ${
                  showAfter
                    ? 'bg-[#2AC1BC] text-white'
                    : 'bg-black/70 text-white'
                }`}
              >
                {showAfter ? '시공 후' : '시공 전'}
              </div>

              {/* Location Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full">
                <MapPin className="w-4 h-4 text-[#2AC1BC]" />
                <span className="text-sm font-semibold text-[#1E1E1E]">
                  {currentCase.name}
                </span>
                <span className="text-sm text-[#767676]">{currentCase.location}</span>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevCase}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-[#1E1E1E]" />
              </button>
              <button
                onClick={nextCase}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-[#1E1E1E]" />
              </button>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setShowAfter(false)}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  !showAfter
                    ? 'bg-[#1E1E1E] text-white'
                    : 'bg-gray-100 text-[#767676] hover:bg-gray-200'
                }`}
              >
                시공 전
              </button>
              <button
                onClick={() => setShowAfter(true)}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  showAfter
                    ? 'bg-[#2AC1BC] text-white'
                    : 'bg-gray-100 text-[#767676] hover:bg-gray-200'
                }`}
              >
                시공 후
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-3">
              {cases.map((caseItem, index) => (
                <button
                  key={caseItem.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-[#2AC1BC] scale-110'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={caseItem.after}
                    alt={caseItem.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
