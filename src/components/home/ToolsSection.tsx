'use client';

import Link from 'next/link';
import { Calculator, ClipboardCheck, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const tools = [
  {
    icon: Calculator,
    title: '난방비 절감 계산기',
    subtitle: 'SAVINGS CALCULATOR',
    description: '우리 집 평수와 난방비를 입력하면 창호 교체 시 예상 절감액과 투자 회수 기간을 바로 확인할 수 있습니다.',
    href: '/tools/savings-calculator',
    color: 'text-[#FF6F0F]',
    bgColor: 'bg-[#FFF3E8]',
    hoverBg: 'group-hover:bg-[#FF6F0F]',
  },
  {
    icon: ClipboardCheck,
    title: '내 집 창호 진단',
    subtitle: 'WINDOW DIAGNOSIS',
    description: '5가지 간단한 질문으로 우리 집 창호 상태를 진단해보세요. 외풍, 결로, 소음 등을 종합 분석해드립니다.',
    href: '/tools/diagnosis',
    color: 'text-[#EF4444]',
    bgColor: 'bg-[#FEF2F2]',
    hoverBg: 'group-hover:bg-[#EF4444]',
  },
];

export default function ToolsSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-badge">Smart Tools</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-6 tracking-tight">
            창호 교체,
            <br />
            <span className="text-[#FF6F0F]">똑똑하게 결정</span>하세요
          </h2>
          <p className="text-lg text-[#767676] leading-relaxed">
            무료 도구로 우리 집 창호 상태와 절감 효과를 미리 확인해보세요.
          </p>
        </AnimatedSection>

        {/* Tool Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {tools.map((tool, index) => (
            <AnimatedSection key={tool.title} delay={index * 0.15}>
              <Link href={tool.href} className="group block h-full">
                <div className="relative h-full bg-white rounded-3xl p-6 md:p-8 lg:p-10 border-2 border-[#EEEEEE] hover:border-gray-300 transition-all duration-300 hover:-translate-y-2">
                  {/* Icon */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${tool.bgColor} flex items-center justify-center mb-5 md:mb-6 ${tool.hoverBg} transition-colors`}>
                    <tool.icon className={`h-7 w-7 md:h-8 md:w-8 ${tool.color} group-hover:text-white transition-colors`} />
                  </div>

                  {/* Content */}
                  <span className="text-xs font-bold text-[#C4C4C4] uppercase tracking-wider block mb-2">
                    {tool.subtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#1E1E1E] mb-3 md:mb-4 tracking-tight">
                    {tool.title}
                  </h3>
                  <p className="text-[#767676] leading-relaxed mb-5 md:mb-6 text-sm md:text-base">
                    {tool.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-[#767676] font-bold">
                    <span className="text-sm">무료로 확인하기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Bottom Line */}
                  <div className="absolute bottom-0 left-6 right-6 md:left-8 md:right-8 h-1 rounded-full bg-[#1E1E1E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
