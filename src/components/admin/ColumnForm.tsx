'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { ColumnRecord } from '@/lib/supabase';
import { uploadColumnImage } from '@/lib/column-db';
import dynamic from 'next/dynamic';

const TipTapEditor = dynamic(() => import('./TipTapEditor'), { ssr: false });

interface ColumnFormProps {
  column?: ColumnRecord;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
}

export default function ColumnForm({ column, action, submitLabel }: ColumnFormProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(column?.thumbnail_url || null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(column?.thumbnail_url || '');
  const [content, setContent] = useState<string>(column?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setIsUploading(true);
    const url = await uploadColumnImage(file);
    if (url) {
      setThumbnailUrl(url);
    }
    setIsUploading(false);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    formData.set('content', content);
    formData.set('thumbnailUrl', thumbnailUrl);
    try {
      await action(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-8">
      {column && (
        <input type="hidden" name="id" value={column.id} />
      )}

      {/* 기본 정보 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">기본 정보</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={column?.title}
              placeholder="칼럼 제목을 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              required
              defaultValue={column?.category}
              placeholder="예: 창호 가이드, 시공 팁, 업계 동향"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              작성자 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              required
              defaultValue={column?.author || '창호의민족'}
              placeholder="작성자 이름"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              요약 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="excerpt"
              required
              rows={2}
              defaultValue={column?.excerpt}
              placeholder="칼럼의 간단한 요약을 작성하세요 (목록에 표시됩니다)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 썸네일 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">썸네일 이미지</h2>
        <div className="max-w-md">
          {thumbnailPreview ? (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
              <Image src={thumbnailPreview} alt="썸네일" fill className="object-cover" />
              <button
                type="button"
                onClick={() => {
                  setThumbnailPreview(null);
                  setThumbnailUrl('');
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm">업로드 중...</span>
                </div>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center aspect-[16/9] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#EF4444] transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">썸네일 이미지 선택</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
            </label>
          )}
        </div>
      </div>

      {/* 본문 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">본문</h2>
        <TipTapEditor content={content} onChange={setContent} />
      </div>

      {/* 설정 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">설정</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">공개 여부</label>
            <select
              name="isPublished"
              defaultValue={column?.is_published !== false ? 'true' : 'false'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
            >
              <option value="true">공개</option>
              <option value="false">비공개</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">추천 여부</label>
            <select
              name="isFeatured"
              defaultValue={column?.is_featured ? 'true' : 'false'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
            >
              <option value="false">일반</option>
              <option value="true">추천</option>
            </select>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="px-8 py-3 bg-[#EF4444] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '저장 중...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
