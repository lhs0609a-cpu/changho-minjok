'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Clock, Send } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { COMPANY_INFO } from '@/lib/constants/navigation';

export default function LandingCTA() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="contact-form" className="py-12 sm:py-16 md:py-28 bg-[#1E1E1E]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#FF6F0F] rounded-full text-white text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            지금 상담 가능 · 무료 방문 실측
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            30초면 끝,
            <br />
            <span className="text-[#2AC1BC]">무료 방문 실측 신청</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-2">
            전문가가 직접 방문해서 정확한 견적을 알려드립니다
            <br />
            <span className="text-gray-400">강매 없음 · 부담 없이 비교만 해보세요</span>
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
            <span className="px-3 py-1 bg-white/10 rounded-full text-gray-300">부산·울산·경남</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-gray-300">대구·경북</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-gray-300">전국 출장 가능</span>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 sm:py-12"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8F8F7] flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Send className="w-8 h-8 sm:w-10 sm:h-10 text-[#2AC1BC]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E1E1E] mb-2 sm:mb-3">
                    상담 신청이 완료되었습니다!
                  </h3>
                  <p className="text-sm sm:text-base text-[#767676]">
                    빠른 시일 내에 연락드리겠습니다.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#1E1E1E] mb-1.5 sm:mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 sm:h-14 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#2AC1BC] text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#1E1E1E] mb-1.5 sm:mb-2">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 sm:h-14 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#2AC1BC] text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#1E1E1E] mb-1.5 sm:mb-2">
                      시공 주소
                    </label>
                    <Input
                      type="text"
                      placeholder="부산시 해운대구..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="h-12 sm:h-14 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#2AC1BC] text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#1E1E1E] mb-1.5 sm:mb-2">
                      문의 내용
                    </label>
                    <Textarea
                      placeholder="궁금하신 내용을 자유롭게 적어주세요"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[100px] sm:min-h-[120px] rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#2AC1BC] resize-none text-base"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 sm:h-16 bg-[#FF6F0F] hover:bg-[#E5630D] text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-[#FF6F0F]/30"
                  >
                    {isSubmitting ? '전송 중...' : '내 집 견적 무료로 받기'}
                  </Button>
                  <p className="text-center text-xs sm:text-sm text-[#767676]">
                    * 강매 없음 · 개인정보 보호 · 24시간 내 회신
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="space-y-4 sm:space-y-6">
              {/* Phone */}
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="block bg-[#2AC1BC] rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:bg-[#25b0ab] transition-colors group"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs sm:text-sm mb-0.5 sm:mb-1">전화 상담</p>
                    <p className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold">
                      {COMPANY_INFO.phone}
                    </p>
                  </div>
                </div>
              </a>

              {/* KakaoTalk */}
              <a
                href={COMPANY_INFO.kakaoChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#FEE500] rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:bg-[#F5DC00] transition-colors group"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#3C1E1E]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#3C1E1E]" />
                  </div>
                  <div>
                    <p className="text-[#3C1E1E]/70 text-xs sm:text-sm mb-0.5 sm:mb-1">카카오톡 상담</p>
                    <p className="text-[#3C1E1E] text-base sm:text-xl md:text-2xl font-extrabold">
                      채널 추가하고 상담받기
                    </p>
                  </div>
                </div>
              </a>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#292929] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#3A3A3A]">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#2AC1BC] mb-2 sm:mb-4" />
                  <p className="text-white font-bold text-sm sm:text-base mb-0.5 sm:mb-1">상담 시간</p>
                  <p className="text-gray-400 text-xs sm:text-sm">평일 09:00 - 18:00</p>
                </div>
                <div className="bg-[#292929] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#3A3A3A]">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#2AC1BC] mb-2 sm:mb-4" />
                  <p className="text-white font-bold text-sm sm:text-base mb-0.5 sm:mb-1">공장 위치</p>
                  <p className="text-gray-400 text-xs sm:text-sm">경북 청도군</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
