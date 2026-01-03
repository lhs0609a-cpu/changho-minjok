"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Wallet, Shield, Clock } from "lucide-react";

const stats = [
  { value: "3,500+", label: "누적 시공 건수" },
  { value: "4.9", label: "고객 만족도" },
  { value: "2시간", label: "평균 시공 시간" },
];

const values = [
  {
    icon: Factory,
    title: "공장 직영",
    description: "자체 공장 운영으로 중간 마진 제로",
  },
  {
    icon: Wallet,
    title: "최저가 보장",
    description: "동일 품질 대비 20~30% 저렴",
  },
  {
    icon: Shield,
    title: "10년 보증",
    description: "업계 최장 무상 품질 보증",
  },
  {
    icon: Clock,
    title: "48시간 A/S",
    description: "접수 후 신속한 방문 처리",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-hanji overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/images/hanji-texture.png')",
          backgroundRepeat: "repeat",
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 왼쪽: 텍스트 콘텐츠 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 슬로건 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gold font-medium mb-4"
            >
              프리미엄 창호 전문 기업
            </motion.p>

            {/* 메인 카피 */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight mb-6">
              대한민국<br />
              <span className="text-seal">창호 끝판왕</span>
            </h1>

            {/* 서브 카피 */}
            <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
              공장 직영, 중간 마진 없는 최저가!<br />
              연매출 80억 자체 공장 보유 / 10년 무상 품질보증
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-2 bg-seal text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-seal/90 transition-colors"
              >
                무료 견적 받기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-lg font-bold text-lg border-2 border-ink hover:bg-ink hover:text-white transition-colors"
              >
                셀프 견적 해보기
              </Link>
            </div>

            {/* 통계 */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-ink/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-gold">{stat.value}</p>
                  <p className="text-sm text-muted mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 오른쪽: 이미지 (추후 추가) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative aspect-square lg:aspect-[4/5] bg-gradient-to-br from-ivory to-hanji rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted">
              {/* 창호 이미지 placeholder */}
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 bg-gold/20 rounded-full flex items-center justify-center">
                  <Factory className="w-16 h-16 text-gold" />
                </div>
                <p className="text-lg font-medium">프리미엄 창호 이미지</p>
                <p className="text-sm mt-2">시스템창호 / 하이샤시 / PVC</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 핵심 가치 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-20"
        >
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-ink text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
