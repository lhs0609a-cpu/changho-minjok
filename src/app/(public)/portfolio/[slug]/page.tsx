import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Star, ArrowLeft, ArrowRight, Home, Ruler, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';
import BeforeAfterSlider from '@/components/tools/BeforeAfterSlider';
import { getPortfolioBySlug } from '@/lib/portfolio-db';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) return { title: '시공사례를 찾을 수 없습니다' };
  return {
    title: portfolio.title,
    description: portfolio.description,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    notFound();
  }

  const productColors: Record<string, { bg: string; text: string }> = {
    '시스템창호': { bg: 'bg-[#FFF3E8]', text: 'text-[#FF6F0F]' },
    '알루미늄 창호': { bg: 'bg-[#E0F7F6]', text: 'text-[#2AC1BC]' },
    'PVC창호': { bg: 'bg-[#FEF2F2]', text: 'text-[#EF4444]' },
    '이중창': { bg: 'bg-[#E5630D]/15', text: 'text-[#E5630D]' },
    '발코니 창호': { bg: 'bg-[#1FA9A5]/15', text: 'text-[#1FA9A5]' },
  };

  const colors = productColors[portfolio.product] || productColors['PVC창호'];
  const gallery = (portfolio.gallery_urls || []).filter((url): url is string => typeof url === 'string' && url.length > 0);
  // gallery_urls 구조: [before들..., after들...] (actions.ts에서 [...beforeUrls, ...afterUrls]로 저장)
  // before_url/after_url은 각각 첫 번째 before/after 이미지
  let befores: string[] = [];
  let afters: string[] = [];

  if (gallery.length > 0 && portfolio.before_url && portfolio.after_url) {
    // gallery에서 before_url의 위치를 찾아 before/after 분리
    const afterStartIndex = gallery.indexOf(portfolio.after_url);
    if (afterStartIndex > 0) {
      befores = gallery.slice(0, afterStartIndex);
      afters = gallery.slice(afterStartIndex);
    } else {
      // after_url을 찾지 못하면 before_url/after_url만 사용
      befores = [portfolio.before_url];
      afters = [portfolio.after_url];
    }
  } else if (portfolio.before_url && portfolio.after_url) {
    befores = [portfolio.before_url];
    afters = [portfolio.after_url];
  }
  const hasBeforeAfter = befores.length > 0 && afters.length > 0;

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#EF4444] mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              시공사례 목록으로
            </Link>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{portfolio.building_type}</span>
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
              {hasBeforeAfter ? (
                <div className="space-y-4">
                  {/* 메인 Before/After 인터랙티브 슬라이더 */}
                  <BeforeAfterSlider
                    beforeSrc={befores[0]}
                    afterSrc={afters[0]}
                    beforeAlt="시공 전"
                    afterAlt="시공 후"
                  />
                  <p className="text-center text-[#767676] text-sm">슬라이더를 좌우로 드래그하여 비교해보세요</p>

                  {/* 추가 사진들 (2,3번째) */}
                  {(befores.length > 1 || afters.length > 1) && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {befores.slice(1).map((src, i) => (
                        <div key={`b-${i}`} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                          <Image src={src} alt={`시공 전 ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 text-white text-xs rounded">Before {i + 2}</div>
                        </div>
                      ))}
                      {afters.slice(1).map((src, i) => (
                        <div key={`a-${i}`} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                          <Image src={src} alt={`시공 후 ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#EF4444] text-white text-xs rounded">After {i + 2}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : portfolio.thumbnail_url ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <Image src={portfolio.thumbnail_url} alt={portfolio.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Home className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Before</p>
                    </div>
                  </div>
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#FEF2F2] to-[#FEF2F2] rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Home className="w-12 h-12 text-[#EF4444]/30 mx-auto mb-2" />
                      <p className="text-[#EF4444]/40 text-sm">After</p>
                    </div>
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Description */}
              <div className="lg:col-span-2">
                <AnimatedSection>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">시공 내용</h2>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {portfolio.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {portfolio.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#EF4444]" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Review */}
                {portfolio.review && (
                  <AnimatedSection delay={0.1}>
                    <div className="bg-[#FEF2F2] rounded-2xl p-6 border border-[#EF4444]/10">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(portfolio.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#FF6F0F] text-[#FF6F0F]" />
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
                          <p className="font-medium text-gray-900">{portfolio.area}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="icon-container icon-container-sky">
                          <Ruler className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">창호 개수</p>
                          <p className="font-medium text-gray-900">{portfolio.window_count}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="icon-container icon-container-sky">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">시공 기간</p>
                          <p className="font-medium text-gray-900">{portfolio.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100 my-6" />

                    <Button asChild className="w-full bg-[#EF4444] hover:bg-[#DC2626]">
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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
              비슷한 시공을 원하시나요?
            </h2>
            <p className="text-[#FEF2F2] text-sm sm:text-base mb-6 sm:mb-8">
              무료 견적을 통해 예상 비용을 확인하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-[#EF4444] hover:bg-[#FEF2F2] rounded-xl">
                <Link href="/estimate">
                  무료 견적받기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#EF4444] rounded-xl">
                <Link href="/support/inquiry">상담 신청</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
