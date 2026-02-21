import Link from 'next/link';
import { getAllTemplates, getTemplateStepCount, getTemplateActiveCustomerCount } from '@/lib/funnel-db';
import { deleteFunnelAction, toggleFunnelActiveAction } from './actions';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Zap,
  Calendar,
  Users,
  Layers,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminFunnelsPage() {
  const templates = await getAllTemplates();

  // 각 템플릿의 스텝 수, 활성 고객 수 조회
  const templateStats = await Promise.all(
    templates.map(async (t) => ({
      id: t.id,
      stepCount: await getTemplateStepCount(t.id),
      customerCount: await getTemplateActiveCustomerCount(t.id),
    }))
  );

  const statsMap = Object.fromEntries(templateStats.map(s => [s.id, s]));

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">자동 퍼널 관리</h1>
          <p className="text-gray-500 mt-1">자동 메시지 퍼널을 관리합니다.</p>
        </div>
        <Link
          href="/admin/funnels/new"
          className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-xl hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 퍼널
        </Link>
      </div>

      {/* Content */}
      {templates.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Zap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">등록된 퍼널이 없습니다.</p>
          <Link
            href="/admin/funnels/new"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            첫 퍼널 등록하기
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">퍼널 이름</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">단계 수</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">진행중 고객</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">생성일</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">상태</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {templates.map((template) => {
                const stats = statsMap[template.id] || { stepCount: 0, customerCount: 0 };
                return (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{template.name}</div>
                      {template.description && (
                        <div className="text-sm text-gray-500 truncate max-w-[250px]">{template.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Layers className="w-4 h-4" />
                        {stats.stepCount}단계
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {stats.customerCount}명
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(template.created_at).toLocaleDateString('ko-KR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <form action={toggleFunnelActiveAction}>
                        <input type="hidden" name="id" value={template.id} />
                        <input type="hidden" name="is_active" value={String(template.is_active)} />
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                            template.is_active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {template.is_active ? (
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
                          href={`/admin/funnels/${template.id}`}
                          className="p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="수정"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={deleteFunnelAction}>
                          <input type="hidden" name="id" value={template.id} />
                          <button
                            type="submit"
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="삭제"
                            onClick={(e) => {
                              if (!confirm('정말 삭제하시겠습니까? 모든 단계와 진행 기록이 삭제됩니다.')) {
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
