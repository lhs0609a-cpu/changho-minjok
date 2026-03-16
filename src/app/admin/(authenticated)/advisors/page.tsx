import { getAllAdvisors } from '@/lib/advisor-db';
import AdvisorManager from './AdvisorManager';

export const dynamic = 'force-dynamic';

export default async function AdminAdvisorsPage() {
  const advisors = await getAllAdvisors();

  const activeCount = advisors.filter(a => a.is_active).length;
  const inactiveCount = advisors.length - activeCount;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">어드바이저 관리</h1>
        <p className="text-gray-500 mt-1">본사 소속 어드바이저(직원)를 관리합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">전체</p>
          <p className="text-2xl font-bold text-gray-900">{advisors.length}</p>
        </div>
        <div className="bg-[#E0F7F6] rounded-xl p-4 shadow-sm">
          <p className="text-sm text-[#2AC1BC]">활성</p>
          <p className="text-2xl font-bold text-[#2AC1BC]">{activeCount}</p>
        </div>
        <div className="bg-[#FFF3E8] rounded-xl p-4 shadow-sm">
          <p className="text-sm text-[#FF6F0F]">비활성</p>
          <p className="text-2xl font-bold text-[#FF6F0F]">{inactiveCount}</p>
        </div>
      </div>

      <AdvisorManager initialAdvisors={advisors} />
    </div>
  );
}
