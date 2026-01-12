import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';

const products: Record<string, {
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  advantages: { title: string; description: string }[];
  color: string;
  image: string;
}> = {
  pvc: {
    name: 'PVC 창호',
    subtitle: '뛰어난 단열성과 가성비의 기본 창호',
    description: 'PVC 창호는 뛰어난 단열 성능과 합리적인 가격으로 가장 많은 사랑을 받는 창호입니다. 다양한 컬러와 디자인으로 어떤 인테리어에도 자연스럽게 어울리며, 유지관리가 쉬워 장기간 사용에도 변함없는 성능을 유지합니다.',
    features: ['우수한 단열성능', '다양한 컬러 선택', '경제적인 가격', '손쉬운 유지관리', '결로 방지', '방음 효과'],
    specs: [
      { label: '프레임 두께', value: '60mm / 70mm / 80mm' },
      { label: '유리', value: '복층유리 (22mm / 24mm)' },
      { label: '열관류율', value: '1.0 ~ 1.4 W/m²K' },
      { label: '기밀성', value: '1등급' },
    ],
    advantages: [
      { title: '경제적', description: '합리적인 가격대로 가성비 최고의 선택입니다.' },
      { title: '다양한 컬러', description: '화이트, 그레이, 우드톤 등 다양한 컬러 선택이 가능합니다.' },
      { title: '쉬운 관리', description: '별도의 관리 없이도 오랜 시간 깨끗하게 유지됩니다.' },
    ],
    color: 'sky',
    image: '/images/products/pvc-window.png',
  },
  hisash: {
    name: '하이샤시',
    subtitle: '알루미늄과 PVC의 완벽한 조화',
    description: '하이샤시는 외부는 알루미늄, 내부는 PVC로 구성된 복합 창호입니다. 알루미늄의 내구성과 PVC의 단열성을 동시에 갖추어, 오래 사용해도 변형 없이 뛰어난 성능을 유지합니다.',
    features: ['AL+PVC 복합 구조', '뛰어난 내구성', '향상된 단열성능', '세련된 디자인', '다양한 개폐 방식', '긴 수명'],
    specs: [
      { label: '프레임 구조', value: 'AL + PVC 복합' },
      { label: '유리', value: '복층/삼중 유리' },
      { label: '열관류율', value: '0.9 ~ 1.2 W/m²K' },
      { label: '기밀성', value: '1등급' },
    ],
    advantages: [
      { title: '복합 소재', description: '알루미늄의 강도와 PVC의 단열성을 모두 갖췄습니다.' },
      { title: '슬림 프레임', description: '더 넓은 유리면으로 개방감을 극대화합니다.' },
      { title: '고급 외관', description: '세련된 디자인으로 건물의 가치를 높입니다.' },
    ],
    color: 'emerald',
    image: '/images/products/hisash-window.png',
  },
  system: {
    name: '시스템창호',
    subtitle: '최고급 기밀성과 단열의 프리미엄 창호',
    description: '시스템창호는 유럽 기술을 바탕으로 한 최고급 창호입니다. 최상의 기밀성과 단열성으로 에너지 효율을 극대화하여, 냉난방비를 획기적으로 절감할 수 있습니다. 패시브하우스 기준에도 적합합니다.',
    features: ['최고급 기밀성', '탁월한 단열성능', '방음 효과', '에너지 절감', '결로 완벽 차단', '유럽 인증'],
    specs: [
      { label: '프레임 두께', value: '70mm / 85mm / 92mm' },
      { label: '유리', value: '삼중유리 (42mm / 48mm)' },
      { label: '열관류율', value: '0.7 ~ 0.9 W/m²K' },
      { label: '기밀성', value: '특등급' },
    ],
    advantages: [
      { title: '최고의 단열', description: '패시브하우스 기준에 부합하는 단열 성능입니다.' },
      { title: '에너지 절감', description: '냉난방비를 최대 40%까지 절감할 수 있습니다.' },
      { title: '프리미엄 품질', description: '유럽 인증을 받은 최고급 자재만 사용합니다.' },
    ],
    color: 'amber',
    image: '/images/products/system-window.png',
  },
  glass: {
    name: '유리 종류',
    subtitle: '용도에 맞는 최적의 유리 선택',
    description: '창호의 성능은 유리에 의해 크게 좌우됩니다. 복층유리, 로이유리, 삼중유리 등 다양한 옵션을 제공하여 고객의 환경과 요구에 맞는 최적의 유리를 선택할 수 있습니다.',
    features: ['복층유리', '로이(Low-E) 유리', '삼중유리', '강화유리', '접합유리', '자외선 차단'],
    specs: [
      { label: '복층유리', value: '22mm / 24mm' },
      { label: '삼중유리', value: '42mm / 48mm' },
      { label: '로이유리', value: '더블/트리플 코팅' },
      { label: '아르곤 가스', value: '충전 가능' },
    ],
    advantages: [
      { title: '단열 성능', description: '로이유리와 아르곤 가스로 단열 성능을 극대화합니다.' },
      { title: '결로 방지', description: '삼중유리로 결로를 완벽하게 차단합니다.' },
      { title: '안전성', description: '강화유리와 접합유리로 안전을 보장합니다.' },
    ],
    color: 'cyan',
    image: '/images/products/uv-protection.png',
  },
  tps: {
    name: 'TPS 단열간봉',
    subtitle: '자체 생산하는 프리미엄 단열간봉',
    description: 'TPS(Thermo Plastic Spacer) 단열간봉은 기존 알루미늄 간봉 대비 단열 성능이 뛰어나 결로 방지에 탁월합니다. 창호의 민족은 자체 스마트 팩토리에서 TPS 간봉을 직접 생산하여 품질과 가격 모두 경쟁력을 갖추고 있습니다.',
    features: ['자체 생산', '결로 방지', '향상된 단열', '장기 내구성', '유연한 소재', '친환경'],
    specs: [
      { label: '소재', value: 'Thermo Plastic Spacer' },
      { label: '열전도율', value: '0.14 W/mK (알루미늄 대비 1/1000)' },
      { label: '색상', value: '블랙 / 그레이' },
      { label: '생산', value: '자체 스마트 팩토리' },
    ],
    advantages: [
      { title: '결로 차단', description: '알루미늄 대비 결로 발생률 90% 이상 감소합니다.' },
      { title: '자체 생산', description: '스마트 팩토리에서 직접 생산하여 품질을 보장합니다.' },
      { title: '비용 절감', description: '자체 생산으로 중간 마진 없이 합리적인 가격을 제공합니다.' },
    ],
    color: 'purple',
    image: '/images/products/tps-spacer.png',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];
  if (!product) return { title: '제품을 찾을 수 없습니다' };
  return {
    title: product.name,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    notFound();
  }

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    sky: { bg: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-200' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  };

  const colors = colorClasses[product.color] || colorClasses.sky;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              제품 목록으로
            </Link>
            <span className={`section-badge ${colors.bg} ${colors.text}`}>{product.name}</span>
            <h1 className="page-hero-title">{product.name}</h1>
            <p className="page-hero-subtitle">{product.subtitle}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Image */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>
            </AnimatedSection>

            {/* Features */}
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className={`w-5 h-5 ${colors.text}`} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="section-header">
              <h2 className="section-title">제품 사양</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-4">
              {product.specs.map((spec, index) => (
                <AnimatedSection key={spec.label} delay={index * 0.05}>
                  <div className={`p-4 bg-white rounded-xl border ${colors.border}`}>
                    <span className="text-sm text-gray-500">{spec.label}</span>
                    <p className="font-semibold text-gray-900 mt-1">{spec.value}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="section-header">
              <h2 className="section-title">주요 장점</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {product.advantages.map((adv, index) => (
                <AnimatedSection key={adv.title} delay={index * 0.1}>
                  <div className="card-clean h-full">
                    <h3 className={`text-lg font-semibold mb-2 ${colors.text}`}>{adv.title}</h3>
                    <p className="text-gray-600">{adv.description}</p>
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
              {product.name}가 궁금하신가요?
            </h2>
            <p className="text-sky-100 mb-8">
              무료 견적을 통해 정확한 비용을 확인하세요.
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
