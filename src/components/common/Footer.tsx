import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Instagram, FileText, ChevronRight, Factory } from "lucide-react";

const quickLinks = [
  { label: "회사소개", href: "/about" },
  { label: "제품소개", href: "/products" },
  { label: "시공사례", href: "/portfolio" },
  { label: "견적문의", href: "/inquiry" },
  { label: "오시는 길", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* 상단 CTA 섹션 */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold mb-2">
                지금 바로 <span className="text-accent">무료 견적</span>을 받아보세요
              </h3>
              <p className="text-slate">
                공장 직영가로 최대 30% 절감된 견적을 제공해드립니다
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="tel:1668-1453"
                className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary-light" />
                <span>1668-1453</span>
              </a>
              <Link
                href="/inquiry"
                className="flex items-center gap-2 btn-accent px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
              >
                견적 문의
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 푸터 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 회사 정보 */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">창</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">창호의민족</h3>
                <span className="text-[10px] text-slate tracking-wider uppercase">
                  Premium Window
                </span>
              </div>
            </div>
            <p className="text-slate text-sm leading-relaxed mb-6">
              10년의 제조 기술력을 바탕으로<br />
              3,500평 스마트 팩토리에서<br />
              직접 만들고, 직접 설치합니다.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/changhominjok"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary/20 hover:text-primary-light transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://blog.naver.com/changhominjok"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary/20 hover:text-primary-light transition-colors"
              >
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-sm font-bold text-primary-light uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:1668-1453" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary-light" />
                  </span>
                  <div>
                    <span className="text-xs text-slate block">대표전화</span>
                    <span className="font-bold">1668-1453</span>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-slate" />
                </span>
                <div>
                  <span className="text-xs text-slate block">영업시간</span>
                  <span className="text-sm">평일 09:00-18:00 / 토 09:00-13:00</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-slate" />
                </span>
                <div>
                  <span className="text-xs text-slate block">주소</span>
                  <span className="text-sm">경기도 화성시 팔탄면 창호로 123</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 바로가기 */}
          <div>
            <h4 className="text-sm font-bold text-primary-light uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-slate hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-primary-light opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 법적 & 인증 */}
          <div>
            <h4 className="text-sm font-bold text-primary-light uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-slate mb-8">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>

            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Factory className="w-5 h-5 text-primary-light" />
                <span className="text-xs font-bold text-primary-light">제조사 정보</span>
              </div>
              <p className="text-xs text-slate leading-relaxed">
                (주)현경시스템<br />
                대표: 홍길동<br />
                사업자등록번호: 123-45-67890
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 저작권 */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate">
            <p>
              &copy; 2024 창호의민족. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
              <span>공장의 기술력에 영업의 진심을 담았습니다</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
