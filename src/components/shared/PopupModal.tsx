'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Popup {
  id: string;
  title: string;
  image_url: string | null;
  link_url: string | null;
}

interface PopupModalProps {
  popups: Popup[];
}

const HIDE_POPUP_KEY = 'hidePopupUntil';

export default function PopupModal({ popups }: PopupModalProps) {
  const [visiblePopups, setVisiblePopups] = useState<Popup[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 로컬 스토리지에서 숨김 설정 확인
    const hideUntil = localStorage.getItem(HIDE_POPUP_KEY);
    if (hideUntil) {
      const hideDate = new Date(hideUntil);
      if (hideDate > new Date()) {
        return; // 아직 숨김 기간 중
      }
    }

    setVisiblePopups(popups);
  }, [popups]);

  if (visiblePopups.length === 0) {
    return null;
  }

  const currentPopup = visiblePopups[currentIndex];

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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Content */}
        <div
          className={currentPopup.link_url ? 'cursor-pointer' : ''}
          onClick={handleClick}
        >
          {currentPopup.image_url ? (
            <div className="relative aspect-[4/5]">
              <Image
                src={currentPopup.image_url}
                alt={currentPopup.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900">{currentPopup.title}</h2>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100">
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
                className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors"
              >
                {currentIndex < visiblePopups.length - 1 ? '다음' : '닫기'}
              </button>
            </div>
          )}

          {visiblePopups.length === 1 && (
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors"
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
