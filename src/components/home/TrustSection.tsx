'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Award, Building2, FileCheck, Rocket } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const certImages = [
  { src: '/images/trust/construction-license.jpg', alt: '건설업등록증', title: '건설업등록증', sub: '(주)현경시스템' },
  { src: '/images/trust/starplus-certificate.jpg', alt: 'KCC Star Plus 인증서', title: 'KCC Star Plus', sub: 'e-MAX Club Prime Distributor' },
  { src: '/images/trust/ks-certificate.jpg', alt: 'KS 제품인증서', title: 'KS 제품인증서', sub: '한국산업표준 인증' },
  { src: '/images/trust/emaster-certificate.jpg', alt: 'e-MASTER Club 인증서', title: 'e-MASTER 인증서', sub: '이마스터클럽 회원사' },
  { src: '/images/trust/business-registration.jpg', alt: '사업자등록증', title: '사업자등록증', sub: '(주)현경시스템' },
  { src: '/images/trust/changho-business-registration.jpg', alt: '창호의민족 사업자등록증', title: '사업자등록증', sub: '창호의 민족 (221-31-52133)' },
];

const certifications = [
  {
    icon: Building2,
    title: '건설업 등록',
    description: '정식 건설업 등록 업체',
    detail: '청도-25-다-7',
  },
  {
    icon: Award,
    title: 'KCC e-MAX Club',
    description: 'KCC 공식 Prime Distributor',
    detail: '유통 이맥스클럽 회원사',
  },
  {
    icon: Shield,
    title: 'KS 인증',
    description: '한국산업표준 인증 제품',
    detail: '품질 보증',
  },
  {
    icon: FileCheck,
    title: '10년 이상 품질 보증',
    description: '하자 발생 시 무상 A/S',
    detail: '제조사 직접 책임',
  },
  {
    icon: Rocket,
    title: '벤처기업 인증',
    description: '기술 혁신형 벤처기업',
    detail: '중소벤처기업부 인증',
  },
  {
    icon: Award,
    title: 'KCC Star Plus',
    description: 'KCC 공식 Star Plus 인증',
    detail: 'e-MAX Club Prime Distributor',
  },
];

export default function TrustSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % certImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const current = certImages[currentIndex];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-bold mb-6">
            Trust & Certification
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4">
            믿을 수 있는 <span className="text-red-600">공인된 업체</span>
          </h2>
          <p className="text-[#767676] text-lg max-w-2xl mx-auto">
            (주)현경시스템은 정식 건설업 등록 업체이며,
            KCC 공식 파트너로서 품질을 보증합니다.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Certification Image Carousel */}
          <AnimatedSection>
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.src}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <p className="text-white font-bold text-sm md:text-lg">{current.title}</p>
                    <p className="text-white/80 text-xs md:text-sm">{current.sub}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {certImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </AnimatedSection>

          {/* Certification List */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-3 md:space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert.title}
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl md:rounded-2xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <cert.icon className="w-6 h-6 md:w-7 md:h-7 text-gray-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#1E1E1E] text-base md:text-lg mb-0.5 md:mb-1">{cert.title}</h3>
                    <p className="text-[#767676] text-sm md:text-base">{cert.description}</p>
                    <p className="text-xs md:text-sm text-[#767676] font-medium mt-1">{cert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
