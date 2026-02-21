import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getInquiryById } from '@/lib/inquiry-db';
import { getCustomerFunnelByInquiryId, getActiveTemplates, getMessageLogsByFunnelId, getStepsByTemplateId } from '@/lib/funnel-db';
import {
  updateInquiryStatusAction,
  deleteInquiryAction,
  startFunnelAction,
  pauseFunnelAction,
  resumeFunnelAction,
  stopFunnelAction,
} from '../actions';
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
  Trash2,
  Zap,
  Pause,
  Play,
  Square,
  Send,
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

const messageStatusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: '대기', color: 'bg-yellow-100 text-yellow-700' },
  sent: { label: '성공', color: 'bg-green-100 text-green-700' },
  failed: { label: '실패', color: 'bg-red-100 text-red-700' },
};

const channelLabels: Record<string, string> = {
  kakao: '카카오 알림톡',
  sms: 'SMS',
  email: '이메일',
};

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inquiry = await getInquiryById(id);

  if (!inquiry) {
    notFound();
  }

  const status = statusConfig[inquiry.status] || statusConfig.pending;
  const customerFunnel = await getCustomerFunnelByInquiryId(id);
  const funnelTemplates = await getActiveTemplates();

  // 퍼널이 있으면 메시지 로그와 스텝 정보도 조회
  let messageLogs: Awaited<ReturnType<typeof getMessageLogsByFunnelId>> = [];
  let funnelSteps: Awaited<ReturnType<typeof getStepsByTemplateId>> = [];
  if (customerFunnel) {
    [messageLogs, funnelSteps] = await Promise.all([
      getMessageLogsByFunnelId(customerFunnel.id),
      getStepsByTemplateId(customerFunnel.template_id),
    ]);
  }

  // step_id → step 정보 매핑
  const stepMap = new Map(funnelSteps.map(s => [s.id, s]));

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">상담신청 상세</h1>
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

      {/* Content */}
      <div className="max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden">
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

      {/* 자동 퍼널 섹션 */}
      <div className="max-w-4xl mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-purple-50">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <h2 className="font-semibold text-purple-900">자동 퍼널</h2>
          </div>
        </div>

        <div className="p-6">
          {customerFunnel && (customerFunnel.status === 'active' || customerFunnel.status === 'paused') ? (
            // 퍼널 진행 중 상태
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                    customerFunnel.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {customerFunnel.status === 'active' ? '진행중' : '일시정지'}
                  </span>
                  <span className="ml-3 text-sm text-gray-600">
                    {customerFunnel.current_step}/{customerFunnel.total_steps} 단계
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  시작: {new Date(customerFunnel.started_at).toLocaleDateString('ko-KR')}
                </div>
              </div>

              {/* Next send info */}
              {customerFunnel.next_send_at && (
                <div className="text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                  다음 발송 예정: {new Date(customerFunnel.next_send_at).toLocaleString('ko-KR')}
                </div>
              )}

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full transition-all"
                  style={{ width: `${customerFunnel.total_steps > 0 ? (customerFunnel.current_step / customerFunnel.total_steps) * 100 : 0}%` }}
                />
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex gap-2">
                {customerFunnel.status === 'active' ? (
                  <form action={pauseFunnelAction}>
                    <input type="hidden" name="funnel_id" value={customerFunnel.id} />
                    <input type="hidden" name="inquiry_id" value={inquiry.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      <Pause className="w-4 h-4" />
                      일시정지
                    </button>
                  </form>
                ) : (
                  <form action={resumeFunnelAction}>
                    <input type="hidden" name="funnel_id" value={customerFunnel.id} />
                    <input type="hidden" name="inquiry_id" value={inquiry.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      재개
                    </button>
                  </form>
                )}
                <form action={stopFunnelAction}>
                  <input type="hidden" name="funnel_id" value={customerFunnel.id} />
                  <input type="hidden" name="inquiry_id" value={inquiry.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    onClick={(e) => {
                      if (!confirm('퍼널을 중지하시겠습니까?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Square className="w-4 h-4" />
                    중지
                  </button>
                </form>
              </div>
            </div>
          ) : customerFunnel && (customerFunnel.status === 'completed' || customerFunnel.status === 'stopped') ? (
            // 퍼널 완료/중지 상태
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                  customerFunnel.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {customerFunnel.status === 'completed' ? '완료' : '중지됨'}
                </span>
                <span className="text-sm text-gray-500">
                  {customerFunnel.current_step}/{customerFunnel.total_steps} 단계 진행됨
                </span>
              </div>

              <p className="text-sm text-gray-500">새로운 퍼널을 시작할 수 있습니다.</p>

              {funnelTemplates.length > 0 ? (
                <form action={startFunnelAction} className="flex items-end gap-3">
                  <input type="hidden" name="inquiry_id" value={inquiry.id} />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">퍼널 선택</label>
                    <select
                      name="template_id"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                    >
                      {funnelTemplates.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    자동관리 시작
                  </button>
                </form>
              ) : (
                <p className="text-sm text-gray-400">
                  활성화된 퍼널 템플릿이 없습니다. <Link href="/admin/funnels/new" className="text-purple-600 hover:underline">퍼널을 먼저 생성</Link>해주세요.
                </p>
              )}
            </div>
          ) : (
            // 퍼널 없음
            <div>
              {funnelTemplates.length > 0 ? (
                <form action={startFunnelAction} className="flex items-end gap-3">
                  <input type="hidden" name="inquiry_id" value={inquiry.id} />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">퍼널 선택</label>
                    <select
                      name="template_id"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                    >
                      {funnelTemplates.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    자동관리 시작
                  </button>
                </form>
              ) : (
                <p className="text-sm text-gray-400">
                  활성화된 퍼널 템플릿이 없습니다. <Link href="/admin/funnels/new" className="text-purple-600 hover:underline">퍼널을 먼저 생성</Link>해주세요.
                </p>
              )}
            </div>
          )}
        </div>

        {/* 발송 이력 테이블 */}
        {customerFunnel && messageLogs.length > 0 && (
          <div className="border-t">
            <div className="px-6 py-3 bg-gray-50">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-700">발송 이력</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">단계</th>
                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">채널</th>
                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">발송시간</th>
                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                    <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">에러</th>
                  </tr>
                </thead>
                <tbody>
                  {messageLogs.map((log) => {
                    const step = stepMap.get(log.step_id);
                    const msgStatus = messageStatusConfig[log.status] || messageStatusConfig.pending;
                    return (
                      <tr key={log.id} className="border-b last:border-b-0 hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-900">
                          {step ? `${step.step_order + 1}. ${step.title}` : '-'}
                        </td>
                        <td className="px-6 py-3 text-gray-600">
                          {channelLabels[log.channel] || log.channel}
                        </td>
                        <td className="px-6 py-3 text-gray-600">
                          {log.sent_at
                            ? new Date(log.sent_at).toLocaleString('ko-KR')
                            : new Date(log.created_at).toLocaleString('ko-KR')}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${msgStatus.color}`}>
                            {msgStatus.label}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-red-500 text-xs max-w-xs truncate">
                          {log.error_message || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
