'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="font-pretendard antialiased">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-[#EF4444]">!</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              페이지를 불러올 수 없습니다
            </h1>
            <p className="text-gray-500 mb-8">
              일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-[#EF4444] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
