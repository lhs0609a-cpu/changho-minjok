'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl text-[#EF4444]">!</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          오류가 발생했습니다
        </h1>
        <p className="text-gray-500 mb-8">
          페이지를 불러오는 중 문제가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#EF4444] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-colors"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
