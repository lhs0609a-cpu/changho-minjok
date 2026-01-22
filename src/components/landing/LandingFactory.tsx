'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, CheckCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const features = [
  '전 공정 자동화 시스템',
  'TPS 단열 간봉 자동화 라인',
  '내외부 전체 가스켓 마감',
  '실시간 품질 모니터링',
  '일일 30세대 생산 능력',
  'Human Error 제로',
];

export default function LandingFactory() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-[#1E1E1E] overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <AnimatedSection>
              {/* Comparison Badge */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-5 sm:mb-8">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/20 rounded-full">
                  <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                  <span className="text-red-400 text-xs sm:text-sm font-bold">숨기는 업체</span>
                </div>
                <span className="text-white/50 text-sm">vs</span>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2AC1BC] rounded-full">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-white text-xs sm:text-sm font-bold">보여주는 업체</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                공장 공개하는 창호업체,
                <br />
                <span className="text-[#2AC1BC]">전국에 몇 개나 될까요?</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-3 sm:mb-4 max-w-xl">
                저희가 자신 있게 공장 문을 여는 이유?
                <br />
                <span className="text-white font-semibold">
                  보시면 가격이 왜 이렇게 나오는지 이해되실 겁니다.
                </span>
              </p>
              <p className="text-sm sm:text-base text-[#2AC1BC] font-bold mb-6 sm:mb-10">
                숨길 게 없으니까 다 보여드립니다.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-10">
                {features.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 bg-[#292929] rounded-lg sm:rounded-xl border border-[#3A3A3A]"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC] flex-shrink-0" />
                    <span className="text-white text-xs sm:text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Link
                href="/support/tour"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#FF6F0F] rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base hover:bg-[#E5630D] transition-colors group shadow-lg shadow-[#FF6F0F]/30 w-full sm:w-auto"
              >
                직접 눈으로 확인하러 가기
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3 text-center sm:text-left">
                * 사전 예약 시 공장 견학 무료
              </p>
            </AnimatedSection>
          </div>

          {/* Factory Image */}
          <AnimatedSection direction="right">
            <div className="relative mt-6 lg:mt-0">
              <Link href="/about/factory" className="block group">
                <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/trust/factory-aerial.jpg"
                    alt="창호의 민족 스마트 팩토리 전경"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center"
                    >
                      <Play className="w-7 h-7 sm:w-10 sm:h-10 text-[#2AC1BC] ml-0.5 sm:ml-1" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-bold text-sm sm:text-lg">3,500평 규모 스마트 팩토리</p>
                    <p className="text-white/80 text-xs sm:text-sm">경상북도 청도군 소재</p>
                  </div>
                </div>
              </Link>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 bg-[#FF6F0F] text-white px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-extrabold text-xs sm:text-base shadow-lg"
              >
                언제든 방문 OK
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
