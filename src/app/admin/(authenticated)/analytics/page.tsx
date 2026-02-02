import {
  getInquiryDailyStats,
  getInquiryMonthlyStats,
  getInquiryRegionStats,
  getInquiryStatusStats,
  getConversionRate,
  getTodayStats,
} from '@/lib/analytics-db';
import AnalyticsCharts from './AnalyticsCharts';
import {
  TrendingUp,
  MapPin,
  Target,
  Calendar,
  Users,
  CheckCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusLabels: Record<string, string> = {
  pending: '대기중',
  in_progress: '처리중',
  completed: '완료',
  cancelled: '취소',
};

export default async function AdminAnalyticsPage() {
  const [dailyStats, monthlyStats, regionStats, statusStats, conversion, todayStats] =
    await Promise.all([
      getInquiryDailyStats(30),
      getInquiryMonthlyStats(12),
      getInquiryRegionStats(),
      getInquiryStatusStats(),
      getConversionRate(),
      getTodayStats(),
    ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">통계/분석</h1>
        <p className="text-gray-500 mt-1">상담신청 및 고객 데이터를 분석합니다.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-sky-600" />
            </div>
            <span className="text-sm text-gray-500">오늘 상담</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{todayStats.todayInquiries}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-500">이번달 상담</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{todayStats.thisMonthInquiries}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-gray-500">전체 고객</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{conversion.totalInquiries}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">계약 전환율</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{conversion.conversionRate}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <AnalyticsCharts
          dailyStats={dailyStats}
          monthlyStats={monthlyStats}
        />
      </div>

      {/* Region & Status Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Region Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            지역별 상담신청
          </h2>
          {regionStats.length === 0 ? (
            <p className="text-gray-500 text-center py-8">데이터가 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {regionStats.slice(0, 10).map((stat, index) => {
                const maxCount = regionStats[0]?.count || 1;
                const percentage = Math.round((stat.count / maxCount) * 100);
                return (
                  <div key={stat.region}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">
                        {index + 1}. {stat.region}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{stat.count}건</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-sky-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            처리 현황
          </h2>
          {statusStats.length === 0 ? (
            <p className="text-gray-500 text-center py-8">데이터가 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {statusStats.map((stat) => {
                const total = statusStats.reduce((sum, s) => sum + s.count, 0) || 1;
                const percentage = Math.round((stat.count / total) * 100);
                const colors: Record<string, string> = {
                  pending: 'bg-yellow-500',
                  in_progress: 'bg-blue-500',
                  completed: 'bg-green-500',
                  cancelled: 'bg-gray-400',
                };
                return (
                  <div key={stat.status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">
                        {statusLabels[stat.status] || stat.status}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {stat.count}건 ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${colors[stat.status] || 'bg-gray-500'} h-2 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Conversion Summary */}
      <div className="mt-6 bg-gradient-to-r from-purple-500 to-sky-500 rounded-2xl p-6 text-white">
        <h2 className="font-semibold text-lg mb-4">계약 전환 요약</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold">{conversion.totalInquiries}</p>
            <p className="text-sm opacity-80">전체 상담</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{conversion.contracted}</p>
            <p className="text-sm opacity-80">계약 완료</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{conversion.conversionRate}%</p>
            <p className="text-sm opacity-80">전환율</p>
          </div>
        </div>
      </div>
    </div>
  );
}
