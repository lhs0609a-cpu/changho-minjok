"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import KakaoFloating from "@/components/common/KakaoFloating";
import { motion } from "framer-motion";
import { Factory, Award, Shield, Clock, Wrench, Target, Zap, CheckCircle2, Building2, Users, Sparkles } from "lucide-react";

const values = [
  {
    icon: Factory,
    title: "직접 만듭니다",
    subtitle: "제조",
    description: "11,570m² 규모의 스마트 팩토리에서 직접 생산합니다."
  },
  {
    icon: Target,
    title: "직접 판매합니다",
    subtitle: "영업",
    description: "중간 유통 마진 없이 고객에게 직접 제안합니다."
  },
  {
    icon: Wrench,
    title: "끝까지 책임집니다",
    subtitle: "시공/AS",
    description: "설치부터 10년 무상 A/S까지 책임집니다."
  },
];

const innovations = [
  {
    title: "TPS 단열 간봉 자동화",
    description: "기존 알루미늄 간봉 대비 단열 성능과 결로 방지 효과가 탁월한 고기능성 유리 생산"
  },
  {
    title: "완전 자동화 라인",
    description: "하루 최대 100틀 이상의 균일한 품질 생산 능력 확보"
  },
  {
    title: "디테일의 차이",
    description: "외부는 빈틈없는 코킹 마감, 내부는 깔끔한 노튼테이프 마감으로 디자인의 완성도까지"
  },
];

const history = [
  {
    period: "2024 ~ 2025",
    label: "도약과 혁신",
    events: [
      { year: "2025", title: "스마트 팩토리 구축", description: "TPS 간봉 자동화 설비 및 ERP 시스템 도입" },
      { year: "2024.10", title: "창호의 민족 런칭", description: "영업 전문 브랜드 공식 런칭, 원스톱 서비스 개시" },
    ]
  },
  {
    period: "2020 ~ 2023",
    label: "성장과 확장",
    events: [
      { year: "2020~", title: "대기업 파트너십 강화", description: "KCC글라스, 금호석유화학 휴그린 협력" },
      { year: "2020.09", title: "법인 전환", description: "(주)현경시스템 법인 전환" },
    ]
  },
  {
    period: "2015 ~ 2019",
    label: "시작과 기반",
    events: [
      { year: "2015~", title: "제작 라인업 구축", description: "창호 및 복층유리 제작 라인업 구축" },
      { year: "2015.06", title: "현경시스템 설립", description: "창호 제조 사업 개시" },
    ]
  },
];

