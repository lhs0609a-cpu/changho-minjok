import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Star, ArrowLeft, ArrowRight, Home, Ruler, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

const portfolios: Record<string, {
  title: string;
  location: string;
  buildingType: string;
  product: string;
  rating: number;
  date: string;
  description: string;
  details: {
    area: string;
    windowCount: string;
    duration: string;
    features: string[];
  };
  review?: string;
}> = {
  'gangnam-apartment-1': {
    title: '강남 OO아파트 전체 교체',
    location: '서울 강남구',
    buildingType: '아파트',
    product: '시스템창호',
    rating: 5,
    date: '2024년 12월',
    description: '30년 된 노후 아파트의 전체 창호를 시스템창호로 교체한 사례입니다. 기존 알루미늄 창호에서 발생하던 결로와 외풍 문제를 완벽히 해결하고, 단열 성능을 대폭 개선하였습니다.',
    details: {
      area: '84㎡ (34평형)',
      windowCount: '12개',
      duration: '1일',
      features: ['시스템창호 전체 교체', '삼중유리 적용', 'TPS 단열간봉', '로이유리 코팅'],
    },
    review: '결로가 심해서 매년 겨울마다 고생했는데, 창호 교체 후 결로가 완전히 사라졌어요. 난방비도 눈에 띄게 줄었고, 방음도 훨씬 좋아졌습니다. 시공도 하루 만에 깔끔하게 마무리해주셔서 감사해요.',
  },
  'suwon-villa-1': {
    title: '수원 OO빌라 시스템창호',
    location: '경기 수원시',
    buildingType: '빌라',
    product: '시스템창호',
    rating: 5,
    date: '2024년 11월',
    description: '20년 된 빌라 창호를 프리미엄 시스템창호로 교체한 사례입니다. 층간 소음이 심한 위치라 방음에 특히 신경 써서 시공하였습니다.',
    details: {
      area: '66㎡ (26평형)',
      windowCount: '8개',
      duration: '1일',
      features: ['시스템창호', '삼중유리', '방음 특화', 'TPS 단열간봉'],
    },
    review: '도로변이라 소음이 정말 심했는데, 창호 교체 후 조용해져서 너무 좋아요. 단열도 확실히 달라졌습니다.',
  },
  'incheon-house-1': {
    title: '인천 단독주택 하이샤시',
    location: '인천 연수구',
    buildingType: '단독주택',
    product: '하이샤시',
    rating: 5,
    date: '2024년 11월',
    description: '신축 단독주택에 하이샤시를 적용한 사례입니다. 대형 창을 통한 개방감과 에너지 효율을 동시에 달성하였습니다.',
    details: {
      area: '165㎡ (50평형)',
      windowCount: '18개',
      duration: '2일',
      features: ['하이샤시 전체', '대형 픽스창', '복층유리', '고급 핸들'],
    },
    review: '처음 집 지으면서 창호 선택이 고민이었는데, 하이샤시로 결정하길 정말 잘했어요. 디자인도 고급스럽고 단열도 좋습니다.',
  },
  'bundang-apartment-1': {
    title: '분당 OO아파트 리모델링',
    location: '경기 성남시',
    buildingType: '아파트',
    product: 'PVC창호',
    rating: 4,
    date: '2024년 10월',
    description: '25년 된 아파트 리모델링과 함께 PVC창호로 전체 교체한 사례입니다. 합리적인 가격으로 단열과 방음 성능을 크게 개선하였습니다.',
    details: {
      area: '102㎡ (42평형)',
      windowCount: '14개',
      duration: '1일',
      features: ['PVC창호 전체', '복층유리', 'TPS 단열간봉', '그레이 컬러'],
    },
    review: '가성비 좋게 창호 교체했어요. PVC인데도 단열이 확실히 좋아졌고, 그레이 컬러가 인테리어랑 잘 어울려요.',
  },
  'ilsan-apartment-1': {
    title: '일산 OO아파트 전체 교체',
    location: '경기 고양시',
    buildingType: '아파트',
    product: '하이샤시',
    rating: 5,
    date: '2024년 10월',
    description: '일산 신도시 아파트의 창호를 하이샤시로 전체 교체한 사례입니다. 알루미늄 외장의 고급스러운 외관과 뛰어난 단열 성능을 확보했습니다.',
    details: {
      area: '114㎡ (46평형)',
      windowCount: '16개',
      duration: '1일',
      features: ['하이샤시 전체', '삼중유리', 'TPS 단열간봉', '블랙 프레임'],
    },
    review: '하이샤시 블랙 프레임이 정말 예뻐요. 외관이 확 살아났고, 겨울에도 따뜻합니다.',
  },
  'yongin-villa-1': {
    title: '용인 OO빌라 부분 교체',
    location: '경기 용인시',
    buildingType: '빌라',
    product: 'PVC창호',
    rating: 5,
    date: '2024년 9월',
    description: '결로가 심한 거실과 안방 창호만 부분 교체한 사례입니다. 예산 내에서 효과적으로 문제를 해결했습니다.',
    details: {
      area: '59㎡ (23평형)',
      windowCount: '4개',
      duration: '반나절',
      features: ['PVC창호 부분', '복층유리', 'TPS 단열간봉', '화이트 컬러'],
    },
    review: '전체 교체하기엔 부담스러워서 결로 심한 창만 바꿨는데, 확실히 효과 있어요. 다음엔 나머지도 교체할 예정입니다.',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = portfolios[slug];
  if (!portfolio) return { title: '시공사례를 찾을 수 없습니다' };
  return {
    title: portfolio.title,
    description: portfolio.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(portfolios).map((slug) => ({ slug }));
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = portfolios[slug];

  if (!portfolio) {
    notFound();
  }

  const productColors: Record<string, { bg: string; text: string }> = {
    '시스템창호': { bg: 'bg-amber-100', text: 'text-amber-700' },
    '하이샤시': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    'PVC창호': { bg: 'bg-sky-100', text: 'text-sky-700' },
  };

  const colors = productColors[portfolio.product] || productColors['PVC창호'];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              시공사례 목록으로
            </Link>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{portfolio.buildingType}</span>
              <span className={`text-sm px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>{portfolio.product}</span>
            </div>
            <h1 className="page-hero-title">{portfolio.title}</h1>
            <div className="flex items-center justify-center gap-4 text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {portfolio.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {portfolio.date}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Images */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Home className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Before</p>
                  </div>
                </div>
                <div className="aspect-[4/3] bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Home className="w-12 h-12 text-sky-300 mx-auto mb-2" />
                    <p className="text-sky-400 text-sm">After</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Description */}
              <div className="lg:col-span-2">
                <AnimatedSection>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">시공 내용</h2>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {portfolio.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {portfolio.details.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-sky-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Review */}
                {portfolio.review && (
                  <AnimatedSection delay={0.1}>
                    <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(portfolio.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed italic">
                        &quot;{portfolio.review}&quot;
                      </p>
                      <p className="text-sm text-gray-500 mt-3">- 고객님 후기</p>
                    </div>
                  </AnimatedSection>
                )}
              </div>

              {/* Details Sidebar */}
              <div className="lg:col-span-1">
                <AnimatedSection delay={0.2}>
                  <div className="card-clean sticky top-24">
                    <h3 className="font-semibold text-gray-900 mb-4">시공 정보</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="icon-container icon-container-sky">
                          <Home className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">면적</p>
                          <p className="font-medium text-gray-900">{portfolio.details.area}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="icon-container icon-container-sky">
                          <Ruler className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">창호 개수</p>
                          <p className="font-medium text-gray-900">{portfolio.details.windowCount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="icon-container icon-container-sky">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">시공 기간</p>
                          <p className="font-medium text-gray-900">{portfolio.details.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100 my-6" />

                    <Button asChild className="w-full bg-sky-500 hover:bg-sky-600">
                      <Link href="/estimate">
                        무료 견적 받기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              비슷한 시공을 원하시나요?
            </h2>
            <p className="text-sky-100 mb-8">
              무료 견적을 통해 예상 비용을 확인하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50 rounded-xl">
                <Link href="/estimate">
                  무료 견적받기
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
