import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { getPublishedPortfolios } from '@/lib/portfolio-db';

export const metadata: Metadata = {
  title: '시공사례',
  description: '창호의 민족이 시공한 다양한 사례를 확인하세요. 아파트, 빌라, 단독주택 등 다양한 건물 유형의 시공 사례를 제공합니다.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const filters = ['전체', '아파트', '빌라', '단독주택', '상가'];

const productColors: Record<string, string> = {
  '시스템창호': 'bg-amber-500',
  '하이샤시': 'bg-emerald-500',
  'PVC창호': 'bg-sky-500',
};

export default async function PortfolioPage() {
  const portfolios = await getPublishedPortfolios();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-badge">Portfolio</span>
            <h1 className="page-hero-title">시공사례</h1>
            <p className="page-hero-subtitle">
              창호의 민족이 완성한 다양한 시공 현장을 확인하세요.
              <br />
              고객님의 공간도 이렇게 변화할 수 있습니다.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === '전체'
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-sky-100 hover:text-sky-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section">
        <div className="container mx-auto px-4">
          {portfolios.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">등록된 시공사례가 없습니다.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((item, index) => (
                <AnimatedSection key={item.id} delay={index * 0.05}>
                  <Link href={`/portfolio/${item.slug}`} className="block group">
                    <div className="card-clean overflow-hidden p-0">
                      {/* Image */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        {item.thumbnail_url ? (
                          <Image
                            src={item.thumbnail_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">시공 사진</span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-lg text-xs font-medium text-gray-700">
                          {item.building_type}
                        </div>
                        <div className={`absolute top-3 right-3 px-2 py-1 ${productColors[item.product] || 'bg-gray-500'} text-white rounded-lg text-xs font-medium`}>
                          {item.product}
                        </div>
                        <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/10 transition-colors" />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-sky-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              우리 집도 이렇게 바꿀 수 있을까요?
            </h2>
            <p className="text-sky-100 mb-8">
              지금 바로 무료 견적을 받아보세요.
              <br />
              전문 상담원이 최적의 솔루션을 제안해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50 rounded-xl">
                <Link href="/estimate">
                  무료 견적 시뮬레이션
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
                <Link href="/support/inquiry">상담 신청</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
