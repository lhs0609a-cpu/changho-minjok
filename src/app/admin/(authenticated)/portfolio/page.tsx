import Link from 'next/link';
import { getAllPortfoliosFromDB } from '@/lib/portfolio-db';
import { deletePortfolioAction } from './actions';
import { Plus, Edit, Eye, EyeOff, Trash2, FolderOpen, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPortfolioPage() {
  const portfolios = await getAllPortfoliosFromDB();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">시공사례 관리</h1>
          <p className="text-gray-500 mt-1">시공 포트폴리오를 관리합니다.</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-xl hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 시공사례
        </Link>
      </div>

      {/* Content */}
      {portfolios.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
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
                        title="수정"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/portfolio/${item.slug}`}
                        target="_blank"
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="미리보기"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <form action={deletePortfolioAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <button
                          type="submit"
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="삭제"
                          onClick={(e) => {
                            if (!confirm('정말 삭제하시겠습니까?')) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
