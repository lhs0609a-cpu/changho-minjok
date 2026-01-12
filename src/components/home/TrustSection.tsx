'use client';

import Image from 'next/image';
import { Shield, Award, Building2, FileCheck } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

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
    title: '10년 품질 보증',
    description: '하자 발생 시 무상 A/S',
    detail: '제조사 직접 책임',
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#2AC1BC]/10 text-[#2AC1BC] rounded-full text-sm font-bold mb-6">
            Trust & Certification
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4">
            믿을 수 있는 <span className="text-[#2AC1BC]">공인된 업체</span>
          </h2>
          <p className="text-[#767676] text-lg max-w-2xl mx-auto">
            (주)현경시스템은 정식 건설업 등록 업체이며,
            KCC 공식 파트너로서 품질을 보증합니다.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Certification Images */}
          <AnimatedSection>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src="/images/trust/construction-license.jpg"
                  alt="건설업등록증"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">건설업등록증</p>
                  <p className="text-white/80 text-xs">(주)현경시스템</p>
                </div>
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src="/images/trust/kcc-certificate.jpg"
                  alt="KCC e-MAX Club 회원사 명패"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">KCC 공식 파트너</p>
                  <p className="text-white/80 text-xs">e-MAX Club 회원사</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Certification List */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert.title}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-gray-100 hover:border-[#2AC1BC]/30 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#2AC1BC]/10 flex items-center justify-center flex-shrink-0">
                    <cert.icon className="w-7 h-7 text-[#2AC1BC]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E1E1E] text-lg mb-1">{cert.title}</h3>
                    <p className="text-[#767676]">{cert.description}</p>
                    <p className="text-sm text-[#2AC1BC] font-medium mt-1">{cert.detail}</p>
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
