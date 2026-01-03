"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, FileText, ChevronRight, Factory, Sparkles } from "lucide-react";

const quickLinks = [
  { label: "회사소개", href: "/about" },
  { label: "제품소개", href: "/products" },
  { label: "시공사례", href: "/portfolio" },
  { label: "견적문의", href: "/inquiry" },
  { label: "오시는 길", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-void text-cream overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 -right-40 w-80 h-80 bg-electric/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 -left-40 w-80 h-80 bg-neon/10 rounded-full blur-[100px]" />

      {/* 상단 CTA 섹션 */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="font-serif text-3xl font-bold mb-3">
                지금 바로 <span className="gradient-text-static">무료 견적</span>을 받아보세요
              </h3>
              <p className="text-smoke">
                공장 직영가로 최대 30% 절감된 견적을 제공해드립니다
              </p>
            </div>
            <div className="flex gap-4">
              <motion.a
                href="tel:1668-1453"
                className="flex items-center gap-2 glass px-6 py-3 rounded-full font-medium hover:border-electric/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4 text-electric" />
                <span>1668-1453</span>
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/inquiry"
                  className="btn-glow flex items-center gap-2 px-6 py-3 rounded-full font-bold"
                >
                  <Sparkles className="w-4 h-4" />
                  견적 문의
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 메인 푸터 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 회사 정보 */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 aurora-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">창</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold gradient-text-static">창호의민족</h3>
                <span className="text-xs text-smoke tracking-wider uppercase">
                  Premium Window
                </span>
              </div>
            </div>
            <p className="text-smoke text-sm leading-relaxed mb-6">
              10년의 제조 기술력을 바탕으로<br />
              3,500평 스마트 팩토리에서<br />
              직접 만들고, 직접 설치합니다.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://instagram.com/changhominjok"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 glass rounded-xl flex items-center justify-center hover:border-neon/50 hover:text-neon transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://blog.naver.com/changhominjok"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 glass rounded-xl flex items-center justify-center hover:border-cyber/50 hover:text-cyber transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <FileText className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-sm font-bold text-electric uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:1668-1453" className="flex items-center gap-3 group">
                  <span className="w-10 h-10 bg-electric/10 rounded-xl flex items-center justify-center group-hover:bg-electric/20 group-hover:glow-purple transition-all">
                    <Phone className="w-4 h-4 text-electric" />
                  </span>
                  <div>
                    <span className="text-xs text-smoke block">대표전화</span>
                    <span className="font-bold text-cream">1668-1453</span>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-10 h-10 glass rounded-xl flex items-center justify-center">
                  <Clock className="w-4 h-4 text-smoke" />
                </span>
                <div>
                  <span className="text-xs text-smoke block">영업시간</span>
                  <span className="text-sm text-silver">평일 09:00-18:00 / 토 09:00-13:00</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 glass rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-smoke" />
                </span>
                <div>
                  <span className="text-xs text-smoke block">주소</span>
                  <span className="text-sm text-silver">경기도 화성시 팔탄면 창호로 123</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 바로가기 */}
          <div>
            <h4 className="text-sm font-bold text-neon uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-smoke hover:text-cream hover:translate-x-1 transition-all group"
                  >
                    <ChevronRight className="w-3 h-3 text-neon opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 법적 & 인증 */}
          <div>
            <h4 className="text-sm font-bold text-cyber uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-smoke mb-8">
              <li>
                <Link href="/privacy" className="hover:text-cream transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cream transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>

            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Factory className="w-5 h-5 text-cyber" />
                <span className="text-xs font-bold text-cyber">제조사 정보</span>
              </div>
              <p className="text-xs text-smoke leading-relaxed">
                (주)현경시스템<br />
                대표: 홍길동<br />
                사업자등록번호: 123-45-67890
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 저작권 */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-smoke">
            <p>
              &copy; 2024 창호의민족. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-electric rounded-full animate-pulse glow-purple" />
              <span>공장의 기술력에 영업의 진심을 담았습니다</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
