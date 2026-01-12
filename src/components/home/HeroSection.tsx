'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Phone, Factory, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/constants/navigation';

const partners = [
  { name: 'KCC글라스', logo: '/images/partners/kcc-glass.png' },
  { name: '휴그린', logo: '/images/partners/hugreen.jpg' },
  { name: 'LX하우시스', logo: '/images/partners/lx-hausys.jpg' },
];

const features = [
  '공장 직영 가격',
  '10년 품질 보증',
  '무료 현장 방문',
];

const stats = [
  { icon: Factory, number: '3,500', unit: '평', label: '스마트 팩토리' },
  { icon: Award, number: '10', unit: '년+', label: '제조 경력' },
  { icon: Users, number: '15,000', unit: '+', label: '시공 완료' },
];

export default function HeroSection() {
  return (
    <section className="relative pt-20 lg:pt-24 pb-16 lg:pb-24 bg-[#F5F5F5] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#2AC1BC] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#2AC1BC] rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8F8F7] rounded-full text-[#2AC1BC] text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2AC1BC] animate-pulse" />
              스마트 팩토리 직영
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1E1E1E] leading-tight mb-6 tracking-tight">
              창호 교체,
              <br />
              <span className="text-[#2AC1BC]">공장 직영</span>으로
              <br />
              합리적으로
            </h1>

            <p className="text-lg text-[#767676] mb-8 max-w-md leading-relaxed">
              10년 제조 노하우와 3,500평 스마트 팩토리.
              <br />
              중간 마진 없이 품질과 가격 모두 잡으세요.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#2AC1BC]" />
                  <span className="text-[#1E1E1E] font-bold">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs - 배민 스타일 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 bg-[#2AC1BC] hover:bg-[#1FA9A5] text-white rounded-xl font-bold text-lg"
              >
                <Link href="/estimate" className="flex items-center gap-2">
                  30초 무료 견적
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 border-2 border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white rounded-xl font-bold text-lg"
              >
                <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  전화 상담
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right - Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl border-2 border-[#EEEEEE] p-8 lg:p-10">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#E8F8F7] flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-[#2AC1BC]" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-extrabold text-[#2AC1BC] tracking-tight">
                      {stat.number}<span className="text-xl">{stat.unit}</span>
                    </div>
                    <div className="text-sm text-[#767676] font-medium mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="h-px bg-[#EEEEEE] mb-8" />

              {/* Partners */}
              <div className="text-center">
                <p className="text-sm text-[#767676] font-medium mb-4">신뢰할 수 있는 파트너사</p>
                <div className="flex justify-center items-center gap-4 md:gap-8">
                  {partners.map((partner) => (
                    <div key={partner.name} className="relative h-6 w-16 md:h-8 md:w-24 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge - 배민 스타일 */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute right-2 md:-right-4 -top-2 md:-top-4 bg-[#FF6F0F] text-white px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl font-extrabold text-sm md:text-lg shadow-lg"
            >
              BEST 가성비
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
