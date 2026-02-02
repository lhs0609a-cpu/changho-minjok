'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NoticeRecord } from '@/lib/notice-db';
import { createNoticeAction, updateNoticeAction } from './actions';
import {
  ArrowLeft,
  Save,
  Loader2,
} from 'lucide-react';

interface NoticeFormProps {
  notice?: NoticeRecord;
}

export default function NoticeForm({ notice }: NoticeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!notice;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      if (isEditing) {
        await updateNoticeAction(formData);
      } else {
        await createNoticeAction(formData);
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEditing && <input type="hidden" name="id" value={notice.id} />}

      {/* 기본 정보 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">공지사항 내용</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={notice?.title || ''}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="공지사항 제목을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              defaultValue={notice?.content || ''}
              required
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
              placeholder="공지사항 내용을 입력하세요"
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
              상단 고정
            </label>
            <select
              name="is_pinned"
              defaultValue={notice?.is_pinned ? 'true' : 'false'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="false">일반</option>
              <option value="true">고정</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              공개 상태
            </label>
            <select
              name="is_active"
              defaultValue={notice?.is_active !== false ? 'true' : 'false'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="true">공개</option>
              <option value="false">비공개</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/notices"
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
