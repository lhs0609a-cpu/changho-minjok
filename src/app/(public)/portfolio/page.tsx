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
  '이중창': 'bg-violet-500',
};

// 하드코딩된 시공사례 데이터
const hardcodedPortfolios = [
  {
    id: 'yangjung-hyundai',
    slug: 'yangjung-hyundai',
    title: '부산 아파트 창호 전체 교체',
    location: '부산 소재',
    building_type: '아파트',
    product: '시스템창호',
    rating: 5,
    date: '2024년 12월',
    description: '이사 전 리모델링을 위한 아파트 창호 교체 공사. 노후 단창 구조를 고성능 창호로 교체해 외풍·결로·소음 문제를 개선하고, 하루 시공으로 단열 성능과 주거 쾌적성을 크게 향상시킨 현장입니다.',
    area: '84㎡ (34평형)',
    window_count: '12개',
    duration: '1일',
    features: ['휴그린 창호 적용', '로이(Low-E) 복층유리', '외풍·결로·소음 개선', '하루 시공 완료'],
    review: '이사 전에 창호를 교체했는데 정말 잘한 것 같아요. 단열이 확실히 좋아졌고, 시공도 하루만에 깔끔하게 끝나서 만족합니다.',
    thumbnail_url: '/images/portfolio/yangjung-hyundai/thumbnail.jpg',
    before_url: '/images/portfolio/yangjung-hyundai/before-1.jpg',
    after_url: '/images/portfolio/yangjung-hyundai/after-1.jpg',
    gallery_urls: [
      '/images/portfolio/yangjung-hyundai/before-1.jpg',
      '/images/portfolio/yangjung-hyundai/before-2.jpg',
      '/images/portfolio/yangjung-hyundai/after-1.jpg',
      '/images/portfolio/yangjung-hyundai/after-2.jpg',
    ],
  },
  {
    id: 'cheongdo-house',
    slug: 'cheongdo-house',
    title: '경북 단독주택 이중창 교체',
    location: '경북 소재',
    building_type: '단독주택',
    product: '이중창',
    rating: 5,
    date: '2024년 12월',
    description: '거주 중 주택 단창에서 이중창으로 교체 공사. 노후 단창 구조를 고성능 이중창으로 교체해 외풍·소음·결로 문제를 개선하고, 거주 중 시공으로 생활 불편을 최소화하며 단열과 난방 효율을 크게 향상시킨 현장입니다.',
    area: '132㎡ (40평형)',
    window_count: '15개',
    duration: '2일',
    features: ['이중창 교체', '브론즈 로이(Low-E) 복층유리', '주방 발코니창호', '거주 중 시공'],
    review: '겨울에 외풍이 심해서 고민이었는데, 이중창으로 교체하고 나니 확실히 따뜻해졌어요. 거주하면서 시공했는데 불편함 없이 잘 진행됐습니다.',
    thumbnail_url: '/images/portfolio/cheongdo-house/thumbnail.jpg',
    before_url: '/images/portfolio/cheongdo-house/before-1.jpg',
    after_url: '/images/portfolio/cheongdo-house/after-1.jpg',
    gallery_urls: [
      '/images/portfolio/cheongdo-house/before-1.jpg',
      '/images/portfolio/cheongdo-house/before-2.jpg',
      '/images/portfolio/cheongdo-house/after-1.jpg',
      '/images/portfolio/cheongdo-house/after-2.jpg',
    ],
  },
  {
    id: 'towol-sungwon',
    slug: 'towol-sungwon',
    title: '경남 아파트 창호 교체',
    location: '경남 소재',
    building_type: '아파트',
    product: '시스템창호',
    rating: 5,
    date: '2024년 11월',
    description: '이사 전 올수리 과정에서 진행한 아파트 창호 교체 공사. 이사 전 사전 점검을 통해 외풍·소음·결로 문제를 개선하고, 로이 복층유리와 자동손잡이 옵션을 적용해 단열 성능과 사용 편의성을 동시에 높인 시공 사례입니다.',
    area: '105㎡ (32평형)',
    window_count: '14개',
    duration: '1일',
    features: ['KCC 발코니창호', 'LOW-E 로이 복층유리', '자동손잡이(오토핸들)', '이사 전 올수리'],
    review: '올수리하면서 창호도 같이 교체했어요. 자동손잡이가 정말 편리하고, 단열도 확실히 좋아졌습니다. KCC 제품이라 믿음이 갔어요.',
    thumbnail_url: '/images/portfolio/towol-sungwon/thumbnail.jpg',
    before_url: '/images/portfolio/towol-sungwon/before-1.jpg',
    after_url: '/images/portfolio/towol-sungwon/after-1.jpg',
    gallery_urls: [
      '/images/portfolio/towol-sungwon/before-1.jpg',
      '/images/portfolio/towol-sungwon/before-2.jpg',
      '/images/portfolio/towol-sungwon/after-1.jpg',
      '/images/portfolio/towol-sungwon/after-2.jpg',
    ],
  },
  {
    id: 'dongwon-royalduke',
    slug: 'dongwon-royalduke',
    title: '부산 아파트 창호 교체',
    location: '부산 소재',
    building_type: '아파트',
    product: '시스템창호',
    rating: 5,
    date: '2024년 12월',
    description: '비거주 세대 아파트 창호 교체 공사. 맞춤 제작을 통해 기밀성과 단열 성능을 강화하고, 외풍 차단 및 에너지 효율 개선에 중점을 둔 시공입니다.',
    area: '116㎡ (35평형)',
    window_count: '10개',
    duration: '1일',
    features: ['KCC 창호', '로이(Low-E) 복층유리', '아르곤 가스 충진', '맞춤 제작'],
    review: '아르곤 가스 충진까지 해주셔서 단열 효과가 확실합니다. 맞춤 제작으로 딱 맞게 시공해주셔서 기밀성도 좋아요.',
    thumbnail_url: '/images/portfolio/dongwon-royalduke/thumbnail.jpg',
    before_url: '/images/portfolio/dongwon-royalduke/before-1.jpg',
    after_url: '/images/portfolio/dongwon-royalduke/after-1.jpg',
    gallery_urls: [
      '/images/portfolio/dongwon-royalduke/before-1.jpg',
      '/images/portfolio/dongwon-royalduke/before-2.jpg',
      '/images/portfolio/dongwon-royalduke/after-1.jpg',
      '/images/portfolio/dongwon-royalduke/after-2.jpg',
    ],
  },
];

export default async function PortfolioPage() {
  const dbPortfolios = await getPublishedPortfolios();

  // DB 데이터와 하드코딩 데이터 합치기 (DB 데이터가 우선)
  const portfolios = [...dbPortfolios, ...hardcodedPortfolios];

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              우리 집도 이렇게 바꿀 수 있을까요?
            </h2>
            <p className="text-sm sm:text-base text-sky-100 mb-6 sm:mb-8 px-2">
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
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 rounded-xl">
                <Link href="/support/inquiry">상담 신청</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
