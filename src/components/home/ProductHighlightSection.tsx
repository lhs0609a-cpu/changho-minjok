'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

const products = [
  {
    slug: 'pvc',
    name: 'PVC 창호',
    description: '뛰어난 단열성과 가성비를 갖춘 기본 창호',
    features: ['단열성 우수', '다양한 컬러', '경제적'],
    color: 'bg-[#2AC1BC]',
    image: '/images/products/pvc-window.png',
  },
  {
    slug: 'hisash',
    name: '하이샤시',
    description: '알루미늄과 PVC의 장점을 결합한 복합 창호',
    features: ['내구성 강화', '단열+강도', '고급 디자인'],
    color: 'bg-[#FF6F0F]',
    image: '/images/products/hisash-window.png',
  },
  {
    slug: 'system',
    name: '시스템창호',
    description: '최고급 기밀성과 단열성을 자랑하는 프리미엄 창호',
    features: ['최고급 사양', '에너지 절감', '방음 효과'],
    color: 'bg-[#1E1E1E]',
    image: '/images/products/system-window.png',
  },
];

export default function ProductHighlightSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-badge">Our Products</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E1E1E] mt-4 mb-4 tracking-tight">
            창호의 민족 제품 라인업
          </h2>
          <p className="text-[#767676] max-w-2xl mx-auto">
            고객의 다양한 니즈에 맞춘 최적의 창호 솔루션을 제공합니다.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <AnimatedSection key={product.slug} delay={index * 0.1}>
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="bg-white rounded-3xl overflow-hidden border-2 border-[#EEEEEE] hover:border-[#2AC1BC] transition-all duration-300 hover:-translate-y-2">
                  {/* Product Image */}
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-[#1E1E1E] mb-2 group-hover:text-[#2AC1BC] transition-colors tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-[#767676] text-sm mb-4">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-3 py-1 bg-[#E8F8F7] text-[#2AC1BC] rounded-lg font-bold"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="flex items-center text-[#2AC1BC] text-sm font-bold group-hover:gap-2 transition-all">
                      자세히 보기
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white font-bold rounded-xl px-8"
          >
            <Link href="/products">
              전체 제품 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
