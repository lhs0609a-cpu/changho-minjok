import { supabase } from './supabase';

export interface DailyStats {
  date: string;
  count: number;
}

export interface RegionStats {
  region: string;
  count: number;
}

export interface StatusStats {
  status: string;
  count: number;
}

export async function getInquiryDailyStats(days: number = 30): Promise<DailyStats[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('inquiries')
    .select('created_at')
    .gte('created_at', startDate.toISOString());

  if (error) {
    console.error('Error fetching daily stats:', error);
    return [];
  }

  // 날짜별 그룹화
  const dailyMap: Record<string, number> = {};

  // 기간 내 모든 날짜 초기화
  for (let i = 0; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dailyMap[dateStr] = 0;
  }

  // 데이터 집계
  data?.forEach((item) => {
    const dateStr = new Date(item.created_at).toISOString().split('T')[0];
    if (dailyMap[dateStr] !== undefined) {
      dailyMap[dateStr]++;
    }
  });

  // 배열로 변환 및 정렬
  return Object.entries(dailyMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getInquiryMonthlyStats(months: number = 12): Promise<DailyStats[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  const { data, error } = await supabase
    .from('inquiries')
    .select('created_at')
    .gte('created_at', startDate.toISOString());

  if (error) {
    console.error('Error fetching monthly stats:', error);
    return [];
  }

  // 월별 그룹화
  const monthlyMap: Record<string, number> = {};

  for (let i = 0; i <= months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyMap[monthStr] = 0;
  }

  data?.forEach((item) => {
    const date = new Date(item.created_at);
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (monthlyMap[monthStr] !== undefined) {
      monthlyMap[monthStr]++;
    }
  });

  return Object.entries(monthlyMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getInquiryRegionStats(): Promise<RegionStats[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('inquiries')
    .select('address');

  if (error) {
    console.error('Error fetching region stats:', error);
    return [];
  }

  const regionMap: Record<string, number> = {};

  data?.forEach((item) => {
    if (item.address) {
      // 주소에서 시/도 추출
      const parts = item.address.split(' ');
      const region = parts[0] || '기타';
      regionMap[region] = (regionMap[region] || 0) + 1;
    } else {
      regionMap['미입력'] = (regionMap['미입력'] || 0) + 1;
    }
  });

  return Object.entries(regionMap)
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getInquiryStatusStats(): Promise<StatusStats[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('inquiries')
    .select('status');

  if (error) {
    console.error('Error fetching status stats:', error);
    return [];
  }

  const statusMap: Record<string, number> = {
    pending: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  };

  data?.forEach((item) => {
    const status = item.status || 'pending';
    statusMap[status] = (statusMap[status] || 0) + 1;
  });

  return Object.entries(statusMap)
    .map(([status, count]) => ({ status, count }));
}

export async function getConversionRate(): Promise<{
  totalInquiries: number;
  contracted: number;
  conversionRate: number;
}> {
  if (!supabase) {
    return { totalInquiries: 0, contracted: 0, conversionRate: 0 };
  }

  const { data, error } = await supabase
    .from('inquiries')
    .select('contract_status');

  if (error || !data) {
    return { totalInquiries: 0, contracted: 0, conversionRate: 0 };
  }

  const contracted = data.filter(d => d.contract_status === 'contracted').length;
  const conversionRate = data.length > 0
    ? Math.round((contracted / data.length) * 100 * 10) / 10
    : 0;

  return {
    totalInquiries: data.length,
    contracted,
    conversionRate,
  };
}

export async function getTodayStats(): Promise<{
  todayInquiries: number;
  thisMonthInquiries: number;
  pendingCount: number;
}> {
  if (!supabase) {
    return { todayInquiries: 0, thisMonthInquiries: 0, pendingCount: 0 };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const { data, error } = await supabase
    .from('inquiries')
    .select('created_at, status');

  if (error || !data) {
    return { todayInquiries: 0, thisMonthInquiries: 0, pendingCount: 0 };
  }

  const todayInquiries = data.filter(d =>
    new Date(d.created_at) >= today
  ).length;

  const thisMonthInquiries = data.filter(d =>
    new Date(d.created_at) >= firstDayOfMonth
  ).length;

  const pendingCount = data.filter(d => d.status === 'pending').length;

  return {
    todayInquiries,
    thisMonthInquiries,
    pendingCount,
  };
}
