'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Popup {
  id: string;
  title: string;
  image_url: string | null;
  link_url: string | null;
  popup_width?: number | null;
  popup_height?: number | null;
}

interface PopupModalProps {
  popups: Popup[];
}

const HIDE_POPUP_KEY = 'hidePopupUntil';

export default function PopupModal({ popups }: PopupModalProps) {
  const [visiblePopups, setVisiblePopups] = useState<Popup[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const hideUntil = localStorage.getItem(HIDE_POPUP_KEY);
    if (hideUntil) {
      const hideDate = new Date(hideUntil);
      if (hideDate > new Date()) {
        return;
      }
    }

    setVisiblePopups(popups);
  }, [popups]);

  if (visiblePopups.length === 0) {
    return null;
  }

  const currentPopup = visiblePopups[currentIndex];
  const maxW = currentPopup.popup_width || 500;

  const handleClose = () => {
    setVisiblePopups([]);
  };

  const handleHideToday = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    localStorage.setItem(HIDE_POPUP_KEY, tomorrow.toISOString());
    setVisiblePopups([]);
  };

  const handleNext = () => {
    if (currentIndex < visiblePopups.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleClose();
    }
  };

  const handleClick = () => {
    if (currentPopup.link_url) {
      window.open(currentPopup.link_url, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          maxWidth: `min(${maxW}px, calc(100vw - 2rem))`,
          maxHeight: 'calc(100vh - 2rem)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Content - 이미지 원본 비율 유지, 화면에 맞게 축소 */}
        <div
          className={`overflow-auto flex-1 min-h-0 ${currentPopup.link_url ? 'cursor-pointer' : ''}`}
          onClick={handleClick}
        >
          {currentPopup.image_url ? (
            <img
              src={currentPopup.image_url}
              alt={currentPopup.title}
              className="w-full h-auto block"
            />
          ) : (
            <div className="flex items-center justify-center min-h-[200px]">
              <h2 className="text-xl font-bold text-gray-900 p-8 text-center">
                {currentPopup.title}
              </h2>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 shrink-0">
          <button
            onClick={handleHideToday}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            오늘 하루 보지 않기
          </button>

          {visiblePopups.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {currentIndex + 1} / {visiblePopups.length}
              </span>
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-[#EF4444] rounded-lg hover:bg-[#DC2626] transition-colors"
              >
                {currentIndex < visiblePopups.length - 1 ? '다음' : '닫기'}
              </button>
            </div>
          )}

          {visiblePopups.length === 1 && (
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-white bg-[#EF4444] rounded-lg hover:bg-[#DC2626] transition-colors"
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
