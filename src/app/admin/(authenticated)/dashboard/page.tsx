import Link from 'next/link';
import { getInquiryStats, getAllInquiries } from '@/lib/inquiry-db';
import { getTodayStats } from '@/lib/analytics-db';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Phone,
  Calendar,
  FolderOpen,
  Users,
  Calculator,
  Settings,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusConfig = {
  pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-700' },
  in_progress: { label: '처리중', color: 'bg-blue-100 text-blue-700' },
  completed: { label: '완료', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '취소', color: 'bg-gray-100 text-gray-500' },
};

const quickLinks = [
  { href: '/admin/portfolio/new', label: '시공사례 등록', icon: FolderOpen, color: 'bg-sky-500' },
  { href: '/admin/inquiries', label: '상담신청 관리', icon: MessageSquare, color: 'bg-amber-500' },
  { href: '/admin/customers', label: '고객관리', icon: Users, color: 'bg-emerald-500' },
  { href: '/admin/estimates', label: '견적 관리', icon: Calculator, color: 'bg-purple-500' },
  { href: '/admin/settings', label: '설정', icon: Settings, color: 'bg-gray-500' },
];

export default async function AdminDashboardPage() {
  const [stats, todayStats, recentInquiries] = await Promise.all([
    getInquiryStats(),
    getTodayStats(),
    getAllInquiries().then((data) => data.slice(0, 5)),
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-500 mt-1">창호의민족 관리자 페이지에 오신 것을 환영합니다.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-sky-600" />
            </div>
            <span className="text-xs text-gray-400">오늘</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{todayStats.todayInquiries}</p>
          <p className="text-sm text-gray-500 mt-1">오늘 상담신청</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs text-gray-400">이번 달</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{todayStats.thisMonthInquiries}</p>
          <p className="text-sm text-gray-500 mt-1">이번달 상담신청</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-xs text-gray-400">처리 필요</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{todayStats.pendingCount}</p>
          <p className="text-sm text-gray-500 mt-1">대기중인 상담</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs text-gray-400">전체</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
          <p className="text-sm text-gray-500 mt-1">처리 완료</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">최근 상담신청</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p>접수된 상담신청이 없습니다.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentInquiries.map((inquiry) => {
                const status = statusConfig[inquiry.status] || statusConfig.pending;
                return (
                  <Link
                    key={inquiry.id}
                    href={`/admin/inquiries/${inquiry.id}`}
                    className="p-4 hover:bg-gray-50 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-gray-600">
                          {inquiry.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{inquiry.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {inquiry.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(inquiry.created_at).toLocaleDateString('ko-KR', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">빠른 바로가기</h2>
          </div>
          <div className="p-4 space-y-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 ${link.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">처리 현황</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-gray-50">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500">전체</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-yellow-50">
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            <p className="text-sm text-yellow-600">대기중</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-blue-50">
            <p className="text-2xl font-bold text-blue-700">{stats.in_progress}</p>
            <p className="text-sm text-blue-600">처리중</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-green-50">
            <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
            <p className="text-sm text-green-600">완료</p>
          </div>
        </div>
      </div>
    </div>
  );
}
