"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Grid, ArrowRight } from "lucide-react";
import Link from "next/link";

const mockPortfolios = [
  { id: 1, title: "래미안 아파트 32평", type: "아파트", product: "시스템창호", area: "서울 강남", image: "/images/portfolio-1.jpg" },
  { id: 2, title: "힐스테이트 25평", type: "아파트", product: "하이샤시", area: "경기 분당", image: "/images/portfolio-2.jpg" },
  { id: 3, title: "단독주택 리모델링", type: "단독", product: "시스템창호", area: "서울 용산", image: "/images/portfolio-3.jpg" },
  { id: 4, title: "빌라 전체 교체", type: "빌라", product: "PVC창호", area: "인천 연수", image: "/images/portfolio-4.jpg" },
  { id: 5, title: "사무실 방음창", type: "상가", product: "방음창호", area: "서울 종로", image: "/images/portfolio-5.jpg" },
  { id: 6, title: "자이 아파트 42평", type: "아파트", product: "시스템창호", area: "경기 수원", image: "/images/portfolio-6.jpg" },
];

const filters = ["전체", "아파트", "빌라", "단독", "상가"];

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const filteredItems = activeFilter === "전체" ? mockPortfolios : mockPortfolios.filter((p) => p.type === activeFilter);

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <Grid className="w-5 h-5" />시공 사례
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">창호의민족 시공 포트폴리오</h2>
          <p className="text-muted max-w-2xl mx-auto">3,500건 이상의 시공 경험! 다양한 현장의 Before & After를 확인하세요.</p>
        </motion.div>
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {filters.map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={activeFilter === filter ? "px-4 py-2 rounded-full text-sm font-medium bg-primary text-white" : "px-4 py-2 rounded-full text-sm font-medium bg-white text-ink hover:bg-gray-100"}>
              {filter}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-muted">
                  <span>Before / After</span>
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-1 bg-white/90 rounded-full text-xs font-medium">{item.type}</span>
                  <span className="px-2 py-1 bg-primary/90 text-white rounded-full text-xs font-medium">{item.product}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-ink text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted">{item.area}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <Link href="/portfolio" className="inline-flex items-center gap-2 bg-ink text-white px-8 py-4 rounded-lg font-bold hover:bg-ink/90 transition-colors">
            더 많은 사례 보기<ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
