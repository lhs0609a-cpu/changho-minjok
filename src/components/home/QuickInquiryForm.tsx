"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Star, Sparkles, CheckCircle } from "lucide-react";

const reviews = [
  { id: 1, name: "김*수", area: "서울 강남", rating: 5, content: "시스템창호로 교체했는데 단열이 확실히 좋아졌어요. 시공도 깔끔하고 만족합니다!", date: "2024.01.02" },
  { id: 2, name: "이*영", area: "경기 분당", rating: 5, content: "가격도 합리적이고 AS도 빠르게 해주셔서 좋았습니다. 추천드려요!", date: "2024.01.01" },
  { id: 3, name: "박*민", area: "인천 연수", rating: 5, content: "친절한 상담과 꼼꼼한 시공 감사합니다. 결로 현상이 완전히 사라졌어요.", date: "2023.12.28" },
];

export default function QuickInquiryForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", type: "apartment" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    setIsSubmitting(false);
  };

  return (
    <section className="relative py-24 mesh-gradient overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* 글로우 오브 */}
      <div className="absolute -top-40 left-1/4 w-80 h-80 bg-electric/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-neon/15 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* 폼 영역 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label text-gold">빠른 견적 문의</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-4 mb-6">
              지금 바로<br />
              <span className="gradient-text-gold">무료 상담</span> 신청하세요
            </h2>
            <p className="text-smoke mb-10">
              간단한 정보만 입력하시면 전문 상담사가 빠르게 연락드립니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="성함"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-dark"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="연락처"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-dark"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="주소 (시/구까지)"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-dark"
                  required
                />
              </div>
              <div>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-dark bg-transparent"
                >
                  <option value="apartment" className="bg-night text-cream">아파트</option>
                  <option value="villa" className="bg-night text-cream">빌라</option>
                  <option value="house" className="bg-night text-cream">단독주택</option>
                  <option value="commercial" className="bg-night text-cream">상가</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-electric checked:border-electric"
                />
                <label htmlFor="privacy" className="text-sm text-smoke">
                  개인정보 수집 및 이용에 동의합니다
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow-cyan w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-void/30 border-t-void rounded-full"
                    />
                    처리 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    무료 상담 신청
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* 후기 영역 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* 평점 */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-8 h-8 text-gold fill-gold" style={{ filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))" }} />
                  ))}
                </div>
                <div>
                  <span className="text-4xl font-bold gradient-text-gold">4.9</span>
                  <span className="text-smoke ml-2">/ 5.0</span>
                </div>
              </div>
              <p className="text-smoke mt-4 text-sm">
                3,500건 이상의 시공 완료 | 98% 고객 만족도
              </p>
            </div>

            {/* 후기 카드 */}
            <h3 className="text-xl font-bold text-cream mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyber" />
              실제 고객 후기
            </h3>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card rounded-2xl p-5 card-glow cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 aurora-gradient rounded-full flex items-center justify-center text-white font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium text-cream">{review.name}</span>
                        <span className="text-sm text-smoke ml-2">{review.area}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-silver text-sm leading-relaxed">{review.content}</p>
                  <p className="text-xs text-smoke mt-3">{review.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
