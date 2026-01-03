"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Factory, Wallet, Shield, Clock, Sparkles, Play, ChevronDown } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 3500, suffix: "+", label: "누적 시공", icon: "construction" },
  { value: 11570, suffix: "m²", label: "스마트 팩토리", icon: "factory" },
  { value: 10, suffix: "년", label: "무상 보증", icon: "shield" },
  { value: 48, suffix: "h", label: "신속 A/S", icon: "clock" },
];

const values = [
  {
    icon: Factory,
    title: "제조 직영",
    description: "3,500평 스마트 팩토리에서 직접 생산",
    highlight: "중간 마진 0%",
    glowColor: "electric",
  },
  {
    icon: Wallet,
    title: "공장 직거래",
    description: "유통 단계 최소화로 합리적 가격",
    highlight: "최대 30% 절감",
    glowColor: "neon",
  },
  {
    icon: Shield,
    title: "품질 보증",
    description: "KCC, 금호석유화학 파트너십",
    highlight: "대기업 품질",
    glowColor: "cyber",
  },
  {
    icon: Clock,
    title: "원스톱 서비스",
    description: "제조-영업-시공 통합 시스템",
    highlight: "끝까지 책임",
    glowColor: "gold",
  },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <span ref={ref} className="stat-number-glow text-4xl md:text-5xl">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* 애니메이션 메시 그라데이션 배경 */}
      <div className="absolute inset-0 hero-gradient" />

      {/* 그리드 패턴 오버레이 */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* 노이즈 텍스처 */}
      <div className="absolute inset-0 noise-overlay" />

      {/* 글로우 오브 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-electric/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-neon/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-cyber/10 rounded-full blur-[80px]"
        />
      </div>

      {/* 플로팅 3D 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], rotateZ: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] w-24 h-24 border-2 border-electric/30 rounded-2xl rotate-12 backdrop-blur-sm"
          style={{ background: "rgba(102, 126, 234, 0.05)" }}
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotateZ: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[10%] w-16 h-16 border border-neon/40 rounded-full"
          style={{ background: "rgba(240, 147, 251, 0.1)" }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-[5%] w-40 h-40 border border-white/5 rounded-full"
        />
        <motion.div
          animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-3 h-3 bg-cyber rounded-full glow-cyan"
        />
        <motion.div
          animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[30%] right-[20%] w-2 h-2 bg-neon rounded-full glow-pink"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <motion.div style={{ y, opacity }} className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-44 pb-20">
          {/* 상단 태그 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <span className="tag tag-neon animate-pulse-glow">
              <Sparkles className="w-3.5 h-3.5" />
              Since 2015 현경시스템
            </span>
          </motion.div>

          {/* 메인 헤드라인 - 글자별 애니메이션 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.05] mb-8 tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
                제조의 혁신이 곧
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="gradient-text block"
              >
                품질의 기준
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="block text-silver"
              >
                입니다
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-smoke max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              10년의 뚝심으로 완성한 스마트 팩토리,<br className="hidden sm:block" />
              이제 <strong className="text-cream">창호의 민족</strong>이 고객님을 직접 만납니다.
            </motion.p>

            {/* CTA 버튼 그룹 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            >
              <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/inquiry"
                  className="btn-glow inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  무료 견적 상담받기
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#simulator"
                  className="group inline-flex items-center justify-center gap-3 glass px-10 py-5 rounded-2xl font-bold text-lg text-cream hover:border-electric/50 transition-all duration-300"
                >
                  <span className="w-10 h-10 aurora-gradient rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </span>
                  셀프 견적 시뮬레이터
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 통계 카드 - 글로우 효과 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-3xl p-6 md:p-8 text-center card-glow"
              >
                <div className="mb-3">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-smoke font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-smoke"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </motion.div>

      {/* 핵심 가치 섹션 */}
      <div className="relative section-gradient py-32">
        {/* 상단 그라데이션 라인 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />

        {/* 배경 효과 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 w-[500px] h-[2px] bg-gradient-to-r from-transparent via-electric/30 to-transparent"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="section-label">Why Choose Us</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4 mb-6">
              창호의 민족을<br className="sm:hidden" /> 선택해야 하는 이유
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
                whileHover={{ y: -10, scale: 1.02 }}
                className="group glass-card rounded-3xl p-8 card-glow cursor-pointer relative overflow-hidden"
              >
                {/* 호버 시 글로우 배경 */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${item.glowColor}/10 to-transparent`} />

                <div className="relative">
                  <div className="w-16 h-16 aurora-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>

                  <span className="inline-block px-4 py-1.5 text-xs font-bold text-cyber bg-cyber/10 rounded-full mb-4 border border-cyber/30">
                    {item.highlight}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-cream mb-3 group-hover:text-electric transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-smoke text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 브랜드 메시지 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-24 text-center"
          >
            <blockquote className="font-serif text-2xl md:text-3xl text-silver/80 italic max-w-4xl mx-auto leading-relaxed">
              <span className="gradient-text-static">"</span>
              화려한 광고보다 공장의 기계 소리를 믿습니다.<br className="hidden md:block" />
              우리가 흘린 공장의 땀방울이 곧 제품의 내구성입니다.
              <span className="gradient-text-static">"</span>
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-electric/50" />
              <span className="text-electric text-sm font-bold tracking-[0.3em] uppercase">Changho Minjok</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-electric/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
