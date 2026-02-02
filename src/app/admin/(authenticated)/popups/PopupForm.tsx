'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PopupRecord } from '@/lib/popup-db';
import { createPopupAction, updatePopupAction } from './actions';
import {
  ArrowLeft,
  Save,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';

interface PopupFormProps {
  popup?: PopupRecord;
}

export default function PopupForm({ popup }: PopupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!popup;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      if (isEditing) {
        await updatePopupAction(formData);
      } else {
        await createPopupAction(formData);
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEditing && <input type="hidden" name="id" value={popup.id} />}

      {/* 기본 정보 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={popup?.title || ''}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="팝업 제목을 입력하세요"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4" />
              이미지 URL
            </label>
            <input
              type="url"
              name="image_url"
              defaultValue={popup?.image_url || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="이미지 URL을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              링크 URL
            </label>
            <input
              type="url"
              name="link_url"
              defaultValue={popup?.link_url || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="클릭 시 이동할 URL을 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* 표시 기간 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">표시 기간</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시작일
            </label>
            <input
              type="datetime-local"
              name="start_date"
              defaultValue={popup?.start_date?.slice(0, 16) || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              종료일
            </label>
            <input
              type="datetime-local"
              name="end_date"
              defaultValue={popup?.end_date?.slice(0, 16) || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 설정 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">설정</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              표시 순서
            </label>
            <input
              type="number"
              name="display_order"
              defaultValue={popup?.display_order || 1}
              min={1}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상태
            </label>
            <select
              name="is_active"
              defaultValue={popup?.is_active !== false ? 'true' : 'false'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="true">활성</option>
              <option value="false">비활성</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/popups"
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
