import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight, Clock, Shield, Factory } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { COMPANY_INFO } from '@/lib/constants/navigation';

export const metadata: Metadata = {
  title: '상담 신청',
  description: '창호 교체 무료 상담을 신청하세요. 전화 상담 또는 카카오톡으로 편리하게 문의할 수 있습니다.',
};

const benefits = [
  {
    icon: Clock,
    title: '빠른 상담',
    description: '전화 한 통이면 전문 상담원이 즉시 안내해드립니다.',
  },
  {
    icon: Shield,
    title: '무료 방문 견적',
    description: '현장 방문 실측 후 정확한 견적을 무료로 제공합니다.',
  },
  {
    icon: Factory,
    title: '공장 직영 가격',
    description: '중간 유통 없이 공장 직거래로 합리적인 가격을 보장합니다.',
  },
];

export default function EstimatePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-badge">Consultation</span>
            <h1 className="page-hero-title">무료 상담 신청</h1>
            <p className="page-hero-subtitle">
              창호 교체, 어디서부터 시작해야 할지 모르겠다면?
              <br />
              전문 상담원이 친절하게 안내해드립니다.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* 전화 상담 */}
              <AnimatedSection>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="block group h-full"
                >
                  <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-gray-100 hover:border-[#FF6F0F] transition-all h-full text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#FFF3EB] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FF6F0F] transition-colors">
                      <Phone className="w-10 h-10 text-[#FF6F0F] group-hover:text-white transition-colors" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#1E1E1E] mb-2">전화 상담</h2>
                    <p className="text-[#767676] mb-6">평일 09:00 ~ 18:00 (토요일 상담 가능)</p>
                    <div className="text-3xl md:text-4xl font-extrabold text-[#FF6F0F] mb-4">
                      {COMPANY_INFO.phone}
                    </div>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6F0F] text-white rounded-xl font-bold group-hover:bg-[#E5630D] transition-colors">
                      지금 전화하기
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </AnimatedSection>

              {/* 카카오톡 상담 */}
              <AnimatedSection delay={0.1}>
                <a
                  href={COMPANY_INFO.kakaoChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-gray-100 hover:border-[#FEE500] transition-all h-full text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#FEE500]/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FEE500] transition-colors">
                      <MessageCircle className="w-10 h-10 text-[#3C1E1E] group-hover:text-[#3C1E1E] transition-colors" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#1E1E1E] mb-2">카카오톡 상담</h2>
                    <p className="text-[#767676] mb-6">24시간 접수 가능 (영업시간 내 답변)</p>
                    <div className="text-xl font-bold text-[#1E1E1E] mb-4">
                      사진으로 간편 상담
                    </div>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-xl font-bold group-hover:bg-[#F5DC00] transition-colors">
                      카카오톡 상담하기
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            </div>

            {/* Benefits */}
            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-3 gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-[#FF6F0F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E1E1E] mb-1">{benefit.title}</h3>
                      <p className="text-sm text-[#767676]">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* 문의 폼 안내 */}
            <AnimatedSection delay={0.3} className="mt-12">
              <div className="bg-[#F8F9FA] rounded-3xl p-8 md:p-10 text-center">
                <h3 className="text-xl md:text-2xl font-extrabold text-[#1E1E1E] mb-3">
                  온라인으로 문의하고 싶다면?
                </h3>
                <p className="text-[#767676] mb-6">
                  상담 신청 폼을 통해 편리하게 문의하세요.
                  <br />
                  전문 상담원이 빠르게 연락드리겠습니다.
                </p>
                <Link
                  href="/support/inquiry"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E1E1E] text-white rounded-xl font-bold hover:bg-[#292929] transition-colors"
                >
                  온라인 상담 신청
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
