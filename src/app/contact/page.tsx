import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import KakaoFloating from "@/components/common/KakaoFloating";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Car, Train, Bus, ArrowRight } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "대표전화", value: "1668-1453", href: "tel:1668-1453" },
  { icon: Mail, label: "이메일", value: "info@changho-minjok.co.kr", href: "mailto:info@changho-minjok.co.kr" },
  { icon: MapPin, label: "본사/공장", value: "경기도 화성시 정남면 창호로 123", href: null },
];

const businessHours = [
  { day: "평일", hours: "09:00 - 18:00" },
  { day: "토요일", hours: "09:00 - 13:00" },
  { day: "일/공휴일", hours: "휴무" },
];

const directions = [
  {
    icon: Car,
    title: "자가용 이용 시",
    description: "서해안고속도로 비봉IC에서 약 10분 소요. 주차장 완비 (50대 동시 주차 가능)"
  },
  {
    icon: Train,
    title: "지하철 이용 시",
    description: "1호선 병점역 하차 → 택시 약 15분 / 수인분당선 어천역 하차 → 택시 약 10분"
  },
  {
    icon: Bus,
    title: "버스 이용 시",
    description: "수원역에서 34번 버스 → 정남면사무소 하차 → 도보 5분"
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* 히어로 */}
        <section className="bg-hanji py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-primary font-medium">
                <MapPin className="w-5 h-5" />Contact
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink mt-4 mb-6">오시는 길</h1>
              <p className="text-muted max-w-2xl mx-auto text-lg">
                창호의민족 본사 및 공장을 방문해주세요. 직접 제품을 보시고 상담받으실 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 지도 & 연락처 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* 지도 */}
              <div className="lg:col-span-2">
                <div className="aspect-[16/9] bg-gradient-to-br from-hanji to-ivory rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-muted">카카오맵이 여기에 표시됩니다</p>
                    <p className="text-sm text-muted mt-2">경기도 화성시 정남면 창호로 123</p>
                  </div>
                </div>
              </div>

              {/* 연락처 정보 */}
              <div className="space-y-6">
                {/* 연락처 카드 */}
                <div className="bg-hanji rounded-2xl p-6">
                  <h3 className="font-bold text-ink text-lg mb-4">연락처</h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted">{info.label}</p>
                          {info.href ? (
                            <a href={info.href} className="font-medium text-ink hover:text-primary transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-medium text-ink text-sm">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 영업시간 카드 */}
                <div className="bg-ink rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">영업시간</h3>
                  </div>
                  <div className="space-y-2">
                    {businessHours.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-400">{item.day}</span>
                        <span className={item.hours === "휴무" ? "text-accent" : "text-white font-medium"}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    * 방문 상담은 사전 예약을 권장드립니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 찾아오시는 방법 */}
        <section className="py-16 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-ink">찾아오시는 방법</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {directions.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-ink text-lg mb-2">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 쇼룸 안내 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium">Showroom</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-2 mb-6">
                  직접 보고 결정하세요
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  창호의민족 쇼룸에서는 다양한 창호 제품을 직접 보시고 체험하실 수 있습니다.
                  프레임 재질, 유리 종류, 색상 등을 직접 비교해보시고 우리 집에 가장 적합한 창호를 선택하세요.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-ink">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    PVC, 하이샤시, 시스템창호 전 제품 전시
                  </li>
                  <li className="flex items-center gap-3 text-ink">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    단열/방음 성능 직접 체험
                  </li>
                  <li className="flex items-center gap-3 text-ink">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    전문 상담사의 1:1 맞춤 상담
                  </li>
                  <li className="flex items-center gap-3 text-ink">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    공장 견학 가능 (사전 예약)
                  </li>
                </ul>
                <Link
                  href="/inquiry"
                  className="inline-flex items-center gap-2 btn-accent px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  방문 상담 예약<ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/5] bg-gradient-to-br from-hanji to-ivory rounded-xl flex items-center justify-center">
                  <p className="text-muted text-sm">쇼룸 전경 1</p>
                </div>
                <div className="aspect-[4/5] bg-gradient-to-br from-hanji to-ivory rounded-xl flex items-center justify-center mt-8">
                  <p className="text-muted text-sm">쇼룸 전경 2</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-ink text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              방문이 어려우신가요?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              출장 상담 서비스를 이용해보세요. 전문 상담사가 직접 방문하여 현장 실측과 상담을 진행해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-2 btn-accent px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                무료 출장 상담 신청<ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:1668-1453"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors"
              >
                <Phone className="w-5 h-5" />1668-1453
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <KakaoFloating />
    </>
  );
}
