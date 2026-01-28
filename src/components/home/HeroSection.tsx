'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Factory, Award, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/constants/navigation';

const stats = [
  { icon: Factory, number: '3,500', unit: '평', label: '스마트 팩토리' },
  { icon: Award, number: '10', unit: '년 이상', label: '제조 경력' },
  { icon: Users, number: '15,000', unit: '+', label: '시공 완료' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Full-screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/trust/factory-aerial.jpg"
          alt="창호의 민족 스마트 팩토리 전경"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        {/* Accent Color Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2AC1BC]/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2AC1BC] rounded-full text-white text-sm font-bold mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              3,500평 스마트 팩토리 직영
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              창호 교체,
              <br />
              <span className="text-[#2AC1BC]">공장에서 직접</span>
              <br />
              만들어 드립니다
            </h1>

            {/* Sub Headline */}
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
              중간 유통 없이 공장에서 고객님께 바로.
              <br />
              <span className="text-[#2AC1BC] font-semibold">품질은 높이고, 가격은 낮추고.</span>
            </p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6 md:gap-10 mb-10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                    {stat.number}<span className="text-xl md:text-2xl text-[#2AC1BC]">{stat.unit}</span>
                  </div>
                  <div className="text-sm text-white/60 font-medium mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="h-14 md:h-16 px-8 md:px-10 bg-[#2AC1BC] hover:bg-[#1FA9A5] text-white rounded-2xl font-bold text-lg md:text-xl shadow-lg shadow-[#2AC1BC]/30"
              >
                <Link href="/estimate" className="flex items-center gap-3">
                  30초 무료 견적
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-14 md:h-16 px-8 md:px-10 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-[#1E1E1E] rounded-2xl font-bold text-lg md:text-xl"
              >
                <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-3">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  전화 상담
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <Link href="/about/factory" className="block bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 lg:p-8 hover:bg-white/15 transition-colors group">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#2AC1BC] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                  <div>
                    <p className="text-white font-bold">공장 둘러보기</p>
                    <p className="text-white/60 text-sm">3,500평 스마트 팩토리</p>
                  </div>
                </div>

                {/* Factory Preview Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5">
                  <Image
                    src="/images/factory/automation-line.jpg"
                    alt="창호 생산 라인"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-[#2AC1BC] ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Trust Points */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2AC1BC]" />
                    <span>전 공정 자동화 시스템</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2AC1BC]" />
                    <span>TPS 단열 간봉 자체 생산</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2AC1BC]" />
                    <span>실시간 품질 모니터링</span>
                  </div>
                </div>

                {/* Bottom Trust Badge - 카드 내부로 이동 */}
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#1E1E1E] font-bold text-sm">15,000+ 고객이 선택</p>
                      <p className="text-[#767676] text-xs">평균 만족도 4.9/5.0</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="text-amber-400 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -right-3 -top-3 bg-[#FF6F0F] text-white px-4 py-2 rounded-xl font-extrabold shadow-lg"
              >
                BEST 가성비
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="lg:hidden mt-8"
        >
          <Link href="/about/factory" className="block bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 active:bg-white/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2AC1BC] flex items-center justify-center flex-shrink-0">
                <Play className="w-6 h-6 text-white ml-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold">공장 둘러보기</p>
                <p className="text-white/60 text-sm">15,000+ 고객이 선택한 스마트 팩토리</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#2AC1BC] flex-shrink-0" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-sm">스크롤</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
