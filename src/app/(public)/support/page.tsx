import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Calendar, HelpCircle, Bell, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { COMPANY_INFO } from '@/lib/constants/navigation';

export const metadata: Metadata = {
  title: '고객센터',
  description: '창호의 민족 고객센터입니다. 상담 신청, 공장 견학 예약, FAQ 등 다양한 서비스를 제공합니다.',
};

const supportLinks = [
  {
    href: '/support/inquiry',
    icon: MessageCircle,
    title: '상담 신청',
    description: '창호 교체에 대한 모든 궁금증을 해결해드립니다.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    href: '/support/tour',
    icon: Calendar,
    title: '공장 견학 예약',
    description: '3,500평 스마트 팩토리를 직접 방문해보세요.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    href: '/support/faq',
    icon: HelpCircle,
    title: 'FAQ',
    description: '자주 묻는 질문에 대한 답변을 확인하세요.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    href: '/support/notice',
    icon: Bell,
    title: '공지사항',
    description: '창호의 민족의 새로운 소식을 확인하세요.',
    color: 'bg-purple-100 text-purple-600',
  },
];

export default function SupportPage() {
  return (
    <div className="pt-20 sm:pt-32 pb-12 sm:pb-20">
      {/* Hero Section */}
      <section className="bg-gray-50 py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="text-blue-600 font-medium text-xs sm:text-sm tracking-wider uppercase">
              Customer Support
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 sm:mt-3 mb-4 sm:mb-6">
              고객센터
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">
              창호의 민족은 언제나 고객님과 함께합니다.
              <br />
              궁금한 점이 있으시면 언제든 문의해주세요.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-8 sm:py-10 md:py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
            <AnimatedSection className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">전화 상담</p>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-blue-600"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </AnimatedSection>

            <div className="hidden md:block w-px h-12 bg-gray-200" />

            <AnimatedSection delay={0.1} className="text-center md:text-left">
              <p className="text-xs sm:text-sm text-gray-500">운영시간</p>
              <p className="text-sm sm:text-base font-medium text-gray-900">평일 09:00 - 18:00</p>
              <p className="text-xs sm:text-sm text-gray-500">점심시간 12:00 - 13:00</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Support Links */}
      <section className="py-10 sm:py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {supportLinks.map((link, index) => (
              <AnimatedSection key={link.href} delay={index * 0.1}>
                <Link href={link.href}>
                  <Card className="p-4 sm:p-5 md:p-6 h-full hover:shadow-lg transition-shadow">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${link.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4`}>
                      <link.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {link.description}
                    </p>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                찾아오시는 길
              </h2>
              <p className="text-sm sm:text-base text-gray-600">{COMPANY_INFO.address}</p>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-gray-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <span className="text-gray-400 text-sm">지도 영역</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="text-center">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">자가용 이용시</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  네비게이션에 &ldquo;창호의 민족&rdquo; 또는 주소 검색
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">대중교통 이용시</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  OO역 하차 후 버스 이용
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">주차 안내</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  공장 내 무료 주차 가능
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
