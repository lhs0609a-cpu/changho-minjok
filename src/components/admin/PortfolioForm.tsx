'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
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

function emptySlot(): ImageSlot {
  return { preview: null, existingUrl: null, newFile: null };
}

/** gallery_urls에서 before/after 이미지를 분리 (기존 데이터 호환) */
function parseGalleryUrls(portfolio?: PortfolioRecord): { beforeUrls: (string | null)[]; afterUrls: (string | null)[] } {
  const beforeUrls: (string | null)[] = [null, null, null];
  const afterUrls: (string | null)[] = [null, null, null];

  if (!portfolio) return { beforeUrls, afterUrls };

  // before_url을 첫 번째 before 슬롯에
  if (portfolio.before_url) beforeUrls[0] = portfolio.before_url;
  // after_url을 첫 번째 after 슬롯에
  if (portfolio.after_url) afterUrls[0] = portfolio.after_url;

  // gallery_urls에서 추가 이미지 파싱
  // gallery_urls 구조: [before들..., after들...] (actions.ts에서 [...beforeUrls, ...afterUrls]로 저장)
  if (portfolio.gallery_urls && portfolio.gallery_urls.length > 0) {
    const gallery = portfolio.gallery_urls.filter((url): url is string => typeof url === 'string' && url.length > 0);

    if (gallery.length > 0 && portfolio.after_url) {
      // after_url의 위치로 before/after 경계를 찾음
      const afterStartIndex = gallery.indexOf(portfolio.after_url);
      if (afterStartIndex > 0) {
        const galleryBefores = gallery.slice(0, afterStartIndex);
        const galleryAfters = gallery.slice(afterStartIndex);
        // 슬롯에 배치 (최대 3장)
        galleryBefores.forEach((url, i) => {
          if (i < 3) beforeUrls[i] = url;
        });
        galleryAfters.forEach((url, i) => {
          if (i < 3) afterUrls[i] = url;
        });
      }
    }
  }

  return { beforeUrls, afterUrls };
}

