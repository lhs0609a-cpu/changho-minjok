"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

const navItems = [
  { label: "회사소개", href: "/about" },
  { label: "제품소개", href: "/products" },
  { label: "시공사례", href: "/portfolio" },
  { label: "고객후기", href: "/reviews" },
  { label: "견적문의", href: "/inquiry" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-bold text-ink">
              창호의민족
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ink hover:text-gold transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 우측 버튼 그룹 */}
          <div className="flex items-center gap-3">
            {/* 대표번호 */}
            <a
              href="tel:1668-1453"
              className="hidden sm:flex items-center gap-2 text-seal font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>1668-1453</span>
            </a>

            {/* 카카오톡 상담 */}
            <a
              href="https://pf.kakao.com/_창호의민족"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#FEE500] text-[#391B1B] px-4 py-2 rounded-full font-medium hover:bg-[#FDD835] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>카카오 상담</span>
            </a>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-ink"
              aria-label="메뉴"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-ink hover:text-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <a
                href="tel:1668-1453"
                className="flex items-center gap-2 text-seal font-bold"
              >
                <Phone className="w-4 h-4" />
                <span>1668-1453</span>
              </a>
              <a
                href="https://pf.kakao.com/_창호의민족"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#391B1B] px-4 py-3 rounded-lg font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>카카오톡 상담하기</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
