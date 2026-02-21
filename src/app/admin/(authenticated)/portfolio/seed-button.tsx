'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';
import { seedPortfoliosAction } from './actions';

export default function SeedPortfoliosButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSeed = async () => {
    setLoading(true);
    try {
      const result = await seedPortfoliosAction();
      if (result.success) {
        router.refresh();
      }
    } catch {
      alert('시공사례 불러오기에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSeed}
      disabled={loading}
      className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50"
    >
      <Download className="w-5 h-5" />
      {loading ? '불러오는 중...' : '기존 시공사례 4건 불러오기'}
    </button>
  );
}
