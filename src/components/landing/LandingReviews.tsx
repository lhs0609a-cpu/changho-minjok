'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar, ThumbsUp } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const reviews = [
  {
    id: 1,
    name: '김**',
    location: '부산 해운대구',
    date: '2024.12',
    rating: 5,
    content: '다른 곳에서 900만원 견적 받고 여기 문의했는데 700만원에 해결했습니다. 처음엔 가격이 너무 싸서 의심했는데, 직접 공장 견학 가보니까 이해됐어요. 중간 마진 없이 직접 만들어서 이 가격이 가능하다고 하더라고요. 시공도 하루만에 깔끔하게 끝났습니다.',
    highlight: '200만원 절약',
    verified: true,
  },
  {
    id: 2,
    name: '이**',
    location: '대구 수성구',
    date: '2024.11',
    rating: 5,
    content: '20년 된 아파트라 겨울마다 외풍이 심했는데, 창호 바꾸고 나서 보일러 안 틀어도 따뜻해요. 난방비가 확 줄었습니다. 무엇보다 하루만에 끝나서 아이들 학교 보내고 퇴근하니까 다 끝나있어서 좋았어요.',
    highlight: '1-day 시공',
    verified: true,
  },
  {
    id: 3,
    name: '박**',
    location: '울산 남구',
    date: '2024.10',
    rating: 5,
    content: '3군데 견적 받아봤는데 여기가 제일 저렴하고 친절했습니다. 실측 오신 분이 꼼꼼하게 봐주시고, KCC 제품으로 견적 주셨어요. 시공 후 10년 A/S 보증서도 주시고, 법인이라 안심되네요.',
    highlight: '10년 A/S',
    verified: true,
  },
  {
    id: 4,
    name: '정**',
    location: '경북 경주시',
    date: '2024.09',
    rating: 5,
    content: '청도 공장에서 직접 만들어서 배송비도 저렴하고 품질도 좋습니다. 다른 데서 로이유리 추가하면 훨씬 비싼데 여기는 기본 포함이라 가성비 최고예요. 결로도 확실히 줄었습니다.',
    highlight: '로이유리 기본',
    verified: true,
  },
  {
    id: 5,
    name: '최**',
    location: '부산 동래구',
    date: '2024.08',
    rating: 5,
    content: '층간소음 때문에 방음 창호로 교체했는데 확실히 다릅니다. 시스템창호로 했는데 바깥 소리가 거의 안 들려요. 가격도 다른 데보다 훨씬 저렴했고, 기술자분들이 대기업 출신이라 그런지 마감이 깔끔해요.',
    highlight: '방음 효과',
    verified: true,
  },
];

const stats = [
  { number: '4.9', label: '평균 만족도', suffix: '/5.0' },
  { number: '98', label: '재구매 의향', suffix: '%' },
  { number: '5,000', label: '시공 완료', suffix: '+' },
];

export default function LandingReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-12 sm:py-16 md:py-28 bg-[#1E1E1E] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-3 sm:px-4 py-2 bg-[#2AC1BC] text-white rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            Real Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            <span className="text-[#2AC1BC]">5,000세대</span>가
            <br className="sm:hidden" />
            선택한 이유
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            직접 경험하신 고객님들의 생생한 후기입니다
          </p>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.1} className="mb-10 sm:mb-16">
          <div className="flex justify-center gap-6 sm:gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                  {stat.number}
                  <span className="text-sm sm:text-lg md:text-xl text-[#2AC1BC]">{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Review Card */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-[#292929] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-[#3A3A3A]">
              {/* Quote Icon */}
              <Quote className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 text-[#2AC1BC]/20" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < currentReview.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Verified Badge */}
                    {currentReview.verified && (
                      <span className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-[#2AC1BC]/20 rounded-full text-[10px] sm:text-xs font-bold text-[#2AC1BC]">
                        <ThumbsUp className="w-3 h-3" />
                        실제 시공 고객
                      </span>
                    )}

                    {/* Highlight Badge */}
                    <span className="px-2 sm:px-3 py-1 bg-[#FF6F0F] rounded-full text-[10px] sm:text-xs font-bold text-white">
                      {currentReview.highlight}
                    </span>
                  </div>

                  {/* Content */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
                    "{currentReview.content}"
                  </p>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-[#3A3A3A]">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2AC1BC] flex items-center justify-center text-white font-bold text-base sm:text-lg">
                        {currentReview.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm sm:text-base">{currentReview.name} 님</p>
                        <div className="flex items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {currentReview.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {currentReview.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="flex justify-center gap-3 mt-6 sm:mt-8">
                <button
                  onClick={prevReview}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#3A3A3A] flex items-center justify-center hover:bg-[#4A4A4A] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
                <div className="flex items-center gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-[#2AC1BC]' : 'bg-[#3A3A3A]'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextReview}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#3A3A3A] flex items-center justify-center hover:bg-[#4A4A4A] transition-colors"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-8 sm:mt-12">
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#2AC1BC] text-white rounded-xl font-bold text-sm sm:text-lg hover:bg-[#25b0ab] transition-colors w-full sm:w-auto max-w-md mx-auto"
          >
            5,000번째 만족 고객 되기
            <span className="text-white/80">→</span>
          </a>
          <p className="text-xs sm:text-sm text-gray-500 mt-3">
            * 실제 시공 고객님들의 후기이며, 개인정보 보호를 위해 성함을 일부 가렸습니다.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
