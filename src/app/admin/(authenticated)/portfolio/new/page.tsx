import Link from 'next/link';
import { createPortfolioAction } from '../actions';
import PortfolioForm from '@/components/admin/PortfolioForm';
import { ArrowLeft } from 'lucide-react';

export default function NewPortfolioPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/portfolio"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">새 시공사례 등록</h1>
        <p className="text-gray-500 mt-1">새로운 시공사례를 등록합니다.</p>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <PortfolioForm action={createPortfolioAction} submitLabel="등록하기" />
      </div>
    </div>
  );
}
