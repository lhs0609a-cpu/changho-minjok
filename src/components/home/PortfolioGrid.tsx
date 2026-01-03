"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Grid, ArrowRight, Eye, Sparkles } from "lucide-react";
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
    <section className="relative py-24 dark-gradient overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber/30 to-transparent" />

      {/* 글로우 오브 */}
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-neon/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 -left-40 w-80 h-80 bg-electric/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 tag tag-neon mb-4">
            <Grid className="w-4 h-4" />
            시공 사례
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            창호의민족 <span className="gradient-text-static">시공 포트폴리오</span>
          </h2>
          <p className="text-smoke max-w-2xl mx-auto">
            3,500건 이상의 시공 경험! 다양한 현장의 Before & After를 확인하세요.
          </p>
          <div className="divider mx-auto mt-6" />
        </motion.div>

        {/* 필터 버튼 */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "aurora-gradient text-white shadow-lg glow-purple"
                  : "glass text-silver hover:text-cream hover:border-electric/50"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* 포트폴리오 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group glass-card rounded-3xl overflow-hidden card-glow"
            >
              {/* 이미지 영역 */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-neon/10 to-cyber/20" />

                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-void/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="w-16 h-16 aurora-gradient rounded-full flex items-center justify-center glow-purple"
                  >
                    <Eye className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* 라벨 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-smoke font-medium">Before / After</span>
                </div>

                {/* 태그 */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 glass text-xs font-medium text-cream rounded-full">
                    {item.type}
                  </span>
                  <span className="px-3 py-1 aurora-gradient text-xs font-medium text-white rounded-full">
                    {item.product}
                  </span>
                </div>
              </div>

              {/* 정보 */}
              <div className="p-6">
                <h3 className="font-bold text-cream text-lg mb-1 group-hover:text-electric transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-smoke">{item.area}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/portfolio"
              className="btn-glow inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg"
            >
              <Sparkles className="w-5 h-5" />
              더 많은 사례 보기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
