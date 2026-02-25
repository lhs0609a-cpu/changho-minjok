import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { getPublishedPortfolios } from '@/lib/portfolio-db';

const productColors: Record<string, string> = {
  '시스템창호': 'bg-[#FF6F0F]',
  '알루미늄 창호': 'bg-[#2AC1BC]',
  'PVC창호': 'bg-[#EF4444]',
  '이중창': 'bg-[#E5630D]',
  '발코니 창호': 'bg-[#1FA9A5]',
};

export default async function PortfolioPreviewSection() {
  const allPortfolios = await getPublishedPortfolios();
  const portfolios = allPortfolios.slice(0, 4);

  if (portfolios.length === 0) {
    return null;
  }

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
                <div className="relative overflow-hidden rounded-2xl bg-[#F5F5F5] aspect-[4/3] mb-4 border-2 border-[#EEEEEE] group-hover:border-[#FF6F0F] transition-colors">
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

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold">자세히 보기</span>
                  </div>

                  {/* Badge - Building Type */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#E0F7F6] rounded-lg text-xs font-bold text-[#2AC1BC]">
                    {item.building_type}
                  </div>

                  {/* Badge - Product Type */}
                  <div className={`absolute top-3 right-3 px-3 py-1.5 ${productColors[item.product] || 'bg-gray-500'} rounded-lg text-xs font-bold text-white`}>
                    {item.product}
                  </div>
                </div>

                <h3 className="font-bold text-[#1E1E1E] group-hover:text-[#FF6F0F] transition-colors mb-2 line-clamp-1">
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
            className="border-2 border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white font-bold rounded-xl px-8"
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
