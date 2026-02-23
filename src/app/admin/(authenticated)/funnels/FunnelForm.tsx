'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FunnelTemplateRecord, FunnelStepRecord } from '@/lib/supabase';
import { createFunnelAction, updateFunnelAction } from './actions';
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  MessageSquare,
  Clock,
  Link as LinkIcon,
  ArrowDown,
} from 'lucide-react';

interface StepData {
  delay_hours: number;
  title: string;
  message: string;
  channel: 'kakao' | 'sms' | 'email';
  link_url: string;
}

interface FunnelFormProps {
  template?: FunnelTemplateRecord;
  steps?: FunnelStepRecord[];
}

function getDelayLabel(hours: number, isFirst: boolean): string {
  if (isFirst && hours === 0) return '퍼널 시작하면 바로 보내요!';
  if (hours === 0) return '이전 메시지 보낸 직후 바로 보내요!';
  if (hours < 24) return `이전 메시지 보낸 후 ${hours}시간 뒤에 보내요`;
  const days = Math.floor(hours / 24);
  const remainHours = hours % 24;
  if (remainHours === 0) return `이전 메시지 보낸 후 ${days}일 뒤에 보내요`;
  return `이전 메시지 보낸 후 ${days}일 ${remainHours}시간 뒤에 보내요`;
}

const titlePlaceholders = [
  '예: 상담 접수 안내',
  '예: 추가 정보 안내',
  '예: 특별 혜택 안내',
  '예: 후기 요청',
  '예: 재문의 안내',
];

const messagePlaceholders = [
  '예: 안녕하세요, 창호의민족입니다!\n상담 문의를 접수해 주셔서 감사합니다.\n전문 상담사가 빠르게 연락드리겠습니다.',
  '예: 안녕하세요, 창호의민족입니다.\n어제 문의해 주신 사항 관련하여\n궁금한 점이 있으신가요?',
  '예: 창호의민족에서 특별 혜택을 안내드립니다!\n이번 달 한정 할인이 있습니다.',
  '예: 시공은 만족스러우셨나요?\n소중한 후기를 남겨주시면 감사하겠습니다.',
  '예: 안녕하세요, 창호의민족입니다.\n추가 문의사항이 있으시면 편하게 연락 주세요.',
];

