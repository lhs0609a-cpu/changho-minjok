import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { verifyAdmin } from '@/lib/auth';
import { getInquiryById } from '@/lib/inquiry-db';
import { updateInquiryStatusAction, deleteInquiryAction } from './actions';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Tag,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusConfig = {
  pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  in_progress: { label: '처리중', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  completed: { label: '완료', color: 'bg-green-100 text-green-700 border-green-200' },
  cancelled: { label: '취소', color: 'bg-gray-100 text-gray-500 border-gray-200' },
};

const inquiryTypeLabels: Record<string, string> = {
  estimate: '견적 문의',
  product: '제품 문의',
  installation: '시공 문의',
  as: 'A/S 문의',
  other: '기타',
};

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect('/admin');
  }

  const { id } = await params;
  const inquiry = await getInquiryById(id);

  if (!inquiry) {
    notFound();
  }

  const status = statusConfig[inquiry.status] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/inquiries" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">상담신청 상세</h1>
          </div>
          <form action={deleteInquiryAction}>
            <input type="hidden" name="id" value={inquiry.id} />
            <button
              type="submit"
              className="inline-flex items-center gap-2 text-red-500 hover:text-red-700 px-3 py-2"
              onClick={(e) => {
                if (!confirm('정말 삭제하시겠습니까?')) {
                  e.preventDefault();
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
              삭제
            </button>
          </form>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Status Bar */}
          <div className={`px-6 py-4 border-b ${status.color}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">상태: {status.label}</span>
              <span className="text-sm">
                {new Date(inquiry.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  이름
                </label>
                <p className="text-lg font-semibold text-gray-900">{inquiry.name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  연락처
                </label>
                <a href={`tel:${inquiry.phone}`} className="text-lg font-semibold text-sky-600 hover:underline">
                  {inquiry.phone}
                </a>
              </div>

              {inquiry.email && (
                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    이메일
                  </label>
                  <a href={`mailto:${inquiry.email}`} className="text-gray-900 hover:text-sky-600">
                    {inquiry.email}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  문의유형
                </label>
                <p className="text-gray-900">
                  {inquiryTypeLabels[inquiry.inquiry_type] || inquiry.inquiry_type}
                </p>
              </div>

              {inquiry.address && (
                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    주소
                  </label>
                  <p className="text-gray-900">{inquiry.address}</p>
                </div>
              )}

              <div>
                <label className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  신청일시
                </label>
                <p className="text-gray-900">
                  {new Date(inquiry.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="px-6 pb-6">
            <label className="text-sm text-gray-500 mb-2 block">문의 내용</label>
            <div className="bg-gray-50 rounded-xl p-4 whitespace-pre-wrap text-gray-800">
              {inquiry.message}
            </div>
          </div>

          {/* Admin Note */}
          {inquiry.admin_note && (
            <div className="px-6 pb-6">
              <label className="text-sm text-gray-500 mb-2 block">관리자 메모</label>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 whitespace-pre-wrap text-gray-800">
                {inquiry.admin_note}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <form action={updateInquiryStatusAction} className="flex flex-wrap gap-3">
              <input type="hidden" name="id" value={inquiry.id} />

              <button
                type="submit"
                name="status"
                value="pending"
                disabled={inquiry.status === 'pending'}
                className="inline-flex items-center gap-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Clock className="w-4 h-4" />
                대기중
              </button>
              <button
                type="submit"
                name="status"
                value="in_progress"
                disabled={inquiry.status === 'in_progress'}
                className="inline-flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Eye className="w-4 h-4" />
                처리중
              </button>
              <button
                type="submit"
                name="status"
                value="completed"
                disabled={inquiry.status === 'completed'}
                className="inline-flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                완료
              </button>
              <button
                type="submit"
                name="status"
                value="cancelled"
                disabled={inquiry.status === 'cancelled'}
                className="inline-flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <XCircle className="w-4 h-4" />
                취소
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
