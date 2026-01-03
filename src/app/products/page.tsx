import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import KakaoFloating from "@/components/common/KakaoFloating";
import Link from "next/link";
import { ArrowRight, Thermometer, Volume2, Shield, Sun } from "lucide-react";

const categories = [
  { id: "frame", label: "프레임별", items: ["PVC창호", "하이샤시", "시스템창호", "알루미늄"] },
  { id: "function", label: "기능별", items: ["단열창", "방음창", "방범창"] },
  { id: "glass", label: "유리별", items: ["복층유리", "삼중유리", "로이유리", "방음유리"] },
];

const products = [
  { id: "pvc", name: "PVC창호", category: "프레임", description: "가성비 좋은 기본형 창호. 단열성과 기밀성이 우수합니다.", price: "15만원~/㎡", features: ["우수한 단열성", "합리적인 가격", "다양한 디자인"], icon: Thermometer },
  { id: "hisash", name: "하이샤시", category: "프레임", description: "PVC보다 강화된 프레임으로 내구성이 뛰어납니다.", price: "20만원~/㎡", features: ["강화된 내구성", "슬림한 프레임", "고급스러운 외관"], icon: Shield },
  { id: "system", name: "시스템창호", category: "프레임", description: "독일식 고급 창호. 최상의 단열과 방음 성능을 제공합니다.", price: "28만원~/㎡", features: ["최고 단열성능", "뛰어난 방음", "프리미엄 품질"], icon: Volume2 },
  { id: "aluminum", name: "알루미늄", category: "프레임", description: "상업용, 대형 창호에 적합. 넓은 개구부 확보 가능.", price: "18만원~/㎡", features: ["대형 창호 가능", "높은 강성", "현대적 디자인"], icon: Sun },
];

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* 히어로 */}
        <section className="bg-hanji py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-primary font-medium">Products</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink mt-4 mb-6">창호의민족 제품 소개</h1>
              <p className="text-muted max-w-2xl mx-auto text-lg">고객의 니즈에 맞는 다양한 창호 제품을 제공합니다. 프레임, 기능, 유리 종류에 따라 최적의 제품을 선택하세요.</p>
            </div>
          </div>
        </section>

        {/* 카테고리 */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8">
              {categories.map((cat) => (
                <div key={cat.id} className="text-center">
                  <h3 className="font-bold text-ink mb-2">{cat.label}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {cat.items.map((item) => (
                      <span key={item} className="px-3 py-1 bg-hanji rounded-full text-sm text-muted">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 제품 목록 */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-hanji to-ivory flex items-center justify-center">
                    <product.icon className="w-20 h-20 text-primary" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">{product.category}</span>
                      <span className="text-accent font-bold">{product.price}</span>
                    </div>
                    <h3 className="font-bold text-ink text-xl mb-2">{product.name}</h3>
                    <p className="text-muted text-sm mb-4">{product.description}</p>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-ink">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />{feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3">
                      <Link href={'/products/' + product.id} className="flex-1 text-center py-3 bg-ink text-white rounded-lg font-medium hover:bg-ink/90 transition-colors">자세히 보기</Link>
                      <Link href="/inquiry" className="flex-1 text-center py-3 btn-accent rounded-lg font-medium">견적 문의</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-ink text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">어떤 제품이 우리 집에 맞을까요?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">전문 상담사가 고객님의 환경과 예산에 맞는 최적의 제품을 추천해드립니다.</p>
            <Link href="/inquiry" className="inline-flex items-center gap-2 btn-accent px-8 py-4 rounded-lg font-bold text-lg">
              무료 상담 신청<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <KakaoFloating />
    </>
  );
}
