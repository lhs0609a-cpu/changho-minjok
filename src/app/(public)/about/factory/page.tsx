import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Factory, Cpu, Shield, Clock, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = {
  title: '공장 소개',
  description: '3,500평 규모의 창호의 민족 스마트 팩토리를 소개합니다. 첨단 자동화 설비와 품질 관리 시스템을 확인하세요.',
};

const features = [
  {
    icon: Factory,
    title: '3,500평 규모',
    description: '경기도에 위치한 대규모 스마트 팩토리에서 전 공정을 직접 관리합니다.',
  },
  {
    icon: Cpu,
    title: '전 공정 자동화',
    description: 'TPS 단열간봉 자동화 라인 포함 최신 자동화 설비로 일관된 품질을 보장합니다.',
  },
  {
    icon: Shield,
    title: '품질 관리 시스템',
    description: '실시간 모니터링과 다단계 검수 과정으로 불량률 0%를 목표로 합니다.',
  },
  {
    icon: Clock,
    title: '빠른 납기',
    description: '하루 30세대 이상 생산 가능한 설비로 신속한 납기를 약속합니다.',
  },
];

const facilities = [
  'PVC 창호 제조 라인',
  '알루미늄 프레임 가공기',
  'TPS 단열간봉 자동화 라인',
  '복층유리 제조 설비',
  '자동 절단기 및 용접기',
  '품질 검사실',
  '자재 창고 (15,000평)',
  '완제품 보관창고',
];

const galleryImages = [
  {
    src: '/images/factory/interior-wide.jpg',
    alt: '공장 내부 전경',
    title: '넓은 작업 공간',
  },
  {
    src: '/images/factory/automation-line.jpg',
    alt: '자동화 생산 라인',
    title: '자동화 설비',
  },
  {
    src: '/images/factory/products-storage.jpg',
    alt: '완제품 보관',
    title: '제품 적재',
  },
  {
    src: '/images/factory/production-floor.jpg',
    alt: '창호 제작 현장',
    title: '제작 현장',
  },
];

export default function FactoryPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-badge">Smart Factory</span>
            <h1 className="page-hero-title">스마트 팩토리</h1>
            <p className="page-hero-subtitle">
              화려한 광고보다 공장의 기계 소리를 믿습니다.
              <br />
              직접 눈으로 확인하세요.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Hero Image - Aerial View */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/factory/aerial-view.jpg"
                  alt="창호의 민족 공장 전경"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Factory className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">경기도 소재</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    3,500평 규모의 스마트 팩토리
                  </h2>
                  <p className="text-white/80 max-w-xl">
                    전 공정 자동화 시스템과 숙련된 장인의 기술력이 만나는 곳
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="section-header">
            <h2 className="section-title">스마트 팩토리의 강점</h2>
            <p className="section-description">
              최신 설비와 숙련된 장인의 기술력이 만나 최고의 품질을 만듭니다.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <div className="card-clean h-full">
                  <div className="icon-container icon-container-sky mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section">
        <div className="container mx-auto px-4">
          <AnimatedSection className="section-header">
            <h2 className="section-title">공장 둘러보기</h2>
            <p className="section-description">
              창호의 민족 스마트 팩토리의 다양한 모습을 확인하세요.
            </p>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto">
            {/* Main Gallery Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {galleryImages.map((image, index) => (
                <AnimatedSection key={image.src} delay={index * 0.1}>
                  <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white font-medium">{image.title}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Bottom Feature Image */}
            <AnimatedSection delay={0.4}>
              <div className="mt-6 relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/factory/exterior-view.jpg"
                  alt="공장 외부 전경"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 flex items-center p-8 md:p-12">
                  <div className="max-w-md">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      직접 방문하여 확인하세요
                    </h3>
                    <p className="text-white/80 text-sm md:text-base mb-4">
                      언제든지 공장 견학을 예약하시고 직접 눈으로 확인해 보세요.
                    </p>
                    <Button asChild size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Link href="/support/tour">
                        견학 예약하기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="section-header">
              <h2 className="section-title">주요 시설</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-4">
              {facilities.map((facility, index) => (
                <AnimatedSection key={facility} delay={index * 0.05}>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-sky-200 transition-colors">
                    <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{facility}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              직접 눈으로 확인하세요
            </h2>
            <p className="text-sky-100 mb-8">
              견적만 비교하지 마시고, 공장을 방문해 주십시오.
              <br />
              창호의 민족의 제조 역량을 직접 확인하실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50 rounded-xl">
                <Link href="/support/tour">
                  공장 견학 예약
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
                <Link href="/estimate">무료 견적받기</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
