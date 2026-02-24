'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Award, FileCheck, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';

const partners = [
  { name: 'KCC', logo: '/images/partners/kcc-window.png' },
  { name: 'KCC글라스', logo: '/images/partners/kcc-glass.png' },
  { name: '휴그린', logo: '/images/partners/hugreen.jpg' },
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
    description: '제품 하자 10년 이상 무상 보증',
  },
  {
    icon: Award,
    title: '공식 파트너',
    description: 'KCC·KCC글라스·휴그린 인증',
  },
  {
    icon: Building2,
    title: '법인 사업자',
    description: '(주)현경시스템 운영',
  },
];

const timeline = [
  { year: '2026', event: '벤처기업인증' },
  { year: '2025', event: '프리미엄 브랜드 \'창호의민족\' 출시' },
  { year: '2024', event: '3500평 스마트 팩토리 구축' },
  { year: '2023', event: '㈜금호석유화학 휴그린 대리점 체결' },
  { year: '2021', event: 'KCC글라스 (Homecc) 가공완성창 공식 협력업체 체결' },
  { year: '2020', event: '법인 전환 ㈜현경시스템 출범' },
  { year: '2019', event: '㈜KCC 대리점 협약 체결' },
  { year: '2017', event: '창호&유리 통합형 복층유리 생산 시스템 구축' },
  { year: '2015', event: '현경창호 설립 PNS 대리점 시작' },
];

export default function LandingTrust() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-2 bg-[#FFF3EB] text-[#FF6F0F] rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            Trust & Credibility
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4 sm:mb-6 tracking-tight">
            <span className="text-[#FF6F0F]">신뢰</span>할 수 있는 이유
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
              <div className="space-y-3 sm:space-y-4">
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
                    <div className="pb-2 sm:pb-3">
                      <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-[#FFF3EB] text-[#FF6F0F] text-xs sm:text-sm font-bold rounded-full mb-1.5 sm:mb-2">
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

        {/* Staff Verify Banner */}
        <AnimatedSection delay={0.4} className="mt-10 sm:mt-16">
          <Link
            href="/support/verify"
            className="block bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-[#2AC1BC]/20 hover:border-[#2AC1BC]/50 transition-colors group"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#E8F8F7] rounded-2xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#2AC1BC]" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1E1E] mb-1">
                  담당 어드바이저가 진짜 본사 소속인지 확인하세요
                </h3>
                <p className="text-xs sm:text-sm text-[#767676]">
                  이름 또는 전화번호만 입력하면 본사 정식 소속 여부를 바로 조회할 수 있습니다.
                </p>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-[#2AC1BC] rounded-xl text-white font-bold text-sm group-hover:bg-[#24ADA8] transition-colors flex-shrink-0">
                조회하기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
