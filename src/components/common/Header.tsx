"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ChevronRight } from "lucide-react";

const navItems = [
  { label: "회사소개", href: "/about" },
  { label: "제품소개", href: "/products" },
  { label: "시공사례", href: "/portfolio" },
  { label: "고객후기", href: "/reviews" },
  { label: "견적문의", href: "/inquiry" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <span className="text-dark font-bold text-lg">창</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-ink leading-tight">
                창호의민족
              </span>
              <span className="text-[10px] text-muted tracking-wider uppercase hidden sm:block">
                Premium Window
              </span>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="animated-underline relative px-5 py-2 text-ink font-medium hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 우측 버튼 그룹 */}
          <div className="flex items-center gap-4">
            {/* 대표번호 */}
            <a
              href="tel:1668-1453"
              className="hidden md:flex items-center gap-2 text-ink hover:text-gold transition-colors group"
            >
              <span className="w-9 h-9 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Phone className="w-4 h-4 text-gold" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-muted">대표전화</span>
                <span className="font-bold text-sm">1668-1453</span>
              </div>
            </a>

            {/* 구분선 */}
            <div className="hidden md:block w-px h-8 bg-ink/10" />

            {/* 카카오톡 상담 */}
            <a
              href="https://pf.kakao.com/_창호의민족"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#FEE500] text-[#391B1B] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#FFD43B] hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>카카오 상담</span>
            </a>

            {/* 무료 견적 버튼 */}
            <Link
              href="/inquiry"
              className="hidden lg:flex btn-premium items-center gap-2 bg-gradient-to-r from-gold to-gold-light text-dark px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              무료 견적
              <ChevronRight className="w-4 h-4" />
            </Link>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
              aria-label="메뉴"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
          >
            <div className="glass-dark mx-4 mb-4 rounded-2xl overflow-hidden">
              <nav className="p-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-3 px-4 text-white font-medium hover:bg-white/10 rounded-xl transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                      <ChevronRight className="w-4 h-4 text-gold" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 pt-2 border-t border-white/10 space-y-3">
                <a
                  href="tel:1668-1453"
                  className="flex items-center gap-3 py-3 px-4 bg-white/5 rounded-xl"
                >
                  <span className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gold" />
                  </span>
                  <div>
                    <span className="text-xs text-slate block">대표전화</span>
                    <span className="font-bold text-white">1668-1453</span>
                  </div>
                </a>

                <a
                  href="https://pf.kakao.com/_창호의민족"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#391B1B] py-3.5 rounded-xl font-bold"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>카카오톡 상담하기</span>
                </a>

                <Link
                  href="/inquiry"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-light text-dark py-3.5 rounded-xl font-bold"
                >
                  무료 견적 받기
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
