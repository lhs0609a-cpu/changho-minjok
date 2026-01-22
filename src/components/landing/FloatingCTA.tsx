'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants/navigation';

export default function FloatingCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t-2 border-gray-100 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex gap-2 sm:gap-3">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 h-12 sm:h-14 bg-[#1E1E1E] text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            바로 전화
          </a>
          <a
            href="#contact-form"
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 h-12 sm:h-14 bg-[#FF6F0F] text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-[#FF6F0F]/30"
          >
            30초 견적 받기
          </a>
        </div>
      </div>

      {/* Desktop Floating Buttons */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 flex flex-col gap-3 mb-3"
            >
              {/* Phone Button */}
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-3 px-5 py-3 bg-[#1E1E1E] text-white rounded-full shadow-lg hover:bg-[#292929] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-bold whitespace-nowrap">{COMPANY_INFO.phone}</span>
              </a>

              {/* KakaoTalk Button */}
              <a
                href={COMPANY_INFO.kakaoChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-full shadow-lg hover:bg-[#F5DC00] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-bold whitespace-nowrap">카카오톡 상담</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
            isExpanded ? 'bg-[#1E1E1E]' : 'bg-[#2AC1BC]'
          }`}
        >
          {isExpanded ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
        </motion.button>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="hidden md:flex fixed bottom-8 left-8 w-12 h-12 rounded-full bg-white border-2 border-gray-200 items-center justify-center shadow-lg hover:border-[#2AC1BC] transition-colors z-50"
          >
            <ArrowUp className="w-5 h-5 text-[#1E1E1E]" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
