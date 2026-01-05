import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Star, ArrowLeft, ArrowRight, Home, Ruler, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';
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
    '시스템창호': { bg: 'bg-amber-100', text: 'text-amber-700' },
    '하이샤시': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    'PVC창호': { bg: 'bg-sky-100', text: 'text-sky-700' },
  };

  const colors = productColors[portfolio.product] || productColors['PVC창호'];
  const hasBeforeAfter = portfolio.before_url && portfolio.after_url;
  const hasGallery = portfolio.gallery_urls && portfolio.gallery_urls.length > 0;

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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={portfolio.before_url!}
                      alt="시공 전"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 text-white text-sm rounded-lg">
                      Before
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={portfolio.after_url!}
                      alt="시공 후"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-sky-500 text-white text-sm rounded-lg">
                      After
                    </div>
                  </div>
                </div>
              ) : portfolio.thumbnail_url ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <Image
                    src={portfolio.thumbnail_url}
                    alt={portfolio.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
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
              )}
            </AnimatedSection>

            {/* Gallery */}
            {hasGallery && (
              <AnimatedSection delay={0.1}>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {portfolio.gallery_urls!.map((src, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={src}
                        alt={`${portfolio.title} - ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}
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
                    {portfolio.features.map((feature) => (
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
