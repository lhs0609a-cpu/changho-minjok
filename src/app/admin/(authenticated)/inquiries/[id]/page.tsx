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
  Zap,
  Pause,
  Play,
  Square,
  Send,
  Circle,
  ArrowRight,
  Timer,
} from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

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
  sent: { label: '발송 완료', color: 'bg-green-100 text-green-700' },
  failed: { label: '실패', color: 'bg-red-100 text-red-700' },
};

const channelLabels: Record<string, string> = {
  kakao: '카카오톡',
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

  let messageLogs: Awaited<ReturnType<typeof getMessageLogsByFunnelId>> = [];
  let funnelSteps: Awaited<ReturnType<typeof getStepsByTemplateId>> = [];
  if (customerFunnel) {
    [messageLogs, funnelSteps] = await Promise.all([
      getMessageLogsByFunnelId(customerFunnel.id),
      getStepsByTemplateId(customerFunnel.template_id),
    ]);
  }

  const stepMap = new Map(funnelSteps.map(s => [s.id, s]));

  // 각 스텝에 대한 발송 상태를 매핑
  const stepLogMap = new Map<number, typeof messageLogs[number]>();
  for (const log of messageLogs) {
    const step = stepMap.get(log.step_id);
    if (step) {
      stepLogMap.set(step.step_order, log);
    }
  }

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
        <DeleteButton
          action={deleteInquiryAction}
          id={inquiry.id}
          className="inline-flex items-center gap-2 text-red-500 hover:text-red-700 px-3 py-2"
        >
          삭제
        </DeleteButton>
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
        <div className="px-6 pb-6">
          <form action={updateInquiryStatusAction}>
            <input type="hidden" name="id" value={inquiry.id} />
            <input type="hidden" name="status" value={inquiry.status} />
            <label className="text-sm text-gray-500 mb-2 block">관리자 메모</label>
            <textarea
              name="admin_note"
              rows={3}
              defaultValue={inquiry.admin_note || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none mb-2"
              placeholder="관리자 메모를 입력하세요 (저장 시 상태변경 버튼을 누르세요)"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              메모 저장
            </button>
          </form>
        </div>

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <h2 className="font-bold text-purple-900">자동 퍼널</h2>
            </div>
            {!customerFunnel && (
              <span className="text-xs text-purple-500 bg-purple-100 px-2 py-1 rounded-full">
                퍼널을 연결하면 자동으로 메시지가 발송돼요
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          {customerFunnel && (customerFunnel.status === 'active' || customerFunnel.status === 'paused') ? (
            <div className="space-y-5">
              {/* 상태 헤더 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                    customerFunnel.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {customerFunnel.status === 'active' ? '자동 발송 중' : '일시정지 됨'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {customerFunnel.current_step}개 발송 완료 / 전체 {customerFunnel.total_steps}단계
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  시작: {new Date(customerFunnel.started_at).toLocaleDateString('ko-KR')}
                </div>
              </div>

              {/* 다음 발송 안내 */}
              {customerFunnel.next_send_at && customerFunnel.status === 'active' && (
                <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-50 px-4 py-3 rounded-xl border border-purple-100">
                  <Timer className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>다음 메시지 발송 예정:</strong> {new Date(customerFunnel.next_send_at).toLocaleString('ko-KR', {
                      month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
              )}

              {/* 비주얼 스텝 타임라인 */}
              {funnelSteps.length > 0 && (
                <div className="space-y-0">
                  {funnelSteps.map((step, i) => {
                    const log = stepLogMap.get(step.step_order);
                    const isDone = step.step_order < customerFunnel.current_step;
                    const isCurrent = step.step_order === customerFunnel.current_step;
                    const isPending = step.step_order > customerFunnel.current_step;

                    return (
                      <div key={step.id} className="flex gap-3">
                        {/* 타임라인 라인 */}
                        <div className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            isDone ? 'bg-green-500' : isCurrent ? 'bg-purple-500' : 'bg-gray-200'
                          }`}>
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            ) : isCurrent ? (
                              <Send className="w-3.5 h-3.5 text-white" />
                            ) : (
                              <Circle className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                          {i < funnelSteps.length - 1 && (
                            <div className={`w-0.5 flex-1 min-h-[24px] ${isDone ? 'bg-green-300' : 'bg-gray-200'}`} />
                          )}
                        </div>

                        {/* 스텝 내용 */}
                        <div className={`flex-1 pb-4 ${isPending ? 'opacity-50' : ''}`}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">
                              {step.step_order + 1}. {step.title}
                            </span>
                            {isDone && log && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                                log.status === 'sent' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                              }`}>
                                {log.status === 'sent' ? '발송완료' : '실패'}
                              </span>
                            )}
                            {isCurrent && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-purple-100 text-purple-600">
                                다음 발송
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {channelLabels[step.channel]} / {step.delay_hours === 0 ? '즉시' : `${step.delay_hours}시간 후`}
                            {log?.sent_at && ` / ${new Date(log.sent_at).toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${customerFunnel.total_steps > 0 ? (customerFunnel.current_step / customerFunnel.total_steps) * 100 : 0}%` }}
                />
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex gap-2 pt-1">
                {customerFunnel.status === 'active' ? (
                  <form action={pauseFunnelAction}>
                    <input type="hidden" name="funnel_id" value={customerFunnel.id} />
                    <input type="hidden" name="inquiry_id" value={inquiry.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                    >
                      <Play className="w-4 h-4" />
                      재개하기
                    </button>
                  </form>
                )}
                <DeleteButton
                  action={stopFunnelAction}
                  id={customerFunnel.id}
                  confirmMessage="퍼널을 완전히 중지하시겠습니까? 남은 메시지는 발송되지 않습니다."
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <Square className="w-4 h-4" />
                  중지
                </DeleteButton>
              </div>
            </div>
          ) : customerFunnel && (customerFunnel.status === 'completed' || customerFunnel.status === 'stopped') ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                  customerFunnel.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {customerFunnel.status === 'completed' ? '모든 메시지 발송 완료!' : '중지됨'}
                </span>
                <span className="text-sm text-gray-500">
                  {customerFunnel.current_step}/{customerFunnel.total_steps} 단계 진행됨
                </span>
              </div>

              <p className="text-sm text-gray-500 bg-gray-50 px-4 py-3 rounded-xl">
                이 문의에 다른 퍼널을 새로 시작할 수 있어요.
              </p>

              {funnelTemplates.length > 0 ? (
                <form action={startFunnelAction} className="flex items-end gap-3">
                  <input type="hidden" name="inquiry_id" value={inquiry.id} />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">퍼널 선택</label>
                    <select
                      name="template_id"
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                    >
                      {funnelTemplates.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    <Zap className="w-4 h-4" />
                    자동관리 시작
                  </button>
                </form>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-400 mb-2">
                    활성화된 퍼널 템플릿이 없습니다.
                  </p>
                  <Link href="/admin/funnels/new" className="text-sm text-purple-600 hover:underline font-medium">
                    퍼널을 먼저 생성해주세요 &rarr;
                  </Link>
                </div>
              )}
            </div>
          ) : (
            // 퍼널 없음 - 가이드 포함
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <p className="text-sm text-purple-800 mb-1 font-medium">
                  아직 자동 퍼널이 연결되지 않았어요
                </p>
                <p className="text-xs text-purple-600">
                  아래에서 퍼널을 선택하고 &quot;자동관리 시작&quot;을 누르면, 설정한 시간에 맞춰 이 고객에게 자동으로 메시지가 보내져요.
                </p>
              </div>

              {funnelTemplates.length > 0 ? (
                <form action={startFunnelAction} className="flex items-end gap-3">
                  <input type="hidden" name="inquiry_id" value={inquiry.id} />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">보낼 퍼널을 선택하세요</label>
                    <select
                      name="template_id"
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                    >
                      {funnelTemplates.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
                  >
                    <Zap className="w-4 h-4" />
                    자동관리 시작
                  </button>
                </form>
              ) : (
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <Zap className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 mb-3">
                    아직 퍼널이 없어요. 먼저 퍼널을 만들어야 해요!
                  </p>
                  <Link
                    href="/admin/funnels"
                    className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-medium"
                  >
                    퍼널 만들러 가기 <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 발송 이력 */}
        {customerFunnel && messageLogs.length > 0 && (
          <div className="border-t">
            <div className="px-6 py-3 bg-gray-50">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-bold text-gray-700">발송 이력 ({messageLogs.length}건)</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-500">단계</th>
                    <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-500">채널</th>
                    <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-500">발송 시간</th>
                    <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-500">결과</th>
                    <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-500">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {messageLogs.map((log) => {
                    const step = stepMap.get(log.step_id);
                    const msgStatus = messageStatusConfig[log.status] || messageStatusConfig.pending;
                    return (
                      <tr key={log.id} className="border-b last:border-b-0 hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-900 font-medium">
                          {step ? `${step.step_order + 1}. ${step.title}` : '-'}
                        </td>
                        <td className="px-6 py-3 text-gray-600">
                          {channelLabels[log.channel] || log.channel}
                        </td>
                        <td className="px-6 py-3 text-gray-600">
                          {log.sent_at
                            ? new Date(log.sent_at).toLocaleString('ko-KR', {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                              })
                            : new Date(log.created_at).toLocaleString('ko-KR', {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                              })}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex px-2.5 py-0.5 text-xs font-bold rounded-full ${msgStatus.color}`}>
                            {msgStatus.label}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-red-500 text-xs max-w-[200px] truncate">
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
