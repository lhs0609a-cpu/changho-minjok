'use client';

import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl text-red-500">!</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          오류가 발생했습니다
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          작업 중 문제가 발생했습니다. 다시 시도해주세요.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-[#EF4444] text-white font-medium rounded-xl hover:bg-[#DC2626] transition-colors text-sm"
          >
            다시 시도
          </button>
          <Link
            href="/admin/dashboard"
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            대시보드
          </Link>
        </div>
      </div>
    </div>
  );
}
