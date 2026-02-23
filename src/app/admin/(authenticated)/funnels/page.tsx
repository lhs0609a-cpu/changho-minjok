import Link from 'next/link';
import { getAllTemplates, getTemplateStepCount, getTemplateActiveCustomerCount } from '@/lib/funnel-db';
import { deleteFunnelAction, toggleFunnelActiveAction, createSampleFunnelAction } from './actions';
import {
  Plus,
  Edit,
  Eye,
  EyeOff,
  Zap,
  Users,
  Layers,
  ArrowRight,
  MessageCircle,
  Settings,
  Send,
  Sparkles,
} from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminFunnelsPage() {
  const templates = await getAllTemplates();

  const templateStats = await Promise.all(
    templates.map(async (t) => ({
      id: t.id,
      stepCount: await getTemplateStepCount(t.id),
      customerCount: await getTemplateActiveCustomerCount(t.id),
    }))
  );

  const statsMap = Object.fromEntries(templateStats.map(s => [s.id, s]));

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">자동 퍼널 관리</h1>
          <p className="text-gray-500 mt-1">메시지를 자동으로 보내는 퍼널을 설정하세요</p>
        </div>
        <Link
          href="/admin/funnels/new"
          className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-xl hover:bg-sky-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 퍼널 만들기
        </Link>
      </div>

      {/* 사용 가이드 */}
      <div className="bg-gradient-to-r from-purple-50 to-sky-50 rounded-2xl p-6 mb-8 border border-purple-100">
        <h2 className="text-lg font-bold text-purple-900 mb-2">자동 퍼널이란?</h2>
        <p className="text-purple-700 mb-6 text-sm">
          고객이 문의하면, 설정한 시간에 맞춰 자동으로 메시지가 전송됩니다. 한 번만 설정하면 끝!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-4 border border-purple-100 relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-600 text-white text-sm font-bold rounded-full">1</span>
              <span className="font-bold text-gray-900">퍼널 만들기</span>
            </div>
            <p className="text-sm text-gray-600 ml-11">
              보낼 메시지와 발송 시간을 설정해요
            </p>
            <div className="hidden md:block absolute right-[-18px] top-1/2 -translate-y-1/2 z-10">
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-4 border border-purple-100 relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-600 text-white text-sm font-bold rounded-full">2</span>
              <span className="font-bold text-gray-900">문의에 연결</span>
            </div>
            <p className="text-sm text-gray-600 ml-11">
              상담신청 상세에서 &quot;자동관리 시작&quot; 클릭
            </p>
            <div className="hidden md:block absolute right-[-18px] top-1/2 -translate-y-1/2 z-10">
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">3</span>
              <span className="font-bold text-gray-900">자동 발송!</span>
            </div>
            <p className="text-sm text-gray-600 ml-11">
              설정한 시간에 맞춰 메시지가 자동 전송돼요
            </p>
          </div>
        </div>

        {templates.length === 0 && (
          <form action={createSampleFunnelAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold shadow-sm"
            >
              <Sparkles className="w-5 h-5" />
              샘플 퍼널 바로 만들기 (클릭 한 번으로 완성!)
            </button>
          </form>
        )}
      </div>

      {/* 퍼널 목록 */}
      {templates.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <Zap className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">아직 퍼널이 없어요</h3>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">
            위의 &quot;샘플 퍼널 바로 만들기&quot; 버튼을 눌러 바로 시작하거나,<br />
            직접 새 퍼널을 만들어 보세요!
          </p>
          <Link
            href="/admin/funnels/new"
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            직접 만들기
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {templates.map((template) => {
            const stats = statsMap[template.id] || { stepCount: 0, customerCount: 0 };
            return (
              <div key={template.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    {/* 왼쪽: 퍼널 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-gray-900 text-lg truncate">{template.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full shrink-0 ${
                          template.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {template.is_active ? '활성' : '비활성'}
                        </span>
                      </div>
                      {template.description && (
                        <p className="text-sm text-gray-500 mb-3 truncate">{template.description}</p>
                      )}

                      {/* 통계 뱃지 */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <div className="p-1 bg-sky-50 rounded">
                            <Layers className="w-3.5 h-3.5 text-sky-600" />
                          </div>
                          <span>{stats.stepCount}단계 메시지</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <div className="p-1 bg-purple-50 rounded">
                            <Users className="w-3.5 h-3.5 text-purple-600" />
                          </div>
                          <span>진행중 {stats.customerCount}명</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-400">
                          <div className="p-1 bg-gray-50 rounded">
                            <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                          </div>
                          <span>카카오 알림톡</span>
                        </div>
                      </div>
                    </div>

                    {/* 오른쪽: 액션 버튼들 */}
                    <div className="flex items-center gap-1 ml-4 shrink-0">
                      <form action={toggleFunnelActiveAction}>
                        <input type="hidden" name="id" value={template.id} />
                        <input type="hidden" name="is_active" value={String(template.is_active)} />
                        <button
                          type="submit"
                          className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title={template.is_active ? '비활성화' : '활성화'}
                        >
                          {template.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </form>
                      <Link
                        href={`/admin/funnels/${template.id}`}
                        className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="수정"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        action={deleteFunnelAction}
                        id={template.id}
                        confirmMessage="정말 삭제하시겠습니까? 모든 단계와 진행 기록이 삭제됩니다."
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 하단: 미니 스텝 미리보기 */}
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Settings className="w-3.5 h-3.5" />
                    <span>흐름:</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(stats.stepCount, 5) }).map((_, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full">
                            {i + 1}
                          </span>
                          {i < Math.min(stats.stepCount, 5) - 1 && (
                            <ArrowRight className="w-3 h-3 text-gray-300" />
                          )}
                        </span>
                      ))}
                      {stats.stepCount > 5 && <span className="text-gray-400">+{stats.stepCount - 5}</span>}
                    </div>
                    <span className="ml-auto flex items-center gap-1">
                      <Send className="w-3 h-3" />
                      자동 발송
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 샘플 퍼널 추가 버튼 */}
          <form action={createSampleFunnelAction}>
            <button
              type="submit"
              className="w-full py-4 border-2 border-dashed border-purple-200 rounded-2xl text-purple-500 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              샘플 퍼널 추가하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
