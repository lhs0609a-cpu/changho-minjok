'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { number: '10+', label: '년 제조 노하우' },
  { number: '3,500', label: '평 스마트 팩토리' },
  { number: '15,000+', label: '고객 시공 완료' },
];

const features = [
  '공장 직영 가격',
  '자체 TPS 생산',
  '10년 품질 보증',
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[15%] w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-[10%] w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{ y: [-10, 30, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-[20%] w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-blue-300 font-medium">2024 스마트 팩토리 그랜드 오픈</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight"
            >
              제조의 혁신이
              <br />
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
                  품질의 기준
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 -z-0"
                />
              </span>
              입니다
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed"
            >
              10년의 제조 노하우로 완성한 3,500평 스마트 팩토리.
              <br className="hidden md:block" />
              <span className="text-white font-medium">중간 유통 없이, 공장에서 직접</span> 만나보세요.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-xl shadow-blue-600/25 group"
              >
                <Link href="/estimate" className="flex items-center gap-2">
                  30초 무료 견적받기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-semibold border-white/20 text-white hover:bg-white/10 rounded-xl backdrop-blur-sm group"
              >
                <Link href="/about/factory" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  공장 둘러보기
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 lg:p-10">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl -z-10" />

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

              {/* Trust Section */}
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-6">신뢰할 수 있는 파트너사와 함께합니다</p>
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  <div className="text-white/60 font-semibold text-lg hover:text-white/80 transition-colors cursor-default">KCC글라스</div>
                  <div className="text-white/60 font-semibold text-lg hover:text-white/80 transition-colors cursor-default">휴그린</div>
                  <div className="text-white/60 font-semibold text-lg hover:text-white/80 transition-colors cursor-default">LX하우시스</div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 top-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-orange-500/25 text-sm font-semibold"
            >
              BEST 가성비
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-gray-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
