'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Award, FileCheck, Building2 } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const partners = [
  { name: 'KCC글라스', logo: '/images/partners/kcc.png' },
  { name: '금호석유화학 휴그린', logo: '/images/partners/kumho.png' },
];

const certifications = [
  {
    icon: FileCheck,
    title: '전문건설업 면허',
    description: '금속창호·지붕판금건축물조립공사업',
  },
  {
    icon: Shield,
    title: '품질보증',
    description: '제품 하자 10년 무상 보증',
  },
  {
    icon: Award,
    title: '공식 파트너',
    description: 'KCC글라스·휴그린 인증',
  },
  {
    icon: Building2,
    title: '법인 사업자',
    description: '(주)현경시스템 운영',
  },
];

const timeline = [
  { year: '2025', event: '스마트 팩토리 구축 (TPS 간봉 자동화)' },
  { year: '2024', event: '영업 브랜드 \'창호의 민족\' 런칭' },
  { year: '2020', event: '주식회사 현경시스템 법인 전환' },
  { year: '2015', event: '현경시스템 설립 및 창호 제조 사업 개시' },
];

export default function LandingTrust() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-2 bg-[#E8F8F7] text-[#2AC1BC] rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            Trust & Credibility
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4 sm:mb-6 tracking-tight">
            <span className="text-[#2AC1BC]">신뢰</span>할 수 있는 이유
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          {/* Left - Partners & Certifications */}
          <div>
            {/* Partners */}
            <AnimatedSection className="mb-8 sm:mb-12">
              <h3 className="text-lg sm:text-xl font-bold text-[#1E1E1E] mb-4 sm:mb-6">공식 파트너사</h3>
              <div className="flex gap-3 sm:gap-6">
                {partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex-1 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-100 flex items-center justify-center"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={140}
                      height={60}
                      className="object-contain w-24 sm:w-32 md:w-[140px]"
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Certifications */}
            <AnimatedSection delay={0.2}>
              <h3 className="text-lg sm:text-xl font-bold text-[#1E1E1E] mb-4 sm:mb-6">인증 및 자격</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border-2 border-gray-100"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#E8F8F7] flex items-center justify-center mb-2 sm:mb-4">
                      <cert.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#2AC1BC]" />
                    </div>
                    <h4 className="font-bold text-[#1E1E1E] text-sm sm:text-base mb-0.5 sm:mb-1">{cert.title}</h4>
                    <p className="text-xs sm:text-sm text-[#767676]">{cert.description}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right - Timeline */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-gray-100 h-full">
              <h3 className="text-lg sm:text-xl font-bold text-[#1E1E1E] mb-5 sm:mb-8">걸어온 길</h3>
              <div className="space-y-5 sm:space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 sm:gap-6"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#2AC1BC]" />
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-1.5 sm:mt-2" />
                      )}
                    </div>
                    <div className="pb-4 sm:pb-8">
                      <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-[#E8F8F7] text-[#2AC1BC] text-xs sm:text-sm font-bold rounded-full mb-1.5 sm:mb-2">
                        {item.year}
                      </span>
                      <p className="text-[#1E1E1E] font-medium text-sm sm:text-base">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
