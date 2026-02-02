'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BannerRecord } from '@/lib/banner-db';
import { createBannerAction, updateBannerAction } from './actions';
import {
  ArrowLeft,
  Save,
  Loader2,
  Image as ImageIcon,
  Smartphone,
} from 'lucide-react';

interface BannerFormProps {
  banner?: BannerRecord;
}

export default function BannerForm({ banner }: BannerFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!banner;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      if (isEditing) {
        await updateBannerAction(formData);
      } else {
        await createBannerAction(formData);
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEditing && <input type="hidden" name="id" value={banner.id} />}

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
              defaultValue={banner?.title || ''}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="배너 제목을 입력하세요"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4" />
              데스크톱 이미지 URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="image_url"
              defaultValue={banner?.image_url || ''}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="데스크톱용 이미지 URL을 입력하세요"
            />
            <p className="text-xs text-gray-500 mt-1">권장 사이즈: 1920x600px</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Smartphone className="w-4 h-4" />
              모바일 이미지 URL
            </label>
            <input
              type="url"
              name="mobile_image_url"
              defaultValue={banner?.mobile_image_url || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="모바일용 이미지 URL (선택사항)"
            />
            <p className="text-xs text-gray-500 mt-1">권장 사이즈: 768x400px</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              링크 URL
            </label>
            <input
              type="url"
              name="link_url"
              defaultValue={banner?.link_url || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="클릭 시 이동할 URL을 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* 설정 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">설정</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              위치
            </label>
            <select
              name="location"
              defaultValue={banner?.location || 'main'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="main">메인</option>
              <option value="sub">서브</option>
              <option value="landing">랜딩</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              표시 순서
            </label>
            <input
              type="number"
              name="display_order"
              defaultValue={banner?.display_order || 1}
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
              defaultValue={banner?.is_active !== false ? 'true' : 'false'}
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
          href="/admin/banners"
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