export default function PortfolioForm({ portfolio, action, submitLabel }: PortfolioFormProps) {
  const { beforeUrls, afterUrls } = parseGalleryUrls(portfolio);

  // 썸네일 (1장)
  const [thumbnailSlot, setThumbnailSlot] = useState<ImageSlot>({
    preview: portfolio?.thumbnail_url || null,
    existingUrl: portfolio?.thumbnail_url || null,
    newFile: null,
  });

  // 시공 전 (3장)
  const [beforeSlots, setBeforeSlots] = useState<ImageSlot[]>(
    beforeUrls.map((url) => ({ preview: url, existingUrl: url, newFile: null }))
  );

  // 시공 후 (3장)
  const [afterSlots, setAfterSlots] = useState<ImageSlot[]>(
    afterUrls.map((url) => ({ preview: url, existingUrl: url, newFile: null }))
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragState, setDragState] = useState<{ group: string; index: number } | null>(null);
  const [dragOverState, setDragOverState] = useState<{ group: string; index: number } | null>(null);

  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const beforeInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);
  const afterInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);

  // ── 파일 → ImageSlot 변환 ──
  const fileToSlot = (file: File): Promise<ImageSlot> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ preview: reader.result as string, existingUrl: null, newFile: file });
      reader.onerror = () => reject(new Error(`파일 읽기 실패: ${file.name}`));
      reader.readAsDataURL(file);
    });

  // ── 단일 파일 선택 (개별 슬롯 클릭) ──
  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<ImageSlot[]>> | React.Dispatch<React.SetStateAction<ImageSlot>>,
    index?: number
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (index !== undefined && files.length === 1) {
      // 단일 파일 → 특정 슬롯
      fileToSlot(files[0]).then((slot) => {
        (setter as React.Dispatch<React.SetStateAction<ImageSlot[]>>)((prev) => {
          const next = [...prev];
          next[index] = slot;
          return next;
        });
      });
    } else if (index !== undefined && files.length > 1) {
      // 다중 파일 → 해당 슬롯부터 빈 슬롯에 순서대로
      const fileArr = Array.from(files).slice(0, 3);
      Promise.all(fileArr.map(fileToSlot)).then((slots) => {
        (setter as React.Dispatch<React.SetStateAction<ImageSlot[]>>)((prev) => {
          const next = [...prev];
          let slotIdx = 0;
          for (let i = 0; i < next.length && slotIdx < slots.length; i++) {
            if (!next[i].preview) {
              next[i] = slots[slotIdx++];
            }
          }
          return next;
        });
      });
    } else {
      // 썸네일 (단일)
      fileToSlot(files[0]).then((slot) => {
        (setter as React.Dispatch<React.SetStateAction<ImageSlot>>)(slot);
      });
    }
  };

  // ── 다중 파일을 그룹 빈 슬롯에 채우기 (드래그 드롭/다중선택) ──
  const fillGroupWithFiles = (
    files: File[],
    setter: React.Dispatch<React.SetStateAction<ImageSlot[]>>
  ) => {
    const imageFiles = files.filter((f) => f.type.startsWith('image/')).slice(0, 3);
    if (imageFiles.length === 0) return;
    Promise.all(imageFiles.map(fileToSlot)).then((slots) => {
      setter((prev) => {
        const next = [...prev];
        let slotIdx = 0;
        for (let i = 0; i < next.length && slotIdx < slots.length; i++) {
          if (!next[i].preview) {
            next[i] = slots[slotIdx++];
          }
        }
        // 빈 슬롯이 부족하면 앞에서부터 덮어쓰기
        if (slotIdx < slots.length) {
          for (let i = 0; i < next.length && slotIdx < slots.length; i++) {
            next[i] = slots[slotIdx++];
          }
        }
        return next;
      });
    });
  };

  // ── 그룹 드롭존: 데스크탑에서 파일 드래그 드롭 ──
  const [fileDropGroup, setFileDropGroup] = useState<string | null>(null);

  const handleGroupFileDragOver = (e: React.DragEvent, group: string) => {
    // 내부 슬롯 드래그 중이면 무시
    if (dragState) return;
    e.preventDefault();
    e.stopPropagation();
    setFileDropGroup(group);
  };

  const handleGroupFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFileDropGroup(null);
  };

  const handleGroupFileDrop = (
    e: React.DragEvent,
    group: string,
    setter: React.Dispatch<React.SetStateAction<ImageSlot[]>> | React.Dispatch<React.SetStateAction<ImageSlot>>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setFileDropGroup(null);
    // 내부 슬롯 드래그 중이면 무시 (슬롯 교환 로직이 처리)
    if (dragState) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    if (group === 'thumbnail') {
      const imgFile = files.find((f) => f.type.startsWith('image/'));
      if (imgFile) {
        fileToSlot(imgFile).then((slot) => {
          (setter as React.Dispatch<React.SetStateAction<ImageSlot>>)(slot);
        });
      }
    } else {
      fillGroupWithFiles(files, setter as React.Dispatch<React.SetStateAction<ImageSlot[]>>);
    }
  };

  const clearSlot = (
    setter: React.Dispatch<React.SetStateAction<ImageSlot[]>> | React.Dispatch<React.SetStateAction<ImageSlot>>,
    index?: number,
    inputRef?: React.RefObject<HTMLInputElement | null> | { current: (HTMLInputElement | null)[] }
  ) => {
    if (index !== undefined) {
      (setter as React.Dispatch<React.SetStateAction<ImageSlot[]>>)((prev) => {
        const next = [...prev];
        next[index] = emptySlot();
        return next;
      });
      if (inputRef && 'current' in inputRef && Array.isArray(inputRef.current)) {
        const el = inputRef.current[index];
        if (el) el.value = '';
      }
    } else {
      (setter as React.Dispatch<React.SetStateAction<ImageSlot>>)(emptySlot());
      if (inputRef && 'current' in inputRef && !Array.isArray(inputRef.current)) {
        const el = (inputRef as React.RefObject<HTMLInputElement | null>).current;
        if (el) el.value = '';
      }
    }
  };

  // ── 드래그앤드롭 (그룹 내에서만) ──
  const handleDragStart = (group: string, index: number) => {
    setDragState({ group, index });
  };

  const handleDragOver = (e: React.DragEvent, group: string, index: number) => {
    e.preventDefault();
    if (dragState?.group === group) {
      setDragOverState({ group, index });
    }
  };

  const handleDragLeave = () => {
    setDragOverState(null);
  };

  const handleDrop = (group: string, targetIndex: number) => {
    if (!dragState || dragState.group !== group || dragState.index === targetIndex) {
      setDragState(null);
      setDragOverState(null);
      return;
    }
    const setter = group === 'before' ? setBeforeSlots : setAfterSlots;
    setter((prev) => {
      const next = [...prev];
      [next[dragState.index], next[targetIndex]] = [next[targetIndex], next[dragState.index]];
      return next;
    });
    setDragState(null);
    setDragOverState(null);
  };

  const handleDragEnd = () => {
    setDragState(null);
    setDragOverState(null);
  };

  // ── FormData 구성 ──
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      // 썸네일
      formData.delete('existingThumbnail');
      formData.set('existingThumbnail', thumbnailSlot.existingUrl || '');
      formData.delete('thumbnail');
      if (thumbnailSlot.newFile) {
        formData.set('thumbnail', thumbnailSlot.newFile);
      } else {
        formData.set('thumbnail', new File([], '', { type: 'application/octet-stream' }));
      }

      // 시공 전 3장
      for (let i = 0; i < 3; i++) {
        const slot = beforeSlots[i];
        formData.set(`existingBefore_${i}`, slot.existingUrl || '');
        if (slot.newFile) {
          formData.set(`before_${i}`, slot.newFile);
        } else {
          formData.set(`before_${i}`, new File([], '', { type: 'application/octet-stream' }));
        }
      }

      // 시공 후 3장
      for (let i = 0; i < 3; i++) {
        const slot = afterSlots[i];
        formData.set(`existingAfter_${i}`, slot.existingUrl || '');
        if (slot.newFile) {
          formData.set(`after_${i}`, slot.newFile);
        } else {
          formData.set(`after_${i}`, new File([], '', { type: 'application/octet-stream' }));
        }
      }

      // 이전 단일 필드 정리
      formData.delete('existingBefore');
      formData.delete('existingAfter');
      formData.delete('before');
      formData.delete('after');

      await action(formData);
    } catch (error) {
      // Next.js redirect()는 특수 에러를 throw하므로 그대로 전파
      if (error instanceof Error && 'digest' in error) {
        throw error;
      }
      console.error('시공사례 저장 중 오류:', error);
      toast.error('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── 이미지 슬롯 렌더러 ──
  const renderSlot = (
    slot: ImageSlot,
    label: string,
    group: string,
    index: number,
    setter: React.Dispatch<React.SetStateAction<ImageSlot[]>>,
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    draggable: boolean
  ) => {
    const isDragging = dragState?.group === group && dragState?.index === index;
    const isDragOver = dragOverState?.group === group && dragOverState?.index === index && !isDragging;

    return (
      <div key={`${group}-${index}`}>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div
          className={`relative transition-all ${isDragOver ? 'ring-2 ring-blue-400 rounded-xl' : ''}`}
          onDragOver={(e) => handleDragOver(e, group, index)}
          onDragLeave={handleDragLeave}
          onDrop={() => handleDrop(group, index)}
        >
          {slot.preview ? (
            <div
              draggable={draggable}
              onDragStart={draggable ? () => handleDragStart(group, index) : undefined}
              onDragEnd={handleDragEnd}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 ${
                draggable ? 'cursor-grab active:cursor-grabbing' : ''
              } ${isDragging ? 'opacity-50' : ''}`}
            >
              <Image src={slot.preview} alt={label} fill className="object-cover" />
              {draggable && (
                <div className="absolute top-2 left-2 p-1 bg-black/40 text-white rounded-lg">
                  <GripVertical className="w-4 h-4" />
                </div>
              )}
              <button
                type="button"
                onClick={() => clearSlot(setter, index, inputRefs)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
              {draggable && (
                <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-xs text-center py-1">
                  드래그하여 순서 변경
                </div>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#EF4444] transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">이미지 선택</span>
              <span className="text-xs text-gray-400 mt-1">또는 파일을 여기로 드래그</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={(el) => { inputRefs.current[index] = el; }}
                onChange={(e) => handleFileSelect(e, setter, index)}
              />
            </label>
          )}
        </div>
      </div>
    );
  };

  return (
    <form action={handleSubmit} className="space-y-8">
      {portfolio && (
        <>
          <input type="hidden" name="id" value={portfolio.id} />
          <input type="hidden" name="slug" value={portfolio.slug} />
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

      {/* 이미지 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">이미지</h2>
          <p className="text-sm text-gray-500">같은 그룹 내에서 이미지를 드래그하여 순서를 변경할 수 있습니다.</p>
        </div>

        {/* 썸네일 */}
        <div
          onDragOver={(e) => handleGroupFileDragOver(e, 'thumbnail')}
          onDragLeave={handleGroupFileDragLeave}
          onDrop={(e) => handleGroupFileDrop(e, 'thumbnail', setThumbnailSlot)}
          className={`p-4 -m-4 rounded-xl transition-all ${fileDropGroup === 'thumbnail' ? 'bg-blue-50 ring-2 ring-blue-300 ring-dashed' : ''}`}
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            썸네일 (목록용)
          </h3>
          <div className="grid grid-cols-3 gap-4 max-w-xs">
            <div>
              {thumbnailSlot.preview ? (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                  <Image src={thumbnailSlot.preview} alt="썸네일" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => clearSlot(setThumbnailSlot, undefined, thumbnailInputRef)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#EF4444] transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">선택</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={thumbnailInputRef}
                    onChange={(e) => handleFileSelect(e, setThumbnailSlot)}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* 시공 전 */}
        <div
          onDragOver={(e) => handleGroupFileDragOver(e, 'before')}
          onDragLeave={handleGroupFileDragLeave}
          onDrop={(e) => {
            // 내부 슬롯 드래그인 경우 그룹 핸들러에서 무시 (개별 슬롯이 처리)
            if (dragState) return;
            handleGroupFileDrop(e, 'before', setBeforeSlots);
          }}
          className={`p-4 -m-4 rounded-xl transition-all ${fileDropGroup === 'before' ? 'bg-blue-50 ring-2 ring-blue-300 ring-dashed' : ''}`}
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            시공 전 (Before) — 최대 3장
            <span className="text-xs text-gray-400 font-normal ml-2">파일을 드래그하여 한번에 추가 가능</span>
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {beforeSlots.map((slot, i) =>
              renderSlot(slot, `시공 전 ${i + 1}`, 'before', i, setBeforeSlots, beforeInputRefs, true)
            )}
          </div>
        </div>

        {/* 시공 후 */}
        <div
          onDragOver={(e) => handleGroupFileDragOver(e, 'after')}
          onDragLeave={handleGroupFileDragLeave}
          onDrop={(e) => {
            if (dragState) return;
            handleGroupFileDrop(e, 'after', setAfterSlots);
          }}
          className={`p-4 -m-4 rounded-xl transition-all ${fileDropGroup === 'after' ? 'bg-blue-50 ring-2 ring-blue-300 ring-dashed' : ''}`}
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            시공 후 (After) — 최대 3장
            <span className="text-xs text-gray-400 font-normal ml-2">파일을 드래그하여 한번에 추가 가능</span>
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {afterSlots.map((slot, i) =>
              renderSlot(slot, `시공 후 ${i + 1}`, 'after', i, setAfterSlots, afterInputRefs, true)
            )}
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
