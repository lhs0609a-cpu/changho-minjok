'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

// 임시 데이터 - 나중에 DB에서 가져옴
const portfolios = [
  {
    id: '1',
    slug: 'gangnam-apartment',
    title: '강남 OO아파트 전체 교체',
    location: '서울 강남구',
    buildingType: '아파트',
    rating: 5,
    image: '/images/portfolio/1.jpg',
  },
  {
    id: '2',
    slug: 'suwon-villa',
    title: '수원 OO빌라 시스템창호',
    location: '경기 수원시',
    buildingType: '빌라',
    rating: 5,
    image: '/images/portfolio/2.jpg',
  },
  {
    id: '3',
    slug: 'incheon-house',
    title: '인천 단독주택 하이샤시',
    location: '인천 연수구',
    buildingType: '단독주택',
    rating: 5,
    image: '/images/portfolio/3.jpg',
  },
  {
    id: '4',
    slug: 'bundang-apartment',
    title: '분당 OO아파트 리모델링',
    location: '경기 성남시',
    buildingType: '아파트',
    rating: 4,
    image: '/images/portfolio/4.jpg',
  },
];

export default function PortfolioPreviewSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            최근 시공사례
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            창호의 민족이 완성한 다양한 시공 현장을 확인해보세요.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolios.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <Link href={`/portfolio/${item.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] mb-4">
                  {/* Placeholder Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">시공 사진</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">자세히 보기</span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded text-xs font-medium text-gray-700">
                    {item.buildingType}
                  </div>
                </div>

                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
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
