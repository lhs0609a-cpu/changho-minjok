import Link from 'next/link';
import { getAllPopups } from '@/lib/popup-db';
import { deletePopupAction, togglePopupStatusAction } from './actions';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Calendar,
  Megaphone,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPopupsPage() {
  const popups = await getAllPopups();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">팝업 관리</h1>
          <p className="text-gray-500 mt-1">홈페이지에 표시되는 팝업을 관리합니다.</p>
        </div>
        <Link
          href="/admin/popups/new"
          className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-xl hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 팝업
        </Link>
      </div>

      {/* Content */}
      {popups.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">등록된 팝업이 없습니다.</p>
          <Link
            href="/admin/popups/new"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            첫 팝업 등록하기
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">순서</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">제목</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">기간</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">상태</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {popups.map((popup) => (
                <tr key={popup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{popup.display_order}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{popup.title}</div>
                    {popup.link_url && (
                      <a
                        href={popup.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-sky-600 hover:underline flex items-center gap-1 mt-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        링크 확인
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {popup.start_date
                        ? new Date(popup.start_date).toLocaleDateString('ko-KR')
                        : '시작일 없음'}
                      {' ~ '}
                      {popup.end_date
                        ? new Date(popup.end_date).toLocaleDateString('ko-KR')
                        : '종료일 없음'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <form action={togglePopupStatusAction}>
                      <input type="hidden" name="id" value={popup.id} />
                      <input type="hidden" name="is_active" value={String(popup.is_active)} />
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                          popup.is_active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {popup.is_active ? (
                          <>
                            <Eye className="w-3 h-3" />
                            활성
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            비활성
                          </>
                        )}
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/popups/${popup.id}`}
                        className="p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="수정"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deletePopupAction}>
                        <input type="hidden" name="id" value={popup.id} />
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
