'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface DailyStats {
  date: string;
  count: number;
}

interface AnalyticsChartsProps {
  dailyStats: DailyStats[];
  monthlyStats: DailyStats[];
}

export default function AnalyticsCharts({ dailyStats, monthlyStats }: AnalyticsChartsProps) {
  const [view, setView] = useState<'daily' | 'monthly'>('daily');

  const data = view === 'daily' ? dailyStats.slice(-14) : monthlyStats.slice(-12);
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  const formatLabel = (dateStr: string) => {
    if (view === 'daily') {
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    } else {
      const [year, month] = dateStr.split('-');
      return `${month}월`;
    }
  };

  return (
    <>
      {/* Daily/Monthly Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            상담신청 추이
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setView('daily')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                view === 'daily'
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              일별
            </button>
            <button
              onClick={() => setView('monthly')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                view === 'monthly'
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              월별
            </button>
          </div>
        </div>

        {data.length === 0 ? (
          <p className="text-gray-500 text-center py-12">데이터가 없습니다.</p>
        ) : (
          <div className="h-64">
            {/* Simple Bar Chart */}
            <div className="h-full flex items-end gap-1">
              {data.map((stat, index) => {
                const height = maxCount > 0 ? (stat.count / maxCount) * 100 : 0;
                return (
                  <div
                    key={stat.date}
                    className="flex-1 flex flex-col items-center justify-end group"
                  >
                    {/* Bar */}
                    <div className="relative w-full max-w-[40px] flex flex-col items-center">
                      {/* Tooltip */}
                      <div className="absolute -top-8 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        {stat.count}건
                      </div>
                      <div
                        className="w-full bg-sky-500 rounded-t transition-all hover:bg-sky-600"
                        style={{ height: `${Math.max(height, 2)}%` }}
                      />
                    </div>
                    {/* Label */}
                    <span
                      className={`text-xs text-gray-500 mt-2 ${
                        view === 'daily' && index % 2 !== 0 ? 'invisible' : ''
                      }`}
                    >
                      {formatLabel(stat.date)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 pt-4 border-t grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {data.reduce((sum, d) => sum + d.count, 0)}
            </p>
            <p className="text-xs text-gray-500">
              {view === 'daily' ? '최근 2주' : '최근 12개월'} 총 상담
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {data.length > 0
                ? Math.round(data.reduce((sum, d) => sum + d.count, 0) / data.length * 10) / 10
                : 0}
            </p>
            <p className="text-xs text-gray-500">평균 상담/일</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{maxCount}</p>
            <p className="text-xs text-gray-500">최대 상담/일</p>
          </div>
        </div>
      </div>
    </>
  );
}
