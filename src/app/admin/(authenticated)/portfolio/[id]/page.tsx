import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPortfolioById } from '@/lib/portfolio-db';
import { updatePortfolioAction, deletePortfolioAction } from '../actions';
import PortfolioForm from '@/components/admin/PortfolioForm';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPortfolioPage({ params }: PageProps) {
  const { id } = await params;
  const portfolio = await getPortfolioById(id);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin/portfolio"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">시공사례 수정</h1>
          <p className="text-gray-500 mt-1">시공사례 정보를 수정합니다.</p>
        </div>
        <form action={deletePortfolioAction}>
          <input type="hidden" name="id" value={portfolio.id} />
          <button
            type="submit"
            onClick={(e) => {
              if (!confirm('정말 삭제하시겠습니까?')) {
                e.preventDefault();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            삭제
          </button>
        </form>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <PortfolioForm
          portfolio={portfolio}
          action={updatePortfolioAction}
          submitLabel="수정하기"
        />
      </div>
    </div>
  );
}
