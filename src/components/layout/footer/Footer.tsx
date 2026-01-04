import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight, Instagram, Youtube } from 'lucide-react';
import { FOOTER_LINKS, COMPANY_INFO } from '@/lib/constants/navigation';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      {/* CTA Section */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                창호 교체, 지금 시작하세요
              </h2>
              <p className="text-gray-400 text-lg">
                30초 만에 예상 견적을 확인할 수 있습니다.
              </p>
            </div>
            <Link
              href="/estimate"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white font-semibold text-lg hover:shadow-xl hover:shadow-blue-600/25 transition-all duration-300"
            >
              무료 견적 시뮬레이션
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xl">
                창
              </div>
              <div>
                <span className="text-2xl font-bold text-white">창호의</span>
                <span className="text-2xl font-bold text-blue-400">민족</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed">
              10년의 제조 노하우와 3,500평 스마트 팩토리 기술력으로
              고품질 창호를 합리적인 가격에 제공합니다.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">전화 상담</p>
                  <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                    {COMPANY_INFO.phone}
                  </p>
                </div>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">이메일</p>
                  <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                    {COMPANY_INFO.email}
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">주소</p>
                  <p className="text-gray-300 text-sm">{COMPANY_INFO.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              회사소개
            </h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              제품안내
            </h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              고객지원
            </h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              소셜 미디어
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-500 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
              <span>{COMPANY_INFO.companyName}</span>
              <span className="hidden sm:inline">|</span>
              <span>대표: {COMPANY_INFO.ceo}</span>
              <span className="hidden sm:inline">|</span>
              <span>사업자등록번호: {COMPANY_INFO.businessNumber}</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                이용약관
              </Link>
            </div>
          </div>
          <div className="text-center lg:text-left text-xs text-gray-600 mt-6">
            &copy; {new Date().getFullYear()} 창호의 민족. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
