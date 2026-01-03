"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Star } from "lucide-react";

const reviews = [
  { id: 1, name: "김*수", area: "서울 강남", rating: 5, content: "시스템창호로 교체했는데 단열이 확실히 좋아졌어요. 시공도 깔끔하고 만족합니다!", date: "2024.01.02" },
  { id: 2, name: "이*영", area: "경기 분당", rating: 5, content: "가격도 합리적이고 AS도 빠르게 해주셔서 좋았습니다. 추천드려요!", date: "2024.01.01" },
  { id: 3, name: "박*민", area: "인천 연수", rating: 5, content: "친절한 상담과 꼼꼼한 시공 감사합니다. 결로 현상이 완전히 사라졌어요.", date: "2023.12.28" },
];

export default function QuickInquiryForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", type: "apartment" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
  };

  return (
    <section className="py-20 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-primary-light font-medium mb-4 block">빠른 견적 문의</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">지금 바로 무료 상담 신청하세요</h2>
            <p className="text-gray-400 mb-8">간단한 정보만 입력하시면 전문 상담사가 빠르게 연락드립니다.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input type="text" placeholder="성함" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary" required />
              </div>
              <div>
                <input type="tel" placeholder="연락처" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary" required />
              </div>
              <div>
                <input type="text" placeholder="주소 (시/구까지)" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary" required />
              </div>
              <div>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary">
                  <option value="apartment">아파트</option>
                  <option value="villa">빌라</option>
                  <option value="house">단독주택</option>
                  <option value="commercial">상가</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="privacy" required className="w-4 h-4" />
                <label htmlFor="privacy" className="text-sm text-gray-400">개인정보 수집 및 이용에 동의합니다</label>
              </div>
              <button type="submit" className="w-full btn-accent px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2">
                무료 상담 신청<Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-6 h-6 text-accent fill-accent" />))}
              </div>
              <div>
                <span className="text-3xl font-bold">4.9</span>
                <span className="text-gray-400 ml-2">/ 5.0</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-6">고객 후기</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white/5 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.name}</span>
                      <span className="text-sm text-gray-400">{review.area}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-accent fill-accent" />))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{review.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
