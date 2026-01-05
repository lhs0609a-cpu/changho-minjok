import { Metadata } from 'next';
import Link from 'next/link';
import { Bell, ChevronRight, Pin } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = {
  title: '공지사항',
  description: '창호의 민족의 공지사항과 소식을 확인하세요.',
};

const notices = [
  {
    id: 1,
    title: '2024년 연말 시공 일정 안내',
    date: '2024-12-15',
    isPinned: true,
    category: '안내',
  },
  {
    id: 2,
    title: '스마트 팩토리 신축 이전 완료',
    date: '2024-09-20',
    isPinned: true,
    category: '소식',
  },
  {
    id: 3,
    title: '창호의 민족 공식 홈페이지 오픈',
    date: '2024-03-01',
    isPinned: false,
    category: '소식',
  },
  {
    id: 4,
    title: '겨울철 결로 방지 창호 교체 이벤트',
    date: '2024-11-01',
    isPinned: false,
    category: '이벤트',
  },
  {
    id: 5,
    title: 'TPS 단열간봉 자체 생산 라인 가동 시작',
    date: '2024-06-15',
    isPinned: false,
    category: '소식',
  },
  {
    id: 6,
    title: '추석 연휴 고객센터 운영 안내',
    date: '2024-09-10',
    isPinned: false,
    category: '안내',
  },
  {
    id: 7,
    title: 'ISO 9001 품질경영시스템 인증 획득',
    date: '2023-02-15',
    isPinned: false,
    category: '소식',
  },
];

const categoryColors: Record<string, string> = {
  '안내': 'bg-sky-100 text-sky-700',
  '소식': 'bg-emerald-100 text-emerald-700',
  '이벤트': 'bg-amber-100 text-amber-700',
};

export default function NoticePage() {
  const pinnedNotices = notices.filter(n => n.isPinned);
  const normalNotices = notices.filter(n => !n.isPinned);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="section-badge">Notice</span>
            <h1 className="page-hero-title">공지사항</h1>
            <p className="page-hero-subtitle">
              창호의 민족의 소식과 안내를 확인하세요.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Notice List */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Pinned Notices */}
            {pinnedNotices.length > 0 && (
              <AnimatedSection className="mb-8">
                <div className="space-y-3">
                  {pinnedNotices.map((notice) => (
                    <Link
                      key={notice.id}
                      href={`/support/notice/${notice.id}`}
                      className="block bg-sky-50 rounded-xl border border-sky-100 p-5 hover:border-sky-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Pin className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[notice.category]}`}>
                                {notice.category}
                              </span>
                            </div>
                            <h3 className="font-semibold text-gray-900">{notice.title}</h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                          <span className="text-sm">{notice.date}</span>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* Normal Notices */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {normalNotices.map((notice, index) => (
                  <Link
                    key={notice.id}
                    href={`/support/notice/${notice.id}`}
                    className={`block p-5 hover:bg-gray-50 transition-colors ${
                      index < normalNotices.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[notice.category]}`}>
                              {notice.category}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900">{notice.title}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                        <span className="text-sm hidden sm:block">{notice.date}</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedSection>

            {/* Pagination Placeholder */}
            <AnimatedSection delay={0.2} className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-lg bg-sky-500 text-white font-medium">1</button>
                <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-sky-300">2</button>
                <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-sky-300">3</button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
