'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Gift, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

// 이번 달 말일까지 남은 일수 계산
function getDaysUntilEndOfMonth() {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const diff = endOfMonth.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// 현재 월 이름
function getCurrentMonth() {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  return months[new Date().getMonth()];
}

const promoItems = [
  {
    icon: Gift,
    title: '방충망 무료 업그레이드',
    description: '미세먼지 차단 고급 방충망',
    value: '15만원 상당',
  },
  {
    icon: Sparkles,
    title: '로이유리 무료 적용',
    description: '단열 성능 30% UP',
    value: '20만원 상당',
  },
];

export default function LandingPromo() {
  const [daysLeft, setDaysLeft] = useState(getDaysUntilEndOfMonth());
  const currentMonth = getCurrentMonth();

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysLeft(getDaysUntilEndOfMonth());
    }, 1000 * 60 * 60); // 1시간마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-r from-[#FF6F0F] to-[#FF8F3F] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Left - Timer Badge */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-white rounded-full shadow-lg"
              >
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6F0F]" />
                <span className="text-base sm:text-lg font-extrabold text-[#FF6F0F]">
                  {currentMonth} 특별 혜택
                </span>
              </motion.div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-white text-sm sm:text-base font-bold">
                  마감까지 <span className="text-yellow-300">{daysLeft}일</span> 남음
                </span>
              </div>
            </div>

            {/* Center - Promo Items */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {promoItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs sm:text-sm">{item.title}</p>
                    <p className="text-white/70 text-[10px] sm:text-xs">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right - CTA */}
            <a
              href="#contact-form"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#FF6F0F] rounded-xl font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors group shadow-lg"
            >
              혜택 받고 견적받기
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
