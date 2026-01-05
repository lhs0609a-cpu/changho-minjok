'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

const portfolios = [
  {
    id: '1',
    slug: 'gangnam-apartment-1',
    title: '강남 OO아파트 전체 교체',
    location: '서울 강남구',
    buildingType: '아파트',
    rating: 5,
  },
  {
    id: '2',
    slug: 'suwon-villa-1',
    title: '수원 OO빌라 시스템창호',
    location: '경기 수원시',
    buildingType: '빌라',
    rating: 5,
  },
  {
    id: '3',
    slug: 'incheon-house-1',
    title: '인천 단독주택 하이샤시',
    location: '인천 연수구',
    buildingType: '단독주택',
    rating: 5,
  },
  {
    id: '4',
    slug: 'bundang-apartment-1',
    title: '분당 OO아파트 리모델링',
    location: '경기 성남시',
    buildingType: '아파트',
    rating: 4,
  },
];

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
                  {/* Placeholder Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#C4C4C4] text-sm font-medium">시공 사진</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#2AC1BC]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold">자세히 보기</span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-[#1E1E1E]">
                    {item.buildingType}
                  </div>
                </div>

                <h3 className="font-bold text-[#1E1E1E] group-hover:text-[#2AC1BC] transition-colors mb-2">
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
