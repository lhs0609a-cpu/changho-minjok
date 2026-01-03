"use client";

import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";

export default function KakaoFloating() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* 확장 메뉴 */}
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-2 duration-200">
          {/* 전화 상담 */}
          <a
            href="tel:1668-1453"
            className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-10 h-10 bg-seal rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="pr-2">
              <p className="text-xs text-muted">전화 상담</p>
              <p className="font-bold text-ink">1668-1453</p>
            </div>
          </a>

          {/* 카카오톡 상담 */}
          <a
            href="https://pf.kakao.com/_changhominjok"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-10 h-10 bg-[#FEE500] rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#391B1B]" />
            </div>
            <div className="pr-2">
              <p className="text-xs text-muted">카카오톡</p>
              <p className="font-bold text-ink">채팅 상담</p>
            </div>
          </a>
        </div>
      )}

      {/* 메인 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          isOpen
            ? "w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center bg-gray-600"
            : "w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center bg-[#FEE500] hover:scale-105"
        }
        aria-label={isOpen ? "닫기" : "상담하기"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-[#391B1B]" />
        )}
      </button>
    </div>
  );
}
