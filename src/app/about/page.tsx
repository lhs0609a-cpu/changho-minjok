import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import KakaoFloating from "@/components/common/KakaoFloating";
import { Factory, Award, Users, TrendingUp, Shield, Clock, Wrench, Heart } from "lucide-react";

const values = [
  { icon: Factory, title: "자체 공장 보유", description: "연매출 80억 규모의 자체 생산 시설을 갖추고 있습니다." },
  { icon: Shield, title: "10년 품질보증", description: "업계 최장 기간의 무상 품질 보증을 제공합니다." },
  { icon: Clock, title: "48시간 A/S", description: "접수 후 48시간 이내 방문 처리를 약속합니다." },
  { icon: Heart, title: "고객 만족", description: "4.9점의 높은 고객 만족도를 자랑합니다." },
];

const history = [
  { year: "2015", title: "창호의민족 설립", description: "경기도 화성에 본사 및 공장 설립" },
  { year: "2017", title: "생산시설 확장", description: "제2공장 신설, 생산능력 2배 확대" },
  { year: "2019", title: "품질인증 획득", description: "KS 인증 및 ISO 9001 획득" },
  { year: "2021", title: "연매출 50억 달성", description: "수도권 시공 1,000건 돌파" },
  { year: "2023", title: "연매출 80억 달성", description: "누적 시공 3,500건 돌파" },
  { year: "2024", title: "디지털 전환", description: "온라인 견적 시스템 도입" },
];

const certifications = [
  "KS 품질인증", "ISO 9001", "에너지절약 우수기업", "소비자만족 대상",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* 히어로 */}
        <section className="bg-hanji py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-gold font-medium">About Us</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink mt-4 mb-6">창호의민족을 소개합니다</h1>
              <p className="text-muted max-w-2xl mx-auto text-lg">2015년 설립 이래, 고객 만족을 최우선으로 프리미엄 창호 서비스를 제공해왔습니다.</p>
            </div>
          </div>
        </section>

        {/* 브랜드 스토리 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-gold font-medium">Brand Story</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-2 mb-6">창호의민족이 걸어온 길</h2>
                <p className="text-muted leading-relaxed mb-6">창호의민족은 "고객에게 최고의 창호를, 합리적인 가격에"라는 철학으로 시작되었습니다. 자체 공장을 운영하여 중간 유통 마진을 없애고, 고품질 창호를 직접 생산하여 고객에게 제공합니다.</p>
                <p className="text-muted leading-relaxed mb-6">10년간 쌓아온 기술력과 3,500건 이상의 시공 경험을 바탕으로, 대한민국 최고의 창호 전문 기업으로 성장했습니다.</p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-hanji rounded-xl">
                    <p className="text-4xl font-bold text-gold">80억</p>
                    <p className="text-sm text-muted mt-1">연 매출</p>
                  </div>
                  <div className="text-center p-6 bg-hanji rounded-xl">
                    <p className="text-4xl font-bold text-gold">3,500+</p>
                    <p className="text-sm text-muted mt-1">누적 시공</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-hanji to-ivory rounded-2xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <Factory className="w-24 h-24 text-gold mx-auto mb-4" />
                  <p className="text-lg font-medium text-ink">자체 공장 전경</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 가치 */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-gold font-medium">Core Values</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-2">창호의민족의 핵심 가치</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-bold text-ink text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 연혁 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-gold font-medium">History</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-2">창호의민족 연혁</h2>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/30 -translate-x-1/2 hidden md:block" />
              <div className="space-y-8">
                {history.map((item, index) => (
                  <div key={index} className="md:flex md:items-center md:gap-8">
                    <div className={"md:w-1/2 " + (index % 2 === 0 ? "md:text-right md:pr-12" : "md:order-2 md:pl-12")}>
                      <div className="bg-hanji rounded-xl p-6">
                        <span className="text-gold font-bold text-xl">{item.year}</span>
                        <h3 className="font-bold text-ink text-lg mt-2">{item.title}</h3>
                        <p className="text-sm text-muted mt-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-4 h-4 bg-gold rounded-full z-10" />
                    <div className="md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 인증 */}
        <section className="py-20 bg-ink text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-gold font-medium">Certifications</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">인증 및 수상</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-6 text-center">
                  <Award className="w-12 h-12 text-gold mx-auto mb-3" />
                  <p className="font-medium">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <KakaoFloating />
    </>
  );
}
