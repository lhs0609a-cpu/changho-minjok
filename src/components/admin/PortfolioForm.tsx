'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, GripVertical } from 'lucide-react';
import { PortfolioRecord } from '@/lib/supabase';

interface ImageSlot {
  preview: string | null;
  existingUrl: string | null;
  newFile: File | null;
}

interface PortfolioFormProps {
  portfolio?: PortfolioRecord;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
}

const SLOT_LABELS = ['썸네일 (목록용)', '시공 전 (Before)', '시공 후 (After)'];

export default function PortfolioForm({ portfolio, action, submitLabel }: PortfolioFormProps) {
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
    { preview: portfolio?.thumbnail_url || null, existingUrl: portfolio?.thumbnail_url || null, newFile: null },
    { preview: portfolio?.before_url || null, existingUrl: portfolio?.before_url || null, newFile: null },
    { preview: portfolio?.after_url || null, existingUrl: portfolio?.after_url || null, newFile: null },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSlots((prev) => {
        const next = [...prev];
        next[index] = { preview: reader.result as string, existingUrl: null, newFile: file };
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClearSlot = (index: number) => {
    setImageSlots((prev) => {
      const next = [...prev];
      next[index] = { preview: null, existingUrl: null, newFile: null };
      return next;
    });
    // file input 초기화
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = '';
    }
  };

  // --- Drag and Drop ---
  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    setImageSlots((prev) => {
      const next = [...prev];
      [next[dragIndex], next[targetIndex]] = [next[targetIndex], next[dragIndex]];
      return next;
    });
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      // imageSlots 기준으로 FormData 오버라이드
      const fieldNames = ['thumbnail', 'before', 'after'] as const;
      const existingFieldNames = ['existingThumbnail', 'existingBefore', 'existingAfter'] as const;

      for (let i = 0; i < 3; i++) {
        const slot = imageSlots[i];

        // 기존 hidden input 값 덮어쓰기
        formData.delete(existingFieldNames[i]);
        formData.set(existingFieldNames[i], slot.existingUrl || '');

        // 파일 덮어쓰기
        formData.delete(fieldNames[i]);
        if (slot.newFile) {
          formData.set(fieldNames[i], slot.newFile);
        } else {
          formData.set(fieldNames[i], new File([], '', { type: 'application/octet-stream' }));
        }
      }

      await action(formData);
    } finally {
      setIsSubmitting(false);
    }
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
            >
              <option value="시스템창호">시스템창호</option>
              <option value="알루미늄 창호">알루미늄 창호</option>
              <option value="PVC창호">PVC창호</option>
              <option value="발코니 창호">발코니 창호</option>
              <option value="이중창">이중창</option>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none resize-none"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none resize-none font-mono text-sm"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* 이미지 (드래그앤드롭) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">이미지</h2>
        <p className="text-sm text-gray-500 mb-6">이미지를 드래그하여 위치를 변경할 수 있습니다.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {imageSlots.map((slot, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {SLOT_LABELS[index]}
              </label>
              <div
                className={`relative transition-all ${
                  dragOverIndex === index && dragIndex !== index
                    ? 'ring-2 ring-blue-400 rounded-xl'
                    : ''
                }`}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(index)}
              >
                {slot.preview ? (
                  <div
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnd={handleDragEnd}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 cursor-grab active:cursor-grabbing ${
                      dragIndex === index ? 'opacity-50' : ''
                    }`}
                  >
                    <Image src={slot.preview} alt={SLOT_LABELS[index]} fill className="object-cover" />
                    <div className="absolute top-2 left-2 p-1 bg-black/40 text-white rounded-lg">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleClearSlot(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-xs text-center py-1">
                      드래그하여 위치 변경
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#EF4444] transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">이미지 선택</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => { fileInputRefs.current[index] = el; }}
                      onChange={(e) => handleImageChange(index, e)}
                    />
                  </label>
                )}
              </div>
            </div>
          ))}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
          className="px-8 py-3 bg-[#EF4444] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '저장 중...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
