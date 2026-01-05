'use client';

import { useState } from 'react';
import { Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { COMPANY_INFO } from '@/lib/constants/navigation';
import AnimatedSection from '@/components/shared/AnimatedSection';

const inquiryTypes = [
  { value: 'estimate', label: '견적 문의' },
  { value: 'product', label: '제품 문의' },
  { value: 'installation', label: '시공 문의' },
  { value: 'as', label: 'A/S 문의' },
  { value: 'other', label: '기타' },
];

export default function InquiryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 폼 제출 로직
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen">
        <section className="section">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-sky-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                상담 신청이 완료되었습니다
              </h1>
              <p className="text-gray-600 mb-8">
                빠른 시일 내에 담당자가 연락드리겠습니다.
                <br />
                감사합니다.
              </p>
              <Button asChild className="bg-sky-500 hover:bg-sky-600">
                <a href="/">홈으로 돌아가기</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-badge">Inquiry</span>
            <h1 className="page-hero-title">상담 신청</h1>
            <p className="page-hero-subtitle">
              창호 교체에 대해 궁금한 점이 있으신가요?
              <br />
              전문 상담원이 친절하게 답변해드립니다.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <AnimatedSection>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">연락처 정보</h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="icon-container icon-container-sky flex-shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">전화 상담</p>
                        <a href={`tel:${COMPANY_INFO.phone}`} className="font-semibold text-gray-900 hover:text-sky-600">
                          {COMPANY_INFO.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="icon-container icon-container-sky flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">이메일</p>
                        <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold text-gray-900 hover:text-sky-600">
                          {COMPANY_INFO.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="icon-container icon-container-sky flex-shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">운영시간</p>
                        <p className="font-semibold text-gray-900">평일 09:00 - 18:00</p>
                        <p className="text-sm text-gray-500">점심시간 12:00 - 13:00</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <AnimatedSection delay={0.1}>
                  <form onSubmit={handleSubmit} className="card-clean">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">이름 *</label>
                        <Input required placeholder="홍길동" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">연락처 *</label>
                        <Input required type="tel" placeholder="010-0000-0000" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">이메일</label>
                        <Input type="email" placeholder="email@example.com" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">문의 유형 *</label>
                        <select required className="form-input">
                          <option value="">선택해주세요</option>
                          {inquiryTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">주소</label>
                        <Input placeholder="시공 예정 주소" className="form-input" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">문의 내용 *</label>
                        <Textarea
                          required
                          rows={5}
                          placeholder="문의하실 내용을 자세히 적어주세요."
                          className="form-textarea"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        * 필수 입력 항목
                      </p>
                      <Button type="submit" className="bg-sky-500 hover:bg-sky-600 px-8">
                        <Send className="w-4 h-4 mr-2" />
                        상담 신청하기
                      </Button>
                    </div>
                  </form>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
