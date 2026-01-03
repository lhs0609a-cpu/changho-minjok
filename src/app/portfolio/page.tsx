"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import KakaoFloating from "@/components/common/KakaoFloating";
import Link from "next/link";
import { Grid, ArrowRight } from "lucide-react";

const filters = {
  type: ["전체", "아파트", "빌라", "단독주택", "상가"],
  product: ["전체", "PVC창호", "하이샤시", "시스템창호", "알루미늄"],
  area: ["전체", "서울", "경기", "인천", "기타"],
};

const portfolios = [
  { id: 1, title: "래미안 아파트 32평 전체 교체", type: "아파트", product: "시스템창호", area: "서울 강남", date: "2024.01", sqm: 32, windows: 8 },
  { id: 2, title: "힐스테이트 25평 거실/방", type: "아파트", product: "하이샤시", area: "경기 분당", date: "2024.01", sqm: 25, windows: 5 },
  { id: 3, title: "단독주택 2층 전체 리모델링", type: "단독주택", product: "시스템창호", area: "서울 용산", date: "2023.12", sqm: 55, windows: 15 },
  { id: 4, title: "다세대빌라 전체 교체", type: "빌라", product: "PVC창호", area: "인천 연수", date: "2023.12", sqm: 20, windows: 6 },
  { id: 5, title: "사무실 방음창 시공", type: "상가", product: "알루미늄", area: "서울 종로", date: "2023.11", sqm: 40, windows: 10 },
  { id: 6, title: "자이 아파트 42평 전체", type: "아파트", product: "시스템창호", area: "경기 수원", date: "2023.11", sqm: 42, windows: 10 },
  { id: 7, title: "타운하우스 1층 베란다", type: "단독주택", product: "하이샤시", area: "경기 용인", date: "2023.10", sqm: 15, windows: 3 },
  { id: 8, title: "오피스텔 방음 시공", type: "상가", product: "시스템창호", area: "서울 강서", date: "2023.10", sqm: 18, windows: 4 },
];

export default function PortfolioPage() {
  const [activeType, setActiveType] = useState("전체");
  const [activeProduct, setActiveProduct] = useState("전체");
  const [activeArea, setActiveArea] = useState("전체");

  const filteredItems = portfolios.filter((item) => {
    if (activeType !== "전체" && item.type !== activeType) return false;
    if (activeProduct !== "전체" && item.product !== activeProduct) return false;
    if (activeArea !== "전체" && !item.area.includes(activeArea)) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* 히어로 */}
        <section className="bg-hanji py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-primary font-medium"><Grid className="w-5 h-5" />Portfolio</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink mt-4 mb-6">시공 사례</h1>
              <p className="text-muted max-w-2xl mx-auto text-lg">3,500건 이상의 시공 경험! 다양한 현장의 Before & After를 확인하세요.</p>
            </div>
          </div>
        </section>

        {/* 필터 */}
        <section className="py-8 bg-white border-b sticky top-16 md:top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-6 justify-center">
              <div>
                <span className="text-sm text-muted mr-2">주거형태</span>
                <div className="inline-flex flex-wrap gap-1">
                  {filters.type.map((f) => (
                    <button key={f} onClick={() => setActiveType(f)} className={activeType === f ? "px-3 py-1 rounded-full text-sm font-medium bg-primary text-white" : "px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-ink hover:bg-gray-200"}>{f}</button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted mr-2">제품</span>
                <div className="inline-flex flex-wrap gap-1">
                  {filters.product.map((f) => (
                    <button key={f} onClick={() => setActiveProduct(f)} className={activeProduct === f ? "px-3 py-1 rounded-full text-sm font-medium bg-primary text-white" : "px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-ink hover:bg-gray-200"}>{f}</button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted mr-2">지역</span>
                <div className="inline-flex flex-wrap gap-1">
                  {filters.area.map((f) => (
                    <button key={f} onClick={() => setActiveArea(f)} className={activeArea === f ? "px-3 py-1 rounded-full text-sm font-medium bg-primary text-white" : "px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-ink hover:bg-gray-200"}>{f}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 포트폴리오 그리드 */}
        <section className="py-12 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-muted mb-6">총 {filteredItems.length}건의 시공 사례</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Link key={item.id} href={'/portfolio/' + item.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted">Before / After</div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-1 bg-white/90 rounded-full text-xs font-medium">{item.type}</span>
                      <span className="px-2 py-1 bg-primary/90 text-white rounded-full text-xs font-medium">{item.product}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-ink group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-sm text-muted">
                      <span>{item.area}</span>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex gap-4 mt-3 text-xs text-muted">
                      <span>{item.sqm}평</span>
                      <span>창호 {item.windows}개</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-ink text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">우리 집도 이렇게 바꿔보세요</h2>
            <p className="text-gray-400 mb-8">무료 상담을 통해 우리 집에 맞는 최적의 창호를 추천받으세요.</p>
            <Link href="/inquiry" className="inline-flex items-center gap-2 btn-accent px-8 py-4 rounded-lg font-bold text-lg">
              무료 견적 신청<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <KakaoFloating />
    </>
  );
}
