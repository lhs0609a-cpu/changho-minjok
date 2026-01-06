'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

const portfolios = [
  {
    id: 'yangjung-hyundai',
    slug: 'yangjung-hyundai',
    title: '양정현대아파트 창호 전체 교체',
    location: '부산 부산진구',
    buildingType: '아파트',
    product: '시스템창호',
    rating: 5,
    thumbnail: '/images/portfolio/yangjung-hyundai/thumbnail.jpg',
  },
  {
    id: 'cheongdo-house',
    slug: 'cheongdo-house',
    title: '청도 단독주택 이중창 교체',
    location: '경북 청도군',
    buildingType: '단독주택',
    product: '이중창',
    rating: 5,
    thumbnail: '/images/portfolio/cheongdo-house/thumbnail.jpg',
  },
  {
    id: 'towol-sungwon',
    slug: 'towol-sungwon',
    title: '토월성원아파트 5단지 창호 교체',
    location: '경남 창원시',
    buildingType: '아파트',
    product: '시스템창호',
    rating: 5,
    thumbnail: '/images/portfolio/towol-sungwon/thumbnail.jpg',
  },
  {
    id: 'dongwon-royalduke',
    slug: 'dongwon-royalduke',
    title: '동원로얄듀크 창호 교체',
    location: '부산 수영구',
    buildingType: '아파트',
    product: '시스템창호',
    rating: 5,
    thumbnail: '/images/portfolio/dongwon-royalduke/thumbnail.jpg',
  },
];

const productColors: Record<string, string> = {
  '시스템창호': 'bg-amber-500',
  '하이샤시': 'bg-emerald-500',
  'PVC창호': 'bg-sky-500',
  '이중창': 'bg-violet-500',
};

export default function PortfolioPreviewSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-badge">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E1E1E] mt-4 mb-4 tracking-tight">
            최근 시공사례
          </h2>
          <p className="text-[#767676] max-w-2xl mx-auto">
            창호의 민족이 완성한 다양한 시공 현장을 확인해보세요.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolios.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <Link href={`/portfolio/${item.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-[#F5F5F5] aspect-[4/3] mb-4 border-2 border-[#EEEEEE] group-hover:border-[#2AC1BC] transition-colors">
                  {/* Thumbnail Image */}
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#2AC1BC]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold">자세히 보기</span>
                  </div>

                  {/* Badge - Building Type */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-[#1E1E1E]">
                    {item.buildingType}
                  </div>

                  {/* Badge - Product Type */}
                  <div className={`absolute top-3 right-3 px-3 py-1.5 ${productColors[item.product] || 'bg-gray-500'} rounded-lg text-xs font-bold text-white`}>
                    {item.product}
                  </div>
                </div>

                <h3 className="font-bold text-[#1E1E1E] group-hover:text-[#2AC1BC] transition-colors mb-2 line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-[#767676]">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#FF6F0F] text-[#FF6F0F]"
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-[#2AC1BC] text-[#2AC1BC] hover:bg-[#2AC1BC] hover:text-white font-bold rounded-xl px-8"
          >
            <Link href="/portfolio">
              전체 시공사례 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
