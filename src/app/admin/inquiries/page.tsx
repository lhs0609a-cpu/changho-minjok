import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyAdmin } from '@/lib/auth';
import { getAllInquiries, getInquiryStats } from '@/lib/inquiry-db';
import { logoutAction } from '../actions';
import {
  MessageSquare,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
  Home,
  FolderOpen,
  Phone,
  Mail
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusConfig = {
  pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  in_progress: { label: '처리중', color: 'bg-blue-100 text-blue-700', icon: Eye },
  completed: { label: '완료', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  cancelled: { label: '취소', color: 'bg-gray-100 text-gray-500', icon: XCircle },
};

const inquiryTypeLabels: Record<string, string> = {
  estimate: '견적 문의',
  product: '제품 문의',
  installation: '시공 문의',
  as: 'A/S 문의',
  other: '기타',
};

export default async function AdminInquiriesPage() {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect('/admin');
  }

  const [inquiries, stats] = await Promise.all([
    getAllInquiries(),
    getInquiryStats(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <Home className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">상담신청 관리</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/portfolio"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2"
            >
              <FolderOpen className="w-4 h-4" />
              시공사례
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 px-3 py-2"
              >
                <LogOut className="w-4 h-4" />
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">전체</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-yellow-600">대기중</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-blue-600">처리중</p>
            <p className="text-2xl font-bold text-blue-700">{stats.in_progress}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-green-600">완료</p>
            <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        {inquiries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">접수된 상담신청이 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">신청일시</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">이름</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">연락처</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">문의유형</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">상태</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((item) => {
                  const status = statusConfig[item.status] || statusConfig.pending;
                  const StatusIcon = status.icon;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        {item.address && (
                          <div className="text-sm text-gray-500 truncate max-w-[150px]">{item.address}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <a href={`tel:${item.phone}`} className="flex items-center gap-1 text-sm text-gray-900 hover:text-sky-600">
                            <Phone className="w-3 h-3" />
                            {item.phone}
                          </a>
                          {item.email && (
                            <a href={`mailto:${item.email}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-sky-600">
                              <Mail className="w-3 h-3" />
                              {item.email}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {inquiryTypeLabels[item.inquiry_type] || item.inquiry_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          <Link
                            href={`/admin/inquiries/${item.id}`}
                            className="px-3 py-1.5 text-sm text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          >
                            상세보기
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
