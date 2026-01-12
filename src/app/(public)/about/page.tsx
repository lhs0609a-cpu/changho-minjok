import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Factory, Award, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = {
  title: '회사소개',
  description: '창호의 민족은 10년의 제조 노하우와 스마트 팩토리 기술력으로 고품질 창호를 합리적인 가격에 제공합니다.',
};

const values = [
  {
    icon: Factory,
    title: '제조 혁신',
    description: '최신 자동화 설비와 숙련된 장인의 기술력이 만나 최고의 품질을 만들어냅니다.',
  },
  {
    icon: Target,
    title: '품질 우선',
    description: '모든 제품은 엄격한 품질 검사를 거쳐 출하되며, 오랜 시간 그 가치를 유지합니다.',
  },
  {
    icon: Users,
    title: '고객 중심',
    description: '고객의 니즈를 최우선으로 생각하며, 맞춤형 솔루션을 제공합니다.',
  },
  {
    icon: Award,
    title: '신뢰 구축',
    description: '투명한 가격 정책과 성실한 시공으로 고객의 신뢰를 쌓아갑니다.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              화려한 광고보다
              <br />
              <span className="text-blue-400">공장의 기계 소리</span>를 믿습니다
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              창호의 민족은 (주)현경시스템의 영업 브랜드로,
              <br />
              10년간 쌓아온 제조 역량을 바탕으로 고품질 창호를 직접 생산하고 공급합니다.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/about/factory">
                공장 둘러보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
                브랜드 스토리
              </h2>
            </AnimatedSection>

            <div className="space-y-12">
              <AnimatedSection>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src="/images/about/ceo-photo.png"
                        alt="창호의 민족 대표"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      01. 우리의 철학
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      2015년, 작은 공장에서 시작한 현경시스템은 오직 품질 하나만을 생각했습니다.
                      화려한 마케팅보다 묵묵히 좋은 제품을 만드는 것, 그것이 우리의 철학입니다.
                      10년이 지난 지금도 우리는 매일 아침 공장의 기계 소리와 함께 하루를 시작합니다.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    02. 기술 혁신
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    숙련된 장인의 손기술에 첨단 자동화 기술을 더했습니다.
                    2024년, 3,500평 규모의 스마트 팩토리를 구축하여
                    TPS 단열 간봉 자동화 라인을 포함한 전 공정 자동화를 완성했습니다.
                    이제 더 빠르고, 더 정밀하고, 더 일관된 품질의 창호를 생산합니다.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    03. 우리의 약속
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    &ldquo;창호의 민족&rdquo;이라는 이름에는 대한민국 창호의 새로운 기준이 되겠다는
                    우리의 다짐이 담겨 있습니다. 제조-영업-시공 원스톱 서비스로
                    중간 마진 없이 합리적인 가격과 책임 있는 A/S를 약속합니다.
                  </p>
                </div>
              </AnimatedSection>

              {/* Team Photo */}
              <AnimatedSection delay={0.3}>
                <div className="mt-8">
                  <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/about/team-photo.png"
                      alt="창호의 민족 팀원들"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        함께 만들어가는 창호의 민족
                      </h3>
                      <p className="text-white/80 text-sm md:text-base">
                        숙련된 기술자들이 한마음으로 최고의 품질을 만들어갑니다.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">
              Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              핵심 가치
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              직접 눈으로 확인하세요
            </h2>
            <p className="text-gray-600 mb-8">
              견적만 비교하지 마시고, 공장을 방문해 주십시오.
              <br />
              창호의 민족의 제조 역량을 직접 확인하실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/support/tour">공장 견학 예약</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about/factory">공장 소개 보기</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
