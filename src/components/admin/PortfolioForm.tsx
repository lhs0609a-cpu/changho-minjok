'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { PortfolioRecord } from '@/lib/supabase';

interface PortfolioFormProps {
  portfolio?: PortfolioRecord;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
}

export default function PortfolioForm({ portfolio, action, submitLabel }: PortfolioFormProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(portfolio?.thumbnail_url || null);
  const [beforePreview, setBeforePreview] = useState<string | null>(portfolio?.before_url || null);
  const [afterPreview, setAfterPreview] = useState<string | null>(portfolio?.after_url || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (url: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    await action(formData);
    setIsSubmitting(false);
  };

  return (
    <form action={handleSubmit} className="space-y-8">
      {portfolio && (
        <>
          <input type="hidden" name="id" value={portfolio.id} />
          <input type="hidden" name="slug" value={portfolio.slug} />
          <input type="hidden" name="existingThumbnail" value={portfolio.thumbnail_url || ''} />
          <input type="hidden" name="existingBefore" value={portfolio.before_url || ''} />
          <input type="hidden" name="existingAfter" value={portfolio.after_url || ''} />
        </>
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
              defaultValue={portfolio?.title}
              placeholder="예: 강남 OO아파트 전체 교체"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              지역 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              required
              defaultValue={portfolio?.location}
              placeholder="예: 서울 강남구"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시공 날짜 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="date"
              required
              defaultValue={portfolio?.date}
              placeholder="예: 2025년 1월"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              건물 유형 <span className="text-red-500">*</span>
            </label>
            <select
              name="buildingType"
              required
              defaultValue={portfolio?.building_type || '아파트'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="아파트">아파트</option>
              <option value="빌라">빌라</option>
              <option value="단독주택">단독주택</option>
              <option value="상가">상가</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품 유형 <span className="text-red-500">*</span>
            </label>
            <select
              name="product"
              required
              defaultValue={portfolio?.product || '시스템창호'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="시스템창호">시스템창호</option>
              <option value="하이샤시">하이샤시</option>
              <option value="PVC창호">PVC창호</option>
            </select>
          </div>
        </div>
      </div>

      {/* 시공 상세 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">시공 상세</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              면적 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="area"
              required
              defaultValue={portfolio?.area}
              placeholder="예: 84㎡ (34평형)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              창호 개수 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="windowCount"
              required
              defaultValue={portfolio?.window_count}
              placeholder="예: 12개"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시공 기간 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="duration"
              required
              defaultValue={portfolio?.duration}
              placeholder="예: 1일"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시공 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={portfolio?.description}
            placeholder="시공 내용에 대한 상세 설명을 작성하세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            특징 (한 줄에 하나씩) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="features"
            required
            rows={4}
            defaultValue={portfolio?.features?.join('\n')}
            placeholder="시스템창호 전체 교체&#10;삼중유리 적용&#10;TPS 단열간봉&#10;로이유리 코팅"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none font-mono text-sm"
          />
        </div>
      </div>

      {/* 고객 후기 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">고객 후기</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">평점</label>
            <select
              name="rating"
              defaultValue={portfolio?.rating || 5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="5">★★★★★ (5점)</option>
              <option value="4">★★★★☆ (4점)</option>
              <option value="3">★★★☆☆ (3점)</option>
              <option value="2">★★☆☆☆ (2점)</option>
              <option value="1">★☆☆☆☆ (1점)</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">후기 내용 (선택)</label>
            <textarea
              name="review"
              rows={3}
              defaultValue={portfolio?.review || ''}
              placeholder="고객님의 후기를 입력하세요. (없으면 비워두세요)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 이미지 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">이미지</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* 썸네일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              썸네일 (목록용)
            </label>
            <div className="relative">
              {thumbnailPreview ? (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                  <Image src={thumbnailPreview} alt="썸네일" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setThumbnailPreview(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-sky-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">이미지 선택</span>
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, setThumbnailPreview)}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Before */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시공 전 (Before)
            </label>
            <div className="relative">
              {beforePreview ? (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                  <Image src={beforePreview} alt="시공 전" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setBeforePreview(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-sky-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">이미지 선택</span>
                  <input
                    type="file"
                    name="before"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, setBeforePreview)}
                  />
                </label>
              )}
            </div>
          </div>

          {/* After */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시공 후 (After)
            </label>
            <div className="relative">
              {afterPreview ? (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                  <Image src={afterPreview} alt="시공 후" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setAfterPreview(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-sky-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">이미지 선택</span>
                  <input
                    type="file"
                    name="after"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, setAfterPreview)}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 설정 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">설정</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">공개 여부</label>
            <select
              name="published"
              defaultValue={portfolio?.published ? 'true' : 'false'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="true">공개</option>
              <option value="false">비공개</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">정렬 순서</label>
            <input
              type="number"
              name="displayOrder"
              defaultValue={portfolio?.display_order || 1}
              min={1}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">숫자가 작을수록 먼저 표시됩니다.</p>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '저장 중...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
