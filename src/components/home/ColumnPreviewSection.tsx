import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Eye, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { getPublishedColumns } from '@/lib/column-db';

export default async function ColumnPreviewSection() {
  const allColumns = await getPublishedColumns();
  const columns = allColumns.slice(0, 3);

  if (columns.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-badge">Column</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E1E1E] mt-4 mb-4 tracking-tight">
            창호 전문 칼럼
          </h2>
          <p className="text-[#767676] max-w-2xl mx-auto">
            창호 선택부터 시공까지, 전문가의 노하우를 확인해보세요.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {columns.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <Link href={`/column/${item.slug}`} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden border-2 border-[#EEEEEE] hover:border-[#2AC1BC] transition-all hover:-translate-y-1 h-full flex flex-col">
                  {item.thumbnail_url ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={item.thumbnail_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-[#2AC1BC] text-white text-xs font-bold rounded-lg">
                        {item.category}
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-[#E0F7F6] to-[#2AC1BC]/20 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-[#2AC1BC]/40" />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-[#2AC1BC] text-white text-xs font-bold rounded-lg">
                        {item.category}
                      </div>
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-[#1E1E1E] group-hover:text-[#2AC1BC] transition-colors mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#767676] line-clamp-2 mb-4 flex-1">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#C4C4C4]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.created_at).toLocaleDateString('ko-KR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.view_count}
                        </span>
                      </div>
                      <span className="text-[#2AC1BC] font-bold flex items-center gap-1">
                        읽기
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-[#2AC1BC] text-[#2AC1BC] hover:bg-[#2AC1BC] hover:text-white font-bold rounded-xl px-8"
          >
            <Link href="/column">
              전체 칼럼 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
