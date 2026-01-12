import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyAdmin } from '@/lib/auth';
import { getAllPortfoliosFromDB } from '@/lib/portfolio-db';
import { logoutAction } from '../actions';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Home, MessageSquare } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPortfolioPage() {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect('/admin');
  }

  const portfolios = await getAllPortfoliosFromDB();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <Home className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">시공사례 관리</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2"
            >
              <MessageSquare className="w-4 h-4" />
              상담신청
            </Link>
            <Link
              href="/admin/portfolio/new"
              className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              새 시공사례
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

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {portfolios.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <p className="text-gray-500 mb-4">등록된 시공사례가 없습니다.</p>
            <Link
              href="/admin/portfolio/new"
              className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              첫 시공사례 등록하기
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">순서</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">제목</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">지역</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">제품</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">상태</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {portfolios.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">{item.display_order}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.product === '시스템창호' ? 'bg-amber-100 text-amber-700' :
                        item.product === '하이샤시' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-sky-100 text-sky-700'
                      }`}>
                        {item.product}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.published ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                          <Eye className="w-4 h-4" />
                          공개
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400 text-sm">
                          <EyeOff className="w-4 h-4" />
                          비공개
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/portfolio/${item.id}`}
                          className="p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/portfolio/${item.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
