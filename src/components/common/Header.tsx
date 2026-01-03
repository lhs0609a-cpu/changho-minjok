"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ChevronRight, Sparkles } from "lucide-react";

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
          ? "glass shadow-lg shadow-electric/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-11 h-11 aurora-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-white font-bold text-xl relative z-10">창</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-cream leading-tight gradient-text-static">
                창호의민족
              </span>
              <span className="text-[10px] text-smoke tracking-wider uppercase hidden sm:block">
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
                className="animated-underline relative px-5 py-2 text-silver font-medium hover:text-cream transition-colors"
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
              className="hidden md:flex items-center gap-2 text-silver hover:text-cream transition-colors group"
            >
              <span className="w-9 h-9 bg-electric/20 rounded-full flex items-center justify-center group-hover:bg-electric/30 group-hover:glow-purple transition-all duration-300">
                <Phone className="w-4 h-4 text-electric" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-smoke">대표전화</span>
                <span className="font-bold text-sm text-cream">1668-1453</span>
              </div>
            </a>

            {/* 구분선 */}
            <div className="hidden md:block w-px h-8 bg-white/10" />

            {/* 카카오톡 상담 */}
            <motion.a
              href="https://pf.kakao.com/_창호의민족"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#FEE500] text-[#391B1B] px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:shadow-[#FEE500]/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>카카오 상담</span>
            </motion.a>

            {/* 무료 견적 버튼 - 네온 글로우 */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/inquiry"
                className="hidden lg:flex btn-glow items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm"
              >
                <Sparkles className="w-4 h-4" />
                무료 견적
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* 모바일 메뉴 버튼 */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-electric/20 text-electric hover:bg-electric/30 transition-colors"
              aria-label="메뉴"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
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
            <div className="glass mx-4 mb-4 rounded-2xl overflow-hidden border border-white/10">
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
                      className="flex items-center justify-between py-3 px-4 text-silver font-medium hover:text-cream hover:bg-electric/10 rounded-xl transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                      <ChevronRight className="w-4 h-4 text-electric" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 pt-2 border-t border-white/10 space-y-3">
                <a
                  href="tel:1668-1453"
                  className="flex items-center gap-3 py-3 px-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <span className="w-10 h-10 aurora-gradient rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <span className="text-xs text-smoke block">대표전화</span>
                    <span className="font-bold text-cream">1668-1453</span>
                  </div>
                </a>

                <a
                  href="https://pf.kakao.com/_창호의민족"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#391B1B] py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-[#FEE500]/30 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>카카오톡 상담하기</span>
                </a>

                <Link
                  href="/inquiry"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 btn-glow py-3.5 rounded-xl font-bold w-full"
                >
                  <Sparkles className="w-5 h-5" />
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
