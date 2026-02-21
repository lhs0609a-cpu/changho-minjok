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

const channelLabels: Record<string, string> = {
  kakao: '카카오 알림톡',
  sms: 'SMS',
  email: '이메일',
};

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
      if (isEditing) {
        await updateFunnelAction(formData);
      } else {
        await createFunnelAction(formData);
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">퍼널 기본 정보</h2>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="예: 신규 문의 자동 응대"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              name="description"
              defaultValue={template?.description || ''}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
              placeholder="퍼널에 대한 설명을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              활성 상태
            </label>
            <select
              name="is_active"
              defaultValue={template?.is_active !== false ? 'true' : 'false'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="true">활성</option>
              <option value="false">비활성</option>
            </select>
          </div>
        </div>
      </div>

      {/* 메시지 단계 편집기 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">메시지 단계</h2>
          <span className="text-sm text-gray-500">{steps.length}개 단계</span>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 relative"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-sky-100 text-sky-700 text-sm font-bold rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-700">단계 {index + 1}</span>
                </div>
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="단계 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    발송 지연 (시간)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={step.delay_hours}
                    onChange={(e) => updateStepField(index, 'delay_hours', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {step.delay_hours === 0 ? '즉시 발송' : `${step.delay_hours}시간 후 발송`}
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">채널</label>
                  <select
                    value={step.channel}
                    onChange={(e) => updateStepField(index, 'channel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm"
                  >
                    <option value="kakao">카카오 알림톡</option>
                    <option value="sms">SMS</option>
                    <option value="email">이메일</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    제목
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateStepField(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm"
                    placeholder="메시지 제목"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">메시지 내용</label>
                  <textarea
                    value={step.message}
                    onChange={(e) => updateStepField(index, 'message', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm resize-none"
                    placeholder="메시지 내용을 입력하세요"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5" />
                    링크 URL (선택)
                  </label>
                  <input
                    type="url"
                    value={step.link_url}
                    onChange={(e) => updateStepField(index, 'link_url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addStep}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-sky-400 hover:text-sky-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            단계 추가
          </button>
        </div>
      </div>

      {/* Buttons */}
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
          className="inline-flex items-center gap-2 bg-sky-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isEditing ? '수정하기' : '등록하기'}
        </button>
      </div>
    </form>
  );
}
