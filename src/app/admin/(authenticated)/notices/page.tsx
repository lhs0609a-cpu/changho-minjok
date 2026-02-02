import Link from 'next/link';
import { getAllNotices } from '@/lib/notice-db';
import { deleteNoticeAction, toggleNoticePinnedAction, toggleNoticeActiveAction } from './actions';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Bell,
  Pin,
  Calendar,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminNoticesPage() {
  const notices = await getAllNotices();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">공지사항 관리</h1>
          <p className="text-gray-500 mt-1">공지사항을 관리합니다.</p>
        </div>
        <Link
          href="/admin/notices/new"
          className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-xl hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 공지사항
        </Link>
      </div>

      {/* Content */}
      {notices.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">등록된 공지사항이 없습니다.</p>
          <Link
            href="/admin/notices/new"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            첫 공지사항 등록하기
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">제목</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">작성일</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">조회수</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">상태</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {notice.is_pinned && (
                        <span className="text-amber-500">
                          <Pin className="w-4 h-4" />
                        </span>
                      )}
                      <div className="font-medium text-gray-900">{notice.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(notice.created_at).toLocaleDateString('ko-KR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {notice.view_count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Pinned Toggle */}
                      <form action={toggleNoticePinnedAction}>
                        <input type="hidden" name="id" value={notice.id} />
                        <input type="hidden" name="is_pinned" value={String(notice.is_pinned)} />
                        <button
                          type="submit"
                          className={`p-1.5 rounded-lg transition-colors ${
                            notice.is_pinned
                              ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                              : 'text-gray-400 hover:bg-gray-100'
                          }`}
                          title={notice.is_pinned ? '고정 해제' : '상단 고정'}
                        >
                          <Pin className="w-4 h-4" />
                        </button>
                      </form>

                      {/* Active Toggle */}
                      <form action={toggleNoticeActiveAction}>
                        <input type="hidden" name="id" value={notice.id} />
                        <input type="hidden" name="is_active" value={String(notice.is_active)} />
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                            notice.is_active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {notice.is_active ? (
                            <>
                              <Eye className="w-3 h-3" />
                              공개
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              비공개
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/notices/${notice.id}`}
                        className="p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="수정"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deleteNoticeAction}>
                        <input type="hidden" name="id" value={notice.id} />
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
