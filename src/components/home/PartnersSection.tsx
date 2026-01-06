'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/shared/AnimatedSection';

const partners = [
  { name: 'KCC글라스', logo: '/images/partners/kcc-glass.png' },
  { name: '휴그린', logo: '/images/partners/hugreen.jpg' },
  { name: 'LX하우시스', logo: '/images/partners/lx-hausys.jpg' },
  { name: '금호석유화학', logo: '/images/partners/kumho.png' },
];

export default function PartnersSection() {
  return (
    <section className="py-16 md:py-20 bg-[#F5F5F5] border-y border-[#EEEEEE]">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-10">
          <p className="text-[#767676] text-sm font-medium">
            대한민국 대표 창호 자재 기업들과 함께합니다
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="relative h-20 w-64 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
