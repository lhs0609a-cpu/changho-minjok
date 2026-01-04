import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = {
  title: '제품소개',
  description: 'PVC창호, 하이샤시, 시스템창호 등 다양한 창호 제품을 소개합니다. 고객의 니즈에 맞는 최적의 창호 솔루션을 제공합니다.',
};

const productCategories = [
  {
    slug: 'pvc',
    name: 'PVC 창호',
    description: '뛰어난 단열성과 가성비를 갖춘 기본 창호입니다. 다양한 컬러와 디자인으로 어떤 인테리어에도 어울립니다.',
    features: ['우수한 단열성능', '다양한 컬러 선택', '경제적인 가격', '손쉬운 유지관리'],
    image: '/images/products/pvc.jpg',
    color: 'from-blue-500 to-blue-600',
  },
  {
    slug: 'hisash',
    name: '하이샤시',
    description: '알루미늄의 강도와 PVC의 단열성을 결합한 복합 창호입니다. 내구성과 단열성 모두를 원하는 고객에게 추천합니다.',
    features: ['AL+PVC 복합 구조', '뛰어난 내구성', '향상된 단열성능', '세련된 디자인'],
    image: '/images/products/hisash.jpg',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    slug: 'system',
    name: '시스템창호',
    description: '최고급 기밀성과 단열성을 자랑하는 프리미엄 창호입니다. 에너지 효율을 극대화하여 냉난방비를 절감합니다.',
    features: ['최고급 기밀성', '탁월한 단열성능', '방음 효과', '에너지 절감'],
    image: '/images/products/system.jpg',
    color: 'from-amber-500 to-amber-600',
  },
  {
    slug: 'glass',
    name: '유리 종류',
    description: '복층유리, 로이유리, 삼중유리 등 다양한 유리 옵션을 제공합니다. 용도에 맞는 최적의 유리를 선택하세요.',
    features: ['복층/삼중 유리', '로이(Low-E) 코팅', '강화유리 옵션', '냉난방비 절감'],
    image: '/images/products/glass.jpg',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    slug: 'tps',
    name: 'TPS 단열간봉',
    description: '자체 스마트 팩토리에서 생산하는 TPS 단열간봉입니다. 알루미늄 간봉 대비 단열·결로 방지 성능이 탁월합니다.',
    features: ['자체 생산', '결로 방지', '향상된 단열', '장기 내구성'],
    image: '/images/products/tps.jpg',
    color: 'from-purple-500 to-purple-600',
  },
];

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">
              Products
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
              창호의 민족 제품 라인업
            </h1>
            <p className="text-lg text-gray-600">
              고객의 다양한 니즈에 맞춘 최적의 창호 솔루션을 제공합니다.
              <br />
              모든 제품은 자체 스마트 팩토리에서 직접 생산됩니다.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {productCategories.map((category, index) => (
              <AnimatedSection key={category.slug} delay={index * 0.1}>
                <div
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div
                      className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${category.color} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/30 text-8xl font-bold">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    <ul className="grid grid-cols-2 gap-3 mb-8">
                      {category.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/products/${category.slug}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      자세히 보기
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              어떤 제품이 적합한지 모르시겠나요?
            </h2>
            <p className="text-blue-100 mb-8">
              견적 시뮬레이션을 통해 건물 유형에 맞는 최적의 제품을 추천받으세요.
            </p>
            <Link
              href="/estimate"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              무료 견적 시뮬레이션
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
