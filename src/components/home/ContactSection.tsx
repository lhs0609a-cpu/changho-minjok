'use client';

import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { BUILDING_TYPES } from '@/lib/constants/estimate';
import { COMPANY_INFO } from '@/lib/constants/navigation';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: API 연동
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
  };

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left - Info */}
          <div>
            <AnimatedSection>
              <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">
                Contact Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
                무료 상담 신청
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                창호 교체에 대한 모든 궁금증을 해결해드립니다.
                <br />
                전문 상담원이 친절하게 안내해드리겠습니다.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      전화 상담
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      평일 09:00 - 18:00
                    </p>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-xl font-bold text-blue-600"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      카카오톡 상담
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      24시간 문의 가능
                    </p>
                    <Button variant="outline" size="sm" className="mt-1">
                      카카오톡 상담하기
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right - Form */}
          <AnimatedSection direction="right">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 p-6 md:p-8 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                간편 상담 신청
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="name"
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    건물 유형 <span className="text-red-500">*</span>
                  </label>
                  <Select name="buildingType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUILDING_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    문의 내용
                  </label>
                  <Textarea
                    name="message"
                    placeholder="문의하실 내용을 입력해주세요."
                    rows={4}
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="mt-1"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    개인정보 수집 및 이용에 동의합니다.{' '}
                    <a href="/privacy" className="text-blue-600 underline">
                      자세히
                    </a>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '제출 중...' : '상담 신청하기'}
                </Button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