export default function FunnelForm({ template, steps: existingSteps }: FunnelFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!template;

  const [steps, setSteps] = useState<StepData[]>(
    existingSteps && existingSteps.length > 0
      ? existingSteps.map(s => ({
          delay_hours: s.delay_hours,
          title: s.title,
          message: s.message,
          channel: s.channel,
          link_url: s.link_url || '',
        }))
      : [{ delay_hours: 0, title: '', message: '', channel: 'kakao', link_url: '' }]
  );

  const addStep = () => {
    setSteps([...steps, { delay_hours: 24, title: '', message: '', channel: 'kakao', link_url: '' }]);
  };

  const removeStep = (index: number) => {
    if (steps.length <= 1) return;
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStepField = (index: number, field: keyof StepData, value: string | number) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set('steps', JSON.stringify(steps));

    try {
      const result = isEditing
        ? await updateFunnelAction(formData)
        : await createFunnelAction(formData);

      if (result && !result.success) {
        alert(result.error || '저장에 실패했습니다.');
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEditing && <input type="hidden" name="id" value={template.id} />}

      {/* 기본 정보 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">퍼널 기본 정보</h2>
        <p className="text-sm text-gray-400 mb-5">이 퍼널의 이름과 설명을 적어주세요</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              퍼널 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={template?.name || ''}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder="예: 신규 문의 자동 응대"
            />
            <p className="text-xs text-gray-400 mt-1">나중에 문의에 연결할 때 이 이름으로 선택해요</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명 (선택)
            </label>
            <textarea
              name="description"
              defaultValue={template?.description || ''}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
              placeholder="예: 문의 접수 후 3일간 자동 메시지 3회 발송"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              활성 상태
            </label>
            <select
              name="is_active"
              defaultValue={template?.is_active !== false ? 'true' : 'false'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            >
              <option value="true">활성 (문의에 연결 가능)</option>
              <option value="false">비활성 (문의에 연결 불가)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 메시지 단계 편집기 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-gray-900">메시지 단계 설정</h2>
          <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{steps.length}개 단계</span>
        </div>
        <p className="text-sm text-gray-400 mb-6">고객에게 보낼 메시지를 순서대로 설정하세요. 각 단계별로 발송 시간을 다르게 할 수 있어요.</p>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <div key={index}>
              {/* 타임라인 화살표 (첫 번째 제외) */}
              {index > 0 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-purple-200" />
                    <ArrowDown className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-purple-500 font-medium mt-0.5">
                      {step.delay_hours === 0 ? '바로 이어서' : step.delay_hours < 24 ? `${step.delay_hours}시간 후` : `${Math.floor(step.delay_hours / 24)}일 후`}
                    </span>
                  </div>
                </div>
              )}

              <div className="border-2 border-gray-200 rounded-xl p-5 relative hover:border-purple-200 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-600 text-white text-sm font-bold rounded-full">
                      {index + 1}
                    </span>
                    <div>
                      <span className="text-sm font-bold text-gray-900">
                        {index === 0 ? '첫 번째 메시지' : `${index + 1}번째 메시지`}
                      </span>
                      <p className="text-xs text-purple-600 font-medium">
                        {getDelayLabel(step.delay_hours, index === 0)}
                      </p>
                    </div>
                  </div>
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="이 단계 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 발송 지연 */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      언제 보낼까요?
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={step.delay_hours}
                        onChange={(e) => updateStepField(index, 'delay_hours', parseInt(e.target.value) || 0)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm text-center"
                      />
                      <span className="text-sm text-gray-600">시간 후</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      {index === 0
                        ? '0 = 퍼널 시작 직후 발송'
                        : '0 = 이전 메시지 직후 / 24 = 하루 뒤 / 72 = 3일 뒤'}
                    </p>
                  </div>

                  {/* 채널 */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                      어떤 방법으로 보낼까요?
                    </label>
                    <select
                      value={step.channel}
                      onChange={(e) => updateStepField(index, 'channel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                    >
                      <option value="kakao">카카오 알림톡 (추천)</option>
                      <option value="sms">SMS 문자 (준비중)</option>
                      <option value="email">이메일 (준비중)</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1.5">
                      카카오 알림톡이 가장 확실한 방법이에요
                    </p>
                  </div>

                  {/* 제목 */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                      메시지 제목
                    </label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateStepField(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                      placeholder={titlePlaceholders[index % titlePlaceholders.length]}
                      required
                    />
                  </div>

                  {/* 메시지 내용 */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                      메시지 내용
                    </label>
                    <textarea
                      value={step.message}
                      onChange={(e) => updateStepField(index, 'message', e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm resize-none"
                      placeholder={messagePlaceholders[index % messagePlaceholders.length]}
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">고객에게 실제로 전송되는 내용이에요</p>
                  </div>

                  {/* 링크 URL */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-purple-500" />
                      링크 (선택사항)
                    </label>
                    <input
                      type="url"
                      value={step.link_url}
                      onChange={(e) => updateStepField(index, 'link_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm"
                      placeholder="예: https://changho-minjok.co.kr/products"
                    />
                    <p className="text-xs text-gray-400 mt-1">메시지에 &quot;자세히 보기&quot; 버튼이 추가돼요</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 단계 추가 버튼 */}
          <div className="pt-4">
            <button
              type="button"
              onClick={addStep}
              className="w-full py-4 border-2 border-dashed border-purple-200 rounded-xl text-purple-500 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              메시지 단계 추가하기
            </button>
          </div>
        </div>
      </div>

      {/* 미리보기 요약 */}
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-purple-900 mb-3">발송 흐름 미리보기</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-purple-600 font-medium">퍼널 시작</span>
          {steps.map((step, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-purple-400">&rarr;</span>
              <span className="bg-white px-3 py-1 rounded-full border border-purple-200 text-purple-700 text-xs font-medium">
                {step.delay_hours === 0 && i === 0 ? '즉시' : step.delay_hours === 0 ? '바로' : `${step.delay_hours}h 후`}
                {' '}{step.title || `${i + 1}단계`}
              </span>
            </span>
          ))}
          <span className="text-purple-400">&rarr;</span>
          <span className="text-green-600 font-medium">완료!</span>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/funnels"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          목록으로
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isEditing ? '수정 완료' : '퍼널 등록하기'}
        </button>
      </div>
    </form>
  );
}
