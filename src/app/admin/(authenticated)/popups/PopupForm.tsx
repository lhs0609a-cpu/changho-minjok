'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PopupRecord } from '@/lib/popup-db';
import { uploadImageClient } from '@/lib/upload-client';
import { createPopupAction, updatePopupAction } from './actions';
import {
  ArrowLeft,
  Save,
  Loader2,
  Image as ImageIcon,
  Upload,
  X,
  Monitor,
  Smartphone,
  Maximize2,
} from 'lucide-react';

interface PopupFormProps {
  popup?: PopupRecord;
}

const SIZE_PRESETS = [
  { label: '작게 (320×400)', width: 320, height: 400, icon: Smartphone },
  { label: '보통 (400×500)', width: 400, height: 500, icon: Monitor },
  { label: '크게 (500×625)', width: 500, height: 625, icon: Maximize2 },
  { label: '직접 설정', width: 0, height: 0, icon: null },
];

export default function PopupForm({ popup }: PopupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(popup?.image_url || '');
  const [isDragging, setIsDragging] = useState(false);
  const [popupWidth, setPopupWidth] = useState(popup?.popup_width || 400);
  const [popupHeight, setPopupHeight] = useState(popup?.popup_height || 500);
  const [activePreset, setActivePreset] = useState<number>(() => {
    const w = popup?.popup_width || 400;
    const h = popup?.popup_height || 500;
    const idx = SIZE_PRESETS.findIndex(p => p.width === w && p.height === h);
    return idx >= 0 ? idx : 3;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditing = !!popup;

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB 이하만 가능합니다.');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImageClient(file, 'popups');
      setImageUrl(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  const handlePresetSelect = (index: number) => {
    setActivePreset(index);
    const preset = SIZE_PRESETS[index];
    if (preset.width > 0) {
      setPopupWidth(preset.width);
      setPopupHeight(preset.height);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set('image_url', imageUrl);
    formData.set('popup_width', String(popupWidth));
    formData.set('popup_height', String(popupHeight));

    try {
      const result = isEditing
        ? await updatePopupAction(formData)
        : await createPopupAction(formData);

      if (result && !result.success) {
        alert(result.error || '저장에 실패했습니다.');
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  };

  // 미리보기 스케일 계산 (미리보기 영역 최대 360px 기준)
  const previewMaxWidth = 360;
  const previewScale = Math.min(1, previewMaxWidth / popupWidth);
  const previewDisplayWidth = popupWidth * previewScale;
  const previewDisplayHeight = popupHeight * previewScale;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEditing && <input type="hidden" name="id" value={popup.id} />}

      {/* 이미지 업로드 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          이미지
        </h2>

        {/* 드래그앤드랍 영역 */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
            ${isDragging
              ? 'border-[#EF4444] bg-red-50 scale-[1.01]'
              : 'border-gray-300 hover:border-[#EF4444] hover:bg-gray-50'
            }
            ${imageUrl ? 'p-3' : 'p-8'}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 className="w-10 h-10 text-[#EF4444] animate-spin" />
              <p className="text-sm text-gray-600">이미지 업로드 중...</p>
            </div>
          ) : imageUrl ? (
            <div className="relative group">
              <div className="relative w-full aspect-[4/5] max-w-xs mx-auto rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="팝업 이미지 미리보기"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all rounded-lg flex items-center justify-center">
                <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                  클릭하여 이미지 변경
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImageUrl('');
                }}
                className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-base font-medium text-gray-700">
                  이미지를 드래그하여 놓거나 클릭하세요
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  PNG, JPG, GIF, WebP (최대 10MB)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* URL 직접 입력 */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-500 mb-1.5">
            또는 이미지 URL 직접 입력
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none text-sm"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* hidden input for form submission */}
        <input type="hidden" name="image_url" value={imageUrl} />
      </div>

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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="팝업 제목을 입력하세요"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="클릭 시 이동할 URL을 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* 팝업 크기 설정 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">팝업 크기</h2>

        {/* 프리셋 버튼 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {SIZE_PRESETS.map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handlePresetSelect(i)}
              className={`
                flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-sm
                ${activePreset === i
                  ? 'border-[#EF4444] bg-red-50 text-[#EF4444]'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }
              `}
            >
              {preset.icon && <preset.icon className="w-5 h-5" />}
              <span className="font-medium">{preset.label}</span>
            </button>
          ))}
        </div>

        {/* 크기 슬라이더 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">가로 (px)</label>
              <span className="text-sm font-bold text-[#EF4444]">{popupWidth}px</span>
            </div>
            <input
              type="range"
              min={200}
              max={800}
              step={10}
              value={popupWidth}
              onChange={(e) => {
                setPopupWidth(Number(e.target.value));
                setActivePreset(3);
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#EF4444]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>200</span>
              <span>500</span>
              <span>800</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">세로 (px)</label>
              <span className="text-sm font-bold text-[#EF4444]">{popupHeight}px</span>
            </div>
            <input
              type="range"
              min={200}
              max={900}
              step={10}
              value={popupHeight}
              onChange={(e) => {
                setPopupHeight(Number(e.target.value));
                setActivePreset(3);
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#EF4444]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>200</span>
              <span>550</span>
              <span>900</span>
            </div>
          </div>
        </div>

        {/* 실시간 미리보기 */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-3">
            실시간 미리보기
            {previewScale < 1 && (
              <span className="text-xs text-gray-400 ml-2">
                ({Math.round(previewScale * 100)}% 축소)
              </span>
            )}
          </h3>
          <div className="flex justify-center">
            <div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
              style={{
                width: previewDisplayWidth,
                height: previewDisplayHeight,
              }}
            >
              {/* 닫기 버튼 미리보기 */}
              <div className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-gray-400" />
              </div>

              {/* 이미지 또는 플레이스홀더 */}
              {imageUrl ? (
                <div className="w-full h-[calc(100%-44px)] relative">
                  <Image
                    src={imageUrl}
                    alt="미리보기"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full h-[calc(100%-44px)] bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-xs">이미지 없음</p>
                  </div>
                </div>
              )}

              {/* 하단 바 미리보기 */}
              <div className="absolute bottom-0 left-0 right-0 h-[44px] bg-white border-t border-gray-100 flex items-center justify-between px-3">
                <span className="text-[10px] text-gray-400">오늘 하루 보지 않기</span>
                <span className="text-[10px] text-white bg-[#EF4444] px-2 py-1 rounded">닫기</span>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            실제 팝업 크기: {popupWidth} × {popupHeight}px
          </p>
        </div>

        <input type="hidden" name="popup_width" value={popupWidth} />
        <input type="hidden" name="popup_height" value={popupHeight} />
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상태
            </label>
            <select
              name="is_active"
              defaultValue={popup?.is_active !== false ? 'true' : 'false'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
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
          className="inline-flex items-center gap-2 bg-[#EF4444] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#DC2626] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