const partners = [
  "KCC글라스",
  "금호석유화학 휴그린",
  "KCC",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* 히어로 */}
        <section className="relative hero-gradient py-32 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="tag inline-flex items-center gap-2 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                About Changho Minjok
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-6 leading-tight">
                제조의 혁신이 곧<br />
                <span className="gradient-text">품질의 기준</span>입니다
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
                10년의 뚝심으로 완성한 스마트 팩토리,<br className="hidden sm:block" />
                이제 창호의 민족이 고객님을 직접 만납니다.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 브랜드 철학 */}
        <section className="py-24 bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="section-label text-gold-light">Brand Philosophy</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4 mb-6">
                  화려한 광고보다<br />
                  공장의 기계 소리를 믿습니다
                </h2>
                <div className="divider mb-8" />

                <div className="space-y-6 text-slate leading-relaxed">
                  <p>
                    2015년 6월, 작은 공장에서 시작된 기계 소리는 지난 10년 가까운 시간 동안
                    멈추지 않았습니다. (주)현경시스템은 화려한 간판 뒤편에서 오직 &apos;제조&apos;라는
                    본질에만 집중해왔습니다.
                  </p>
                  <p>
                    수많은 영업사원들이 다녀갔고, 우리가 만든 창호는 수천 곳의 현장으로 나갔습니다.
                    우리는 KCC글라스, 금호석유화학 휴그린 등 국내 최고의 대기업과 협업하며 까다로운
                    품질 기준을 통과했고, 그 과정에서 창호의 프레임 하나, 유리 한 장에 담긴
                    &apos;기본의 중요성&apos;을 누구보다 깊이 이해하게 되었습니다.
                  </p>
                </div>

                <blockquote className="mt-8 pl-6 border-l-2 border-gold">
                  <p className="font-serif text-xl text-white italic">
                    "우리가 흘린 공장의 땀방울이 곧<br />제품의 내구성이 된다는 믿음.
                  </p>
                  <p className="mt-2 text-gold text-sm font-medium">
                    그것이 창호의 민족을 지탱하는 유일한 철학입니다.
                  </p>
                </blockquote>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-dark rounded-3xl p-8 md:p-12"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6">
                    <p className="stat-number text-5xl text-white">10</p>
                    <p className="text-gold text-lg font-bold mt-1">년</p>
                    <p className="text-slate text-sm mt-2">제조 경력</p>
                  </div>
                  <div className="text-center p-6">
                    <p className="stat-number text-5xl text-white">3,500</p>
                    <p className="text-gold text-lg font-bold mt-1">평</p>
                    <p className="text-slate text-sm mt-2">스마트 팩토리</p>
                  </div>
                  <div className="text-center p-6">
                    <p className="stat-number text-5xl text-white">3,500</p>
                    <p className="text-gold text-lg font-bold mt-1">+</p>
                    <p className="text-slate text-sm mt-2">누적 시공</p>
                  </div>
                  <div className="text-center p-6">
                    <p className="stat-number text-5xl text-white">100</p>
                    <p className="text-gold text-lg font-bold mt-1">틀/일</p>
                    <p className="text-slate text-sm mt-2">생산 능력</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 기술 혁신 */}
        <section className="py-24 mesh-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="section-label">Innovation</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4 mb-4">
                사람의 손기술에 첨단 자동화를 더하다
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                스마트 팩토리 & TPS 단열 복층유리 라인 구축
              </p>
              <div className="divider mx-auto mt-6" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="glass rounded-3xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-ink mb-2">
                        왜 좋은 기술력을 두고, 고객은 비싸게 사야 할까?
                      </h3>
                      <p className="text-muted leading-relaxed">
                        우리는 이 물음에 답하기 위해 과감한 투자를 결정했습니다.
                      </p>
                    </div>
                  </div>

                  <p className="text-muted leading-relaxed mb-6">
                    <strong className="text-ink">11,570m²(약 3,500평)</strong> 규모의 공장에 최첨단
                    스마트 팩토리(Smart Factory) 시스템을 도입했습니다. 판유리의 입고부터 재단,
                    복층유리 완제품 생산까지 전 공정을 자동화하여, 사람이 할 수 있는 미세한 실수조차
                    허용하지 않는 완벽한 품질 관리 시스템을 완성했습니다.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {partners.map((partner, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                {innovations.map((item, index) => (
                  <div
                    key={index}
                    className="glass rounded-2xl p-6 card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-dark" />
                      </div>
                      <div>
                        <h4 className="font-bold text-ink mb-1">{item.title}</h4>
                        <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 원스톱 서비스 */}
        <section className="py-24 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="section-label">Our Mission</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4 mb-4">
                대한민국 창호의 새로운 기준
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                우리는 단순한 유통 회사가 아닙니다
              </p>
              <div className="divider mx-auto mt-6" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-xl card-hover text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <item.icon className="w-10 h-10 text-dark" />
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-bold text-gold bg-gold/10 rounded-full mb-3">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-ink mb-3">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 glass rounded-3xl p-8 md:p-12 text-center"
            >
              <p className="font-serif text-xl md:text-2xl text-ink leading-relaxed">
                금호석유화학 휴그린, KCC 등 대기업 파트너사들과 쌓아온<br className="hidden md:block" />
                <strong>&apos;대기업 수준의 품질&apos;</strong>에, 중간 유통 마진을 걷어낸<br className="hidden md:block" />
                <strong className="text-gold">&apos;공장 직영의 합리적인 가격&apos;</strong>을 더했습니다.
              </p>
              <p className="mt-6 text-muted">
                "견적만 비교하지 마시고, 공장을 방문해 주십시오."<br />
                자신 있게 말씀드릴 수 있는 이유, 바로 제품에 대한 확신 때문입니다.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 연혁 */}
        <section className="py-24 bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="section-label text-gold-light">History</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4 mb-4">
                걸어온 길, 그리고 나아갈 길
              </h2>
              <p className="text-slate max-w-xl mx-auto">
                우직하게 걸어온 제조의 길 위에, 스마트 기술과 고객을 향한 진심을 더합니다.
              </p>
              <div className="divider mx-auto mt-6" />
            </motion.div>

            <div className="space-y-12">
              {history.map((period, periodIndex) => (
                <motion.div
                  key={periodIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: periodIndex * 0.1 }}
                  className="glass-dark rounded-3xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl font-bold text-gold">{period.period}</span>
                    <span className="px-4 py-1 bg-gold/20 text-gold rounded-full text-sm font-medium">
                      {period.label}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {period.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="flex items-start gap-4 p-4 bg-white/5 rounded-xl"
                      >
                        <span className="text-gold font-bold min-w-[80px]">{event.year}</span>
                        <div>
                          <h4 className="font-bold text-white mb-1">{event.title}</h4>
                          <p className="text-sm text-slate">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 푸터 카피 */}
        <section className="py-20 bg-gradient-to-r from-gold to-gold-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Building2 className="w-16 h-16 text-dark/80 mx-auto mb-6" />
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-dark mb-4">
                공장의 기술력에 영업의 진심을 담았습니다
              </h3>
              <p className="text-dark/80 text-lg">
                3,500평 스마트 팩토리의 자부심, 창호의 민족
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <KakaoFloating />
    </>
  );
}
