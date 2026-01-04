import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FOOTER_LINKS, COMPANY_INFO } from '@/lib/constants/navigation';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              창호의<span className="text-blue-500">민족</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              10년의 제조 노하우와 스마트 팩토리 기술력으로
              <br />
              고품질 창호를 합리적인 가격에 제공합니다.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">회사소개</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">제품안내</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">고객지원</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
              <span>{COMPANY_INFO.companyName}</span>
              <span>대표: {COMPANY_INFO.ceo}</span>
              <span>사업자등록번호: {COMPANY_INFO.businessNumber}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-white">
                이용약관
              </Link>
            </div>
          </div>
          <div className="text-center md:text-left text-xs text-gray-600 mt-4">
            &copy; {new Date().getFullYear()} 창호의 민족. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
