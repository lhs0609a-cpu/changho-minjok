'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldX, Search, X } from 'lucide-react';
import { searchStaff, StaffMember } from '@/lib/constants/staff';

type SearchResult =
  | { status: 'idle' }
  | { status: 'found'; member: StaffMember }
  | { status: 'not_found' };

export default function AdvisorWidget({ embedded = false }: { embedded?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult>({ status: 'idle' });
  const pathname = usePathname();

  // 랜딩 페이지에서는 FloatingCTA에 embedded로 포함되므로 standalone 숨김
  if (!embedded && pathname === '/landing') return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const member = searchStaff(query);
    if (member) {
      setResult({ status: 'found', member });
    } else {
      setResult({ status: 'not_found' });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResult({ status: 'idle' });
  };

  const widgetContent = (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#FF6F0F] border-b border-[#E5630D]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span className="text-base font-bold text-white">
                  어드바이저 조회
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Description */}
            <div className="px-5 pt-4 pb-2">
              <p className="text-xs text-gray-500">
                방문한 담당자가 본사 소속인지 확인하세요
              </p>
            </div>

            {/* Search */}
            <div className="px-4 pb-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="이름 또는 전화번호"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 h-10 text-sm bg-gray-50 border border-gray-200 focus:border-[#FF6F0F] focus:outline-none rounded-lg px-3"
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-[#FF6F0F] hover:bg-[#E5630D] rounded-lg text-white text-sm font-bold transition-colors flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  조회
                </button>
              </form>
            </div>

            {/* Result */}
            <AnimatePresence mode="wait">
              {result.status === 'found' && (
                <motion.div
                  key="found"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-3"
                >
                  <div className="bg-[#FFF3EB] rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#FF6F0F]" />
                      <span className="text-xs font-bold text-[#FF6F0F]">
                        본사 정식 소속 확인됨
                      </span>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {result.member.name}{' '}
                      <span className="font-normal text-gray-500">
                        / {result.member.position}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {result.member.displayPhone}
                    </div>
                  </div>
                </motion.div>
              )}

              {result.status === 'not_found' && (
                <motion.div
                  key="not_found"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-3"
                >
                  <div className="bg-red-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldX className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-bold text-red-500">
                        등록되지 않은 담당자
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      일치하는 본사 소속 어드바이저가 없습니다.
                      본사로 직접 문의해주세요.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 px-5 py-3 bg-[#FF6F0F] rounded-full shadow-lg shadow-[#FF6F0F]/30 hover:bg-[#E5630D] transition-colors text-base font-bold text-white"
      >
        <ShieldCheck className="w-5 h-5" />
        어드바이저 조회
      </motion.button>
    </>
  );

  // embedded 모드: FloatingCTA 스택 안에서 relative로 렌더링
  if (embedded) {
    return <div className="relative">{widgetContent}</div>;
  }

  // standalone 모드: 다른 페이지에서 고정 위치로 렌더링
  return (
    <div className="fixed bottom-20 right-4 md:bottom-28 md:right-8 z-50">
      {widgetContent}
    </div>
  );
}
