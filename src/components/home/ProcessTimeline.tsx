"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Ruler, FileCheck, Wrench, Home, HeartHandshake, ChevronDown, Check } from "lucide-react";

const steps = [
  { id: 1, icon: ClipboardList, title: "상담 접수", duration: "당일", color: "electric", description: "전화, 카카오톡, 홈페이지를 통해 상담을 접수합니다. 고객님의 요구사항과 현재 상황을 자세히 파악합니다.", details: ["전화/카카오톡/홈페이지 문의", "고객 요구사항 파악", "대략적인 견적 안내", "실측 일정 조율"] },
  { id: 2, icon: Ruler, title: "현장 실측", duration: "1일", color: "neon", description: "전문 실측팀이 방문하여 정확한 치수를 측정합니다. 현장 상황에 맞는 최적의 제품을 추천드립니다.", details: ["전문 실측팀 방문", "정확한 치수 측정", "현장 상황 파악", "맞춤 제품 추천"] },
  { id: 3, icon: FileCheck, title: "견적 확정", duration: "1-2일", color: "cyber", description: "실측 결과를 바탕으로 상세 견적서를 작성합니다. 투명한 가격 정책으로 믿을 수 있는 견적을 제공합니다.", details: ["상세 견적서 작성", "제품 사양 확정", "계약금 안내", "시공 일정 협의"] },
  { id: 4, icon: Wrench, title: "제작 진행", duration: "5-7일", color: "gold", description: "자체 공장에서 맞춤 제작을 시작합니다. 철저한 품질 관리로 최상의 제품을 만들어냅니다.", details: ["자체 공장 맞춤 제작", "철저한 품질 관리", "제작 상황 안내", "시공 준비"] },
  { id: 5, icon: Home, title: "시공 설치", duration: "1-2일", color: "mint", description: "숙련된 시공팀이 깔끔하게 설치합니다. 시공 후 청소까지 완벽하게 마무리합니다.", details: ["숙련된 시공팀 설치", "기존 창호 철거", "신규 창호 설치", "청소 및 마무리"] },
  { id: 6, icon: HeartHandshake, title: "사후 관리", duration: "10년", color: "sunset", description: "시공 완료 후에도 10년간 무상 A/S를 제공합니다. 48시간 이내 신속한 방문 처리를 약속드립니다.", details: ["10년 무상 품질보증", "48시간 A/S 방문", "정기 점검 서비스", "고객 만족 관리"] },
];

const colorClasses: Record<string, { bg: string; text: string; glow: string; border: string }> = {
  electric: { bg: "bg-electric", text: "text-electric", glow: "glow-purple", border: "border-electric" },
  neon: { bg: "bg-neon", text: "text-neon", glow: "glow-pink", border: "border-neon" },
  cyber: { bg: "bg-cyber", text: "text-cyber", glow: "glow-cyan", border: "border-cyber" },
  gold: { bg: "bg-gold", text: "text-gold", glow: "glow-gold", border: "border-gold" },
  mint: { bg: "bg-mint", text: "text-mint", glow: "glow-cyan", border: "border-mint" },
  sunset: { bg: "bg-sunset", text: "text-sunset", glow: "glow-pink", border: "border-sunset" },
};

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative py-24 mesh-gradient overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-label text-neon">시공 과정 안내</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-4 mb-6">
            창호의민족과 함께하는 <span className="gradient-text-static">6단계</span>
          </h2>
          <p className="text-smoke max-w-2xl mx-auto">
            상담부터 사후관리까지, 체계적인 프로세스로 고객님께 최상의 서비스를 제공합니다.
          </p>
          <div className="divider mx-auto mt-6" />
        </motion.div>

        {/* 타임라인 */}
        <div className="relative">
          {/* 중앙 세로선 - 글로우 애니메이션 */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-electric via-neon via-50% to-cyber opacity-30" />
            <motion.div
              className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-electric to-transparent"
              animate={{ y: ["0%", "800%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`lg:flex lg:items-center lg:gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16" : "lg:pl-16"}`}>
                    <motion.div
                      className="glass-card rounded-3xl p-6 cursor-pointer card-glow"
                      onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 ${colors.bg}/20 rounded-2xl flex items-center justify-center ${colors.glow}`}>
                          <step.icon className={`w-7 h-7 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-bold ${colors.text}`}>STEP {step.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${colors.bg}/20 ${colors.text} border ${colors.border}/30`}>
                              {step.duration}
                            </span>
                          </div>
                          <h3 className="font-bold text-cream text-xl">{step.title}</h3>
                        </div>
                        <motion.div
                          animate={{ rotate: activeStep === step.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-smoke" />
                        </motion.div>
                      </div>
                      <p className="text-smoke text-sm leading-relaxed">{step.description}</p>

                      {/* 상세 정보 확장 */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: activeStep === step.id ? "auto" : 0,
                          opacity: activeStep === step.id ? 1 : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <ul className="space-y-2">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm text-silver">
                                <span className={`w-5 h-5 ${colors.bg}/20 rounded-full flex items-center justify-center`}>
                                  <Check className={`w-3 h-3 ${colors.text}`} />
                                </span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* 중앙 숫자 */}
                  <motion.div
                    className={`hidden lg:flex w-14 h-14 aurora-gradient rounded-full items-center justify-center text-white font-bold text-lg shadow-xl z-10 ${colors.glow}`}
                    whileHover={{ scale: 1.2 }}
                  >
                    {step.id}
                  </motion.div>

                  <div className="lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
