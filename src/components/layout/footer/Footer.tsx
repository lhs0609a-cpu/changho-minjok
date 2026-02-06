import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight, Instagram, Youtube } from 'lucide-react';
import { FOOTER_LINKS, COMPANY_INFO, COMPANY_INFO_SUB } from '@/lib/constants/navigation';

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E]">
      {/* CTA Section - 배민 스타일 */}
      <div className="bg-[#2AC1BC]">
        <div className="container mx-auto px-4 lg:px-8 py-8 sm:py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight">
                창호 교체, 지금 시작하세요
              </h2>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                30초 만에 예상 견적을 확인할 수 있습니다.
              </p>
            </div>
            <Link
              href="/estimate"
              className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#1E1E1E] rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base lg:text-lg hover:bg-[#292929] transition-colors w-full sm:w-auto justify-center"
            >
              무료 견적 시뮬레이션
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-10 sm:py-12 lg:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#2AC1BC] text-white flex items-center justify-center font-extrabold text-base sm:text-xl">
                창
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">창호의</span>
                <span className="text-lg sm:text-2xl font-extrabold text-[#2AC1BC] tracking-tight">민족</span>
              </div>
            </Link>
            <p className="text-[#767676] text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              10년의 제조 노하우와 3,500평 스마트 팩토리 기술력으로
              고품질 창호를 합리적인 가격에 제공합니다.
            </p>

            {/* Contact Info - 모바일에서 숨김 */}
            <div className="space-y-3 sm:space-y-4 hidden sm:block">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-3 sm:gap-4 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center group-hover:bg-[#2AC1BC] transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[#767676] font-medium">전화 상담</p>
                  <p className="text-sm sm:text-base text-white font-bold group-hover:text-[#2AC1BC] transition-colors">
                    {COMPANY_INFO.phone}
                  </p>
                </div>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 sm:gap-4 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center group-hover:bg-[#2AC1BC] transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[#767676] font-medium">이메일</p>
                  <p className="text-sm sm:text-base text-white font-bold group-hover:text-[#2AC1BC] transition-colors">
                    {COMPANY_INFO.email}
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[#767676] font-medium">주소</p>
                  <p className="text-[#C4C4C4] text-xs sm:text-sm">{COMPANY_INFO.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-6">
              회사소개
            </h3>
            <ul className="space-y-2 sm:space-y-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-[#767676] hover:text-[#2AC1BC] transition-colors font-medium"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-6">
              제품안내
            </h3>
            <ul className="space-y-2 sm:space-y-4">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-[#767676] hover:text-[#2AC1BC] transition-colors font-medium"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-6">
              고객지원
            </h3>
            <ul className="space-y-2 sm:space-y-4">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-[#767676] hover:text-[#2AC1BC] transition-colors font-medium"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-6">
              소셜 미디어
            </h3>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center text-[#767676] hover:bg-[#2AC1BC] hover:text-white transition-all"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center text-[#767676] hover:bg-[#2AC1BC] hover:text-white transition-all"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#292929]">
        <div className="container mx-auto px-4 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2 text-[10px] sm:text-sm text-[#767676]">
              <span>{COMPANY_INFO.companyName}</span>
              <span className="text-[#4A4A4A]">|</span>
              <span>대표: {COMPANY_INFO.ceo}</span>
              <span className="text-[#4A4A4A]">|</span>
              <span>사업자등록번호: {COMPANY_INFO.businessNumber}</span>
              <span className="text-[#4A4A4A]">/</span>
              <span>{COMPANY_INFO_SUB.name}</span>
              <span className="text-[#4A4A4A]">|</span>
              <span>대표: {COMPANY_INFO_SUB.ceo}</span>
              <span className="text-[#4A4A4A]">|</span>
              <span>사업자등록번호: {COMPANY_INFO_SUB.businessNumber}</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-sm">
              <Link href="/privacy" className="text-[#767676] hover:text-[#2AC1BC] transition-colors font-medium">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-[#767676] hover:text-[#2AC1BC] transition-colors font-medium">
                이용약관
              </Link>
              <Link href="/admin" className="text-[#4A4A4A] hover:text-[#767676] transition-colors font-medium">
                관리자
              </Link>
            </div>
          </div>
          <div className="text-center lg:text-left text-[10px] sm:text-xs text-[#4A4A4A] mt-4 sm:mt-6">
            &copy; {new Date().getFullYear()} 창호의 민족. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
