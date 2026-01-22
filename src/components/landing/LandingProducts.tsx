'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Snowflake, Volume2, Sun } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const products = [
  {
    name: 'PVC 창호',
    slug: 'pvc',
    image: '/images/products/pvc-window.png',
    description: '가성비와 단열성을 겸비한 대중적인 선택',
    features: ['우수한 단열성', '합리적 가격', '다양한 색상'],
    icon: Snowflake,
    badge: '인기',
  },
  {
    name: '시스템 창호',
    slug: 'system',
    image: '/images/products/system-window.png',
    description: '프리미엄 성능과 디자인의 완벽한 조화',
    features: ['최고급 단열', '슬림한 디자인', '기밀성 우수'],
    icon: Volume2,
    badge: '프리미엄',
  },
  {
    name: '하이샤시',
    slug: 'hi-sash',
    image: '/images/products/hisash-window.png',
    description: '탁 트인 시야와 채광을 극대화',
    features: ['넓은 유리면적', '세련된 외관', '자연채광'],
    icon: Sun,
    badge: '모던',
  },
];

export default function LandingProducts() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-2 bg-[#E8F8F7] text-[#2AC1BC] rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            Product Lineup
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4 sm:mb-6 tracking-tight">
            고객님께 맞는 창호를
            <br />
            <span className="text-[#2AC1BC]">추천드립니다</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#767676] max-w-2xl mx-auto px-2">
            용도와 예산에 맞는 최적의 창호를 제안해드립니다
          </p>
        </AnimatedSection>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <AnimatedSection key={product.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-100 hover:border-[#2AC1BC] transition-all overflow-hidden h-full"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#FF6F0F] text-white text-[10px] sm:text-xs font-bold rounded-full">
                    {product.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E8F8F7] flex items-center justify-center">
                      <product.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC]" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1E1E1E]">{product.name}</h3>
                  </div>

                  <p className="text-xs sm:text-sm md:text-base text-[#767676] mb-3 sm:mb-4">{product.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-[#767676] text-[10px] sm:text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-[#2AC1BC] font-bold text-sm sm:text-base group-hover:underline"
                  >
                    자세히 보기
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-8 sm:mt-12 px-2">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#1E1E1E] text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:bg-[#292929] transition-colors w-full sm:w-auto"
          >
            전체 제품 보기
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
