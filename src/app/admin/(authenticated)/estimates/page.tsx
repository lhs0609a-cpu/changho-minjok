import { getAllEstimates, getEstimateStats } from '@/lib/estimate-db';
import { deleteEstimateAction } from './actions';
import {
  Calculator,
  Phone,
  Mail,
  Calendar,
  Building2,
  Ruler,
  Trash2,
  TrendingUp,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const buildingTypeLabels: Record<string, string> = {
  apartment: '아파트',
  villa: '빌라/연립',
  house: '단독주택',
  office: '오피스텔',
  store: '상가',
  other: '기타',
};

const frameTypeLabels: Record<string, string> = {
  system: '시스템창호',
  haisashi: '하이샤시',
  pvc: 'PVC창호',
};

export default async function AdminEstimatesPage() {
  const [estimates, stats] = await Promise.all([
    getAllEstimates(),
    getEstimateStats(),
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">견적 관리</h1>
        <p className="text-gray-500 mt-1">고객 견적 기록을 관리합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">전체 견적</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-sky-50 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-sky-600">이번 달 견적</p>
          <p className="text-2xl font-bold text-sky-700">{stats.thisMonth}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-600">평균 견적가</p>
            <p className="text-2xl font-bold text-emerald-700">
              {stats.avgPrice > 0 ? `${stats.avgPrice.toLocaleString()}원` : '-'}
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      {/* Content */}
      {estimates.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">저장된 견적이 없습니다.</p>
          <p className="text-sm text-gray-400 mt-1">
            고객이 견적 계산기를 이용하면 자동으로 기록됩니다.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">고객정보</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">건물유형</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">제품</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">견적가</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">신청일</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {estimates.map((estimate) => (
                <tr key={estimate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {estimate.customer_name || '미입력'}
                    </div>
                    <div className="flex flex-col gap-0.5 mt-1">
                      {estimate.phone && (
                        <a
                          href={`tel:${estimate.phone}`}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-sky-600"
                        >
                          <Phone className="w-3 h-3" />
                          {estimate.phone}
                        </a>
                      )}
                      {estimate.email && (
                        <a
                          href={`mailto:${estimate.email}`}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-sky-600"
                        >
                          <Mail className="w-3 h-3" />
                          {estimate.email}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">
                        {buildingTypeLabels[estimate.building_type || ''] || estimate.building_type || '-'}
                      </span>
                    </div>
                    {estimate.floor_size && (
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Ruler className="w-3 h-3" />
                        {estimate.floor_size}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-700">
                      {frameTypeLabels[estimate.frame_type || ''] || estimate.frame_type || '-'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {estimate.glass_type || '-'} / {estimate.window_count || 0}개
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {estimate.estimated_price ? (
                      <span className="font-semibold text-sky-600">
                        {estimate.estimated_price.toLocaleString()}원
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(estimate.created_at).toLocaleDateString('ko-KR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <form action={deleteEstimateAction}>
                      <input type="hidden" name="id" value={estimate.id} />
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
