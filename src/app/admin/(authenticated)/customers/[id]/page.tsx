import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getInquiryById } from '@/lib/inquiry-db';
import CustomerDetailForm from './CustomerDetailForm';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

const inquiryTypeLabels: Record<string, string> = {
  estimate: '견적 문의',
  product: '제품 문의',
  installation: '시공 문의',
  as: 'A/S 문의',
  other: '기타',
};

const statusLabels: Record<string, string> = {
  pending: '대기중',
  in_progress: '처리중',
  completed: '완료',
  cancelled: '취소',
};

interface CustomerData {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  inquiry_type: string;
  message: string;
  status: string;
  admin_note: string | null;
  created_at: string;
  contract_status?: string;
  contract_date?: string;
  construction_date?: string;
  construction_status?: string;
  total_amount?: number;
  notes?: string;
}

export default async function CustomerDetailPage({ params }: Props) {
  const { id } = await params;
  const customer = (await getInquiryById(id)) as unknown as CustomerData | null;

  if (!customer) {
    notFound();
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{customer.name} 고객</h1>
        <p className="text-gray-500 mt-1">고객 상세 정보 및 계약/시공 관리</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Customer Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">기본 정보</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <span className="text-sky-600 font-semibold">
                    {customer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{customer.name}</div>
                  <div className="text-xs text-gray-500">
                    {inquiryTypeLabels[customer.inquiry_type] || customer.inquiry_type}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t space-y-2">
                <a
                  href={`tel:${customer.phone}`}
                  className="flex items-center gap-2 text-gray-700 hover:text-sky-600"
                >
                  <Phone className="w-4 h-4" />
                  {customer.phone}
                </a>
                {customer.email && (
                  <a
                    href={`mailto:${customer.email}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-sky-600"
                  >
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </a>
                )}
                {customer.address && (
                  <div className="flex items-start gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>{customer.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(customer.created_at).toLocaleString('ko-KR')}
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Message */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              문의 내용
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg text-sm">
              {customer.message}
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-gray-500">상담 상태:</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                customer.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : customer.status === 'in_progress'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {statusLabels[customer.status] || customer.status}
              </span>
            </div>
            {customer.admin_note && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">{customer.admin_note}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: CRM Form */}
        <div className="lg:col-span-2">
          <CustomerDetailForm customer={customer} />
        </div>
      </div>
    </div>
  );
}
