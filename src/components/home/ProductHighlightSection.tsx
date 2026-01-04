'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

const products = [
  {
    slug: 'pvc',
    name: 'PVC 창호',
    description: '뛰어난 단열성과 가성비를 갖춘 기본 창호',
    features: ['단열성 우수', '다양한 컬러', '경제적'],
    image: '/images/products/pvc.jpg',
    color: 'from-blue-500 to-blue-600',
  },
  {
    slug: 'hisash',
    name: '하이샤시',
    description: '알루미늄과 PVC의 장점을 결합한 복합 창호',
    features: ['내구성 강화', '단열+강도', '고급 디자인'],
    image: '/images/products/hisash.jpg',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    slug: 'system',
    name: '시스템창호',
    description: '최고급 기밀성과 단열성을 자랑하는 프리미엄 창호',
    features: ['최고급 사양', '에너지 절감', '방음 효과'],
    image: '/images/products/system.jpg',
    color: 'from-amber-500 to-amber-600',
  },
];

export default function ProductHighlightSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            창호의 민족 제품 라인업
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            고객의 다양한 니즈에 맞춘 최적의 창호 솔루션을 제공합니다.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <AnimatedSection key={product.slug} delay={index * 0.1}>
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Image Placeholder */}
                  <div
                    className={`h-48 bg-gradient-to-br ${product.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/30 text-6xl font-bold">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                      자세히 보기
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
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
