import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { FOOTER_LINKS, COMPANY_INFO, COMPANY_INFO_SUB } from '@/lib/constants/navigation';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E]">
      {/* CTA Section - 배민 스타일 */}
      <div className="bg-[#EF4444]">
        <div className="container mx-auto px-4 lg:px-8 py-8 sm:py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight">
                창호 교체, 지금 시작하세요
              </h2>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                전문 상담원이 친절하게 안내해드립니다.
              </p>
            </div>
            <Link
              href="/estimate"
              className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#1E1E1E] rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base lg:text-lg hover:bg-[#292929] transition-colors w-full sm:w-auto justify-center"
            >
              무료 상담 신청
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
              10년 이상의 제조 노하우와 3,500평 스마트 팩토리 기술력으로
              고품질 창호를 합리적인 가격에 제공합니다.
            </p>

            {/* Contact Info - 모바일에서 숨김 */}
            <div className="space-y-3 sm:space-y-4 hidden sm:block">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-3 sm:gap-4 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center group-hover:bg-[#FF6F0F] transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6F0F] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[#767676] font-medium">전화 상담</p>
                  <p className="text-sm sm:text-base text-white font-bold group-hover:text-[#FF6F0F] transition-colors">
                    {COMPANY_INFO.phone}
                  </p>
                </div>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 sm:gap-4 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center group-hover:bg-[#FF6F0F] transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6F0F] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[#767676] font-medium">이메일</p>
                  <p className="text-sm sm:text-base text-white font-bold group-hover:text-[#FF6F0F] transition-colors">
                    {COMPANY_INFO.email}
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6F0F]" />
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
                    className="text-xs sm:text-sm text-[#767676] hover:text-[#FF6F0F] transition-colors font-medium"
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
                    className="text-xs sm:text-sm text-[#767676] hover:text-[#FF6F0F] transition-colors font-medium"
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
                    className="text-xs sm:text-sm text-[#767676] hover:text-[#FF6F0F] transition-colors font-medium"
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
                href="https://www.instagram.com/changhopeople?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center text-[#767676] hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all"
              >
                <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              {/* TODO: 유튜브 채널 주소 받으면 href 교체 */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#292929] flex items-center justify-center text-[#767676] hover:bg-[#FF0000] hover:text-white transition-all"
              >
                <YoutubeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
              <Link href="/privacy" className="text-[#767676] hover:text-[#FF6F0F] transition-colors font-medium">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-[#767676] hover:text-[#FF6F0F] transition-colors font-medium">
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
