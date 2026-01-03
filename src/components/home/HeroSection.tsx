"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Wallet, Shield, Clock, Sparkles, Play } from "lucide-react";

const stats = [
  { value: "3,500", suffix: "+", label: "누적 시공" },
  { value: "11,570", suffix: "m²", label: "스마트 팩토리" },
  { value: "10", suffix: "년", label: "무상 보증" },
  { value: "48", suffix: "h", label: "신속 A/S" },
];

const values = [
  {
    icon: Factory,
    title: "제조 직영",
    description: "3,500평 스마트 팩토리에서 직접 생산",
    highlight: "중간 마진 0%",
  },
  {
    icon: Wallet,
    title: "공장 직거래",
    description: "유통 단계 최소화로 합리적 가격",
    highlight: "최대 30% 절감",
  },
  {
    icon: Shield,
    title: "품질 보증",
    description: "KCC, 금호석유화학 파트너십",
    highlight: "대기업 품질",
  },
  {
    icon: Clock,
    title: "원스톱 서비스",
    description: "제조-영업-시공 통합 시스템",
    highlight: "끝까지 책임",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 황금빛 글로우 */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-gold/5 rounded-full blur-2xl" />

        {/* 떠다니는 도형들 */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-1/4 w-20 h-20 border border-gold/20 rounded-2xl rotate-12"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-60 left-1/4 w-16 h-16 bg-gold/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-20 w-32 h-32 border border-gold/10 rounded-full"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-20">
        {/* 상단 태그 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span className="tag">
            <Sparkles className="w-3.5 h-3.5" />
            Since 2015 현경시스템
          </span>
        </motion.div>

        {/* 메인 헤드라인 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink leading-[1.1] mb-6">
            제조의 혁신이 곧<br />
            <span className="gradient-text">품질의 기준</span>입니다
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            10년의 뚝심으로 완성한 스마트 팩토리,<br className="hidden sm:block" />
            이제 <strong className="text-ink">창호의 민족</strong>이 고객님을 직접 만납니다.
          </motion.p>

          {/* CTA 버튼 그룹 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/inquiry"
              className="btn-premium inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold to-gold-light text-dark px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              무료 견적 상담받기
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#simulator"
              className="group inline-flex items-center justify-center gap-3 glass px-10 py-5 rounded-2xl font-bold text-lg text-ink hover:bg-white transition-all duration-300"
            >
              <span className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Play className="w-4 h-4 text-gold ml-0.5" />
              </span>
              셀프 견적 시뮬레이터
            </Link>
          </motion.div>
        </motion.div>

        {/* 통계 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="glass rounded-3xl p-6 md:p-8 text-center card-hover"
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="stat-number text-3xl md:text-4xl">{stat.value}</span>
                <span className="text-gold text-lg md:text-xl font-bold">{stat.suffix}</span>
              </div>
              <p className="text-sm text-muted font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 핵심 가치 섹션 */}
      <div className="relative bg-dark py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-label text-gold-light">Why Choose Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              창호의 민족을 선택해야 하는 이유
            </h2>
            <div className="divider mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass-dark rounded-3xl p-8 card-hover cursor-pointer"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <item.icon className="w-7 h-7 text-gold" />
                </div>

                <span className="inline-block px-3 py-1 text-xs font-bold text-gold bg-gold/10 rounded-full mb-4">
                  {item.highlight}
                </span>

                <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* 브랜드 메시지 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <blockquote className="font-serif text-xl md:text-2xl text-white/80 italic max-w-3xl mx-auto leading-relaxed">
              "화려한 광고보다 공장의 기계 소리를 믿습니다.<br />
              우리가 흘린 공장의 땀방울이 곧 제품의 내구성입니다."
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-gold/30" />
              <span className="text-gold text-sm font-medium tracking-wider">CHANGHO MINJOK</span>
              <div className="h-px w-12 bg-gold/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
