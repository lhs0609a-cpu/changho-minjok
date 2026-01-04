'use client';

import AnimatedSection from '@/components/shared/AnimatedSection';

const partners = [
  { name: 'KCC글라스', logo: '/images/partners/kcc.png' },
  { name: '휴그린', logo: '/images/partners/hugreen.png' },
  { name: 'LX하우시스', logo: '/images/partners/lxhausys.png' },
  { name: '금호석유화학', logo: '/images/partners/kumho.png' },
];

export default function PartnersSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-10">
          <p className="text-gray-500 text-sm">
            대한민국 대표 창호 자재 기업들과 함께합니다
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
              >
                {/* Logo Placeholder */}
                <div className="h-12 px-6 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-400">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
