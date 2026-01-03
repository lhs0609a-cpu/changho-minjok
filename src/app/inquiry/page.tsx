"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import KakaoFloating from "@/components/common/KakaoFloating";
import { FileText, CheckCircle, Upload, Phone, Mail, MapPin } from "lucide-react";

const housingTypes = ["아파트", "빌라/다세대", "단독주택", "오피스텔", "상가/사무실"];
const products = ["PVC창호", "하이샤시", "시스템창호", "알루미늄", "잘 모르겠어요"];
const reasons = ["단열/결로", "방음", "노후 교체", "인테리어", "신축/리모델링", "기타"];
const budgets = ["100만원 이하", "100~300만원", "300~500만원", "500~1000만원", "1000만원 이상", "미정"];

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    addressDetail: "",
    housingType: "",
    area: "",
    product: "",
    reason: [] as string[],
    budget: "",
    message: "",
    privacyAgree: false,
    marketingAgree: false,
  });

  const handleReasonToggle = (reason: string) => {
    setFormData(prev => ({
      ...prev,
      reason: prev.reason.includes(reason)
        ? prev.reason.filter(r => r !== reason)
        : [...prev.reason, reason]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
    console.log(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-ivory flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink mb-4">견적 신청이 완료되었습니다</h1>
            <p className="text-muted mb-8">
              빠른 시간 내에 전문 상담사가 연락드리겠습니다.<br />
              평균 응답 시간: 30분 이내 (영업시간 기준)
            </p>
            <div className="bg-white rounded-xl p-6 shadow-lg text-left mb-8">
              <h3 className="font-bold text-ink mb-4">접수 내용 확인</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">성함</dt>
                  <dd className="text-ink">{formData.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">연락처</dt>
                  <dd className="text-ink">{formData.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">주거형태</dt>
                  <dd className="text-ink">{formData.housingType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">희망 제품</dt>
                  <dd className="text-ink">{formData.product}</dd>
                </div>
              </dl>
            </div>
            <a href="/" className="inline-block bg-ink text-white px-8 py-3 rounded-lg font-medium hover:bg-ink/90 transition-colors">
              홈으로 돌아가기
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* 히어로 */}
        <section className="bg-hanji py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-primary font-medium">
                <FileText className="w-5 h-5" />Free Estimate
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink mt-4 mb-6">무료 견적 신청</h1>
              <p className="text-muted max-w-2xl mx-auto text-lg">
                간단한 정보만 입력해주세요. 전문 상담사가 빠르게 연락드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* 폼 */}
        <section className="py-16 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* 사이드바 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                  <h3 className="font-bold text-ink text-lg mb-6">빠른 상담 연락처</h3>
                  <div className="space-y-4">
                    <a href="tel:1668-1453" className="flex items-center gap-3 text-ink hover:text-primary transition-colors">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">대표전화</p>
                        <p className="font-bold">1668-1453</p>
                      </div>
                    </a>
                    <a href="mailto:info@changho-minjok.co.kr" className="flex items-center gap-3 text-ink hover:text-primary transition-colors">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">이메일</p>
                        <p className="font-medium text-sm">info@changho-minjok.co.kr</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">주소</p>
                        <p className="text-sm text-ink">경기도 화성시 정남면 창호로 123</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t">
                    <p className="text-sm text-muted mb-2">영업시간</p>
                    <p className="text-ink font-medium">평일 09:00 - 18:00</p>
                    <p className="text-ink font-medium">토요일 09:00 - 13:00</p>
                    <p className="text-muted text-sm">일/공휴일 휴무</p>
                  </div>
                </div>
              </div>

              {/* 메인 폼 */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
                  {/* 기본 정보 */}
                  <div className="mb-8">
                    <h3 className="font-bold text-ink text-lg mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary text-white rounded-full text-sm flex items-center justify-center">1</span>
                      기본 정보
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1">성함 *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          placeholder="홍길동"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1">연락처 *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          placeholder="010-1234-5678"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-ink mb-1">이메일</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-ink mb-1">시공 주소 *</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                            className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            placeholder="주소 검색"
                          />
                          <button type="button" className="px-4 py-3 bg-ink text-white rounded-lg hover:bg-ink/90 transition-colors whitespace-nowrap">
                            주소 검색
                          </button>
                        </div>
                        <input
                          type="text"
                          value={formData.addressDetail}
                          onChange={e => setFormData({...formData, addressDetail: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          placeholder="상세주소 입력"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 주거 정보 */}
                  <div className="mb-8">
                    <h3 className="font-bold text-ink text-lg mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary text-white rounded-full text-sm flex items-center justify-center">2</span>
                      주거 정보
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">주거 형태 *</label>
                        <div className="flex flex-wrap gap-2">
                          {housingTypes.map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({...formData, housingType: type})}
                              className={formData.housingType === type
                                ? "px-4 py-2 rounded-full font-medium bg-primary text-white"
                                : "px-4 py-2 rounded-full font-medium bg-gray-100 text-ink hover:bg-gray-200"
                              }
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1">평수</label>
                        <input
                          type="text"
                          value={formData.area}
                          onChange={e => setFormData({...formData, area: e.target.value})}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          placeholder="예: 32평"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 시공 정보 */}
                  <div className="mb-8">
                    <h3 className="font-bold text-ink text-lg mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary text-white rounded-full text-sm flex items-center justify-center">3</span>
                      시공 정보
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">교체 이유 (복수 선택 가능)</label>
                        <div className="flex flex-wrap gap-2">
                          {reasons.map(reason => (
                            <button
                              key={reason}
                              type="button"
                              onClick={() => handleReasonToggle(reason)}
                              className={formData.reason.includes(reason)
                                ? "px-4 py-2 rounded-full font-medium bg-primary text-white"
                                : "px-4 py-2 rounded-full font-medium bg-gray-100 text-ink hover:bg-gray-200"
                              }
                            >
                              {reason}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">희망 제품</label>
                        <div className="flex flex-wrap gap-2">
                          {products.map(product => (
                            <button
                              key={product}
                              type="button"
                              onClick={() => setFormData({...formData, product})}
                              className={formData.product === product
                                ? "px-4 py-2 rounded-full font-medium bg-primary text-white"
                                : "px-4 py-2 rounded-full font-medium bg-gray-100 text-ink hover:bg-gray-200"
                              }
                            >
                              {product}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">예산</label>
                        <div className="flex flex-wrap gap-2">
                          {budgets.map(budget => (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => setFormData({...formData, budget})}
                              className={formData.budget === budget
                                ? "px-4 py-2 rounded-full font-medium bg-primary text-white"
                                : "px-4 py-2 rounded-full font-medium bg-gray-100 text-ink hover:bg-gray-200"
                              }
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 추가 사항 */}
                  <div className="mb-8">
                    <h3 className="font-bold text-ink text-lg mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary text-white rounded-full text-sm flex items-center justify-center">4</span>
                      추가 요청사항
                    </h3>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                      placeholder="추가로 궁금하신 점이나 요청사항을 적어주세요."
                    />
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-ink mb-2">사진 첨부 (선택)</label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                        <p className="text-muted text-sm">클릭하여 사진을 업로드하세요</p>
                        <p className="text-muted text-xs mt-1">JPG, PNG (최대 10MB)</p>
                      </div>
                    </div>
                  </div>

                  {/* 동의 */}
                  <div className="mb-8 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.privacyAgree}
                        onChange={e => setFormData({...formData, privacyAgree: e.target.checked})}
                        className="w-5 h-5 mt-0.5 accent-primary"
                      />
                      <span className="text-sm text-ink">
                        <span className="text-accent">[필수]</span> 개인정보 수집 및 이용에 동의합니다. <a href="#" className="text-primary underline">내용보기</a>
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.marketingAgree}
                        onChange={e => setFormData({...formData, marketingAgree: e.target.checked})}
                        className="w-5 h-5 mt-0.5 accent-primary"
                      />
                      <span className="text-sm text-ink">
                        <span className="text-muted">[선택]</span> 마케팅 정보 수신에 동의합니다.
                      </span>
                    </label>
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    type="submit"
                    className="w-full btn-accent py-4 rounded-lg font-bold text-lg"
                  >
                    무료 견적 신청하기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <KakaoFloating />
    </>
  );
}
