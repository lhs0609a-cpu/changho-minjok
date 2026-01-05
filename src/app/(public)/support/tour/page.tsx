'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AnimatedSection from '@/components/shared/AnimatedSection';

const timeSlots = [
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
];

const tourIncludes = [
  'TPS 단열간봉 자동화 라인 견학',
  'PVC/하이샤시 제조 공정 관람',
  '품질 검사실 투어',
  '1:1 전문 상담',
  '제품 샘플 확인',
  '다과 제공',
];

export default function TourPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                견학 예약이 완료되었습니다
              </h1>
              <p className="text-gray-600 mb-8">
                담당자 확인 후 확정 안내 연락을 드리겠습니다.
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
            <span className="section-badge">Factory Tour</span>
            <h1 className="page-hero-title">공장 견학 예약</h1>
            <p className="page-hero-subtitle">
              3,500평 규모의 스마트 팩토리를 직접 눈으로 확인하세요.
              <br />
              견적만 비교하지 마시고, 공장을 방문해 주십시오.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tour Info */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="section-header">
              <h2 className="section-title">견학 안내</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <AnimatedSection delay={0.1}>
                <div className="card-clean h-full text-center">
                  <div className="icon-container icon-container-sky mx-auto mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">소요시간</h3>
                  <p className="text-gray-600">약 1시간 ~ 1시간 30분</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="card-clean h-full text-center">
                  <div className="icon-container icon-container-sky mx-auto mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">인원</h3>
                  <p className="text-gray-600">1~10명 (단체 문의)</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="card-clean h-full text-center">
                  <div className="icon-container icon-container-sky mx-auto mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">위치</h3>
                  <p className="text-gray-600">경기도 화성시</p>
                </div>
              </AnimatedSection>
            </div>

            {/* Tour Includes */}
            <AnimatedSection delay={0.4}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Factory className="w-6 h-6 text-sky-500" />
                  <h3 className="text-lg font-semibold text-gray-900">견학 포함 내용</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {tourIncludes.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection className="section-header">
              <h2 className="section-title">예약 신청</h2>
              <p className="section-description">
                희망하시는 날짜와 시간을 선택해주세요.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <form onSubmit={handleSubmit} className="card-clean">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">이름 *</label>
                      <Input required placeholder="홍길동" className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">연락처 *</label>
                      <Input required type="tel" placeholder="010-0000-0000" className="form-input" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">희망 날짜 *</label>
                      <Input required type="date" className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">인원 수 *</label>
                      <Input required type="number" min="1" max="10" placeholder="1" className="form-input" />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">희망 시간 *</label>
                    <div className="flex flex-wrap gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedTime === time
                              ? 'bg-sky-500 text-white border-sky-500'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-sky-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="form-label">요청 사항</label>
                    <Textarea
                      rows={4}
                      placeholder="특별히 보고 싶은 시설이나 요청사항이 있으시면 적어주세요."
                      className="form-textarea"
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    * 필수 입력 항목
                  </p>
                  <Button type="submit" className="bg-sky-500 hover:bg-sky-600 px-8">
                    <Calendar className="w-4 h-4 mr-2" />
                    견학 예약하기
                  </Button>
                </div>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
