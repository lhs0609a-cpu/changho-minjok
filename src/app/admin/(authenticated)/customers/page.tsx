import Link from 'next/link';
import { getAllInquiries } from '@/lib/inquiry-db';
import {
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const contractStatusConfig: Record<string, { label: string; color: string }> = {
  inquiry: { label: '상담중', color: 'bg-gray-100 text-gray-700' },
  quoted: { label: '견적제출', color: 'bg-blue-100 text-blue-700' },
  negotiating: { label: '협상중', color: 'bg-amber-100 text-amber-700' },
  contracted: { label: '계약완료', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '취소', color: 'bg-red-100 text-red-700' },
};

const constructionStatusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: '대기', color: 'bg-gray-100 text-gray-700' },
  scheduled: { label: '예정', color: 'bg-blue-100 text-blue-700' },
  in_progress: { label: '진행중', color: 'bg-amber-100 text-amber-700' },
  completed: { label: '완료', color: 'bg-green-100 text-green-700' },
};

interface InquiryWithCRM {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  created_at: string;
  contract_status?: string;
  contract_date?: string;
  construction_date?: string;
  construction_status?: string;
  total_amount?: number;
}

export default async function AdminCustomersPage() {
  const customers = (await getAllInquiries()) as unknown as InquiryWithCRM[];

  // 계약 상태별 통계
  const stats = {
    total: customers.length,
    inquiry: customers.filter((c) => !c.contract_status || c.contract_status === 'inquiry').length,
    contracted: customers.filter((c) => c.contract_status === 'contracted').length,
    inProgress: customers.filter((c) => c.construction_status === 'in_progress').length,
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">고객 관리 (CRM)</h1>
        <p className="text-gray-500 mt-1">고객 정보와 계약/시공 진행 상황을 관리합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">전체 고객</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600">상담중</p>
          <p className="text-2xl font-bold text-gray-700">{stats.inquiry}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-green-600">계약완료</p>
          <p className="text-2xl font-bold text-green-700">{stats.contracted}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-amber-600">시공진행</p>
          <p className="text-2xl font-bold text-amber-700">{stats.inProgress}</p>
        </div>
      </div>

      {/* Content */}
      {customers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">등록된 고객이 없습니다.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">고객정보</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">연락처</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">계약상태</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">시공상태</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">계약금액</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => {
                const contractStatus =
                  contractStatusConfig[customer.contract_status || 'inquiry'] ||
                  contractStatusConfig.inquiry;
                const constructionStatus =
                  customer.construction_status
                    ? constructionStatusConfig[customer.construction_status]
                    : null;

                return (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      {customer.address && (
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-[150px]">{customer.address}</span>
                        </div>
                      )}
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(customer.created_at).toLocaleDateString('ko-KR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <a
                          href={`tel:${customer.phone}`}
                          className="flex items-center gap-1 text-sm text-gray-900 hover:text-sky-600"
                        >
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </a>
                        {customer.email && (
                          <a
                            href={`mailto:${customer.email}`}
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-sky-600"
                          >
                            <Mail className="w-3 h-3" />
                            {customer.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${contractStatus.color}`}
                      >
                        {contractStatus.label}
                      </span>
                      {customer.contract_date && (
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(customer.contract_date).toLocaleDateString('ko-KR')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {constructionStatus ? (
                        <>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${constructionStatus.color}`}
                          >
                            {constructionStatus.label}
                          </span>
                          {customer.construction_date && (
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(customer.construction_date).toLocaleDateString('ko-KR')}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {customer.total_amount ? (
                        <span className="font-medium text-gray-900">
                          {customer.total_amount.toLocaleString()}원
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        상세
                        <ArrowRight className="w-3 h-3" />
                      </Link>
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
