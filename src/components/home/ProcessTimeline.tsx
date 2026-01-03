"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Ruler, FileCheck, Wrench, Home, HeartHandshake, ChevronDown } from "lucide-react";

const steps = [
  { id: 1, icon: ClipboardList, title: "상담 접수", duration: "당일", description: "전화, 카카오톡, 홈페이지를 통해 상담을 접수합니다. 고객님의 요구사항과 현재 상황을 자세히 파악합니다.", details: ["전화/카카오톡/홈페이지 문의", "고객 요구사항 파악", "대략적인 견적 안내", "실측 일정 조율"] },
  { id: 2, icon: Ruler, title: "현장 실측", duration: "1일", description: "전문 실측팀이 방문하여 정확한 치수를 측정합니다. 현장 상황에 맞는 최적의 제품을 추천드립니다.", details: ["전문 실측팀 방문", "정확한 치수 측정", "현장 상황 파악", "맞춤 제품 추천"] },
  { id: 3, icon: FileCheck, title: "견적 확정", duration: "1-2일", description: "실측 결과를 바탕으로 상세 견적서를 작성합니다. 투명한 가격 정책으로 믿을 수 있는 견적을 제공합니다.", details: ["상세 견적서 작성", "제품 사양 확정", "계약금 안내", "시공 일정 협의"] },
  { id: 4, icon: Wrench, title: "제작 진행", duration: "5-7일", description: "자체 공장에서 맞춤 제작을 시작합니다. 철저한 품질 관리로 최상의 제품을 만들어냅니다.", details: ["자체 공장 맞춤 제작", "철저한 품질 관리", "제작 상황 안내", "시공 준비"] },
  { id: 5, icon: Home, title: "시공 설치", duration: "1-2일", description: "숙련된 시공팀이 깔끔하게 설치합니다. 시공 후 청소까지 완벽하게 마무리합니다.", details: ["숙련된 시공팀 설치", "기존 창호 철거", "신규 창호 설치", "청소 및 마무리"] },
  { id: 6, icon: HeartHandshake, title: "사후 관리", duration: "10년", description: "시공 완료 후에도 10년간 무상 A/S를 제공합니다. 48시간 이내 신속한 방문 처리를 약속드립니다.", details: ["10년 무상 품질보증", "48시간 A/S 방문", "정기 점검 서비스", "고객 만족 관리"] },
];

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-20 bg-hanji">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-gold font-medium mb-4 block">시공 과정 안내</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">창호의민족과 함께하는 6단계</h2>
          <p className="text-muted max-w-2xl mx-auto">상담부터 사후관리까지, 체계적인 프로세스로 고객님께 최상의 서비스를 제공합니다.</p>
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/30 -translate-x-1/2" />
          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div key={step.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={"lg:flex lg:items-center lg:gap-8 " + (index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse")}>
                <div className={"lg:w-1/2 " + (index % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12")}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer" onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-gold" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gold">STEP {step.id}</span>
                          <span className="text-xs text-muted">{step.duration}</span>
                        </div>
                        <h3 className="font-bold text-ink text-lg">{step.title}</h3>
                      </div>
                      <ChevronDown className={"w-5 h-5 text-muted transition-transform " + (activeStep === step.id ? "rotate-180" : "")} />
                    </div>
                    <p className="text-muted text-sm">{step.description}</p>
                    {activeStep === step.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-4 border-t border-gray-100">
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-ink">
                              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="hidden lg:flex w-12 h-12 bg-gold rounded-full items-center justify-center text-white font-bold shadow-lg z-10">{step.id}</div>
                <div className="lg:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
