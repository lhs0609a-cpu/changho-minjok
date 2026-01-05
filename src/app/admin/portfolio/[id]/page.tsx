import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { verifyAdmin } from '@/lib/auth';
import { getPortfolioById } from '@/lib/portfolio-db';
import { updatePortfolioAction, deletePortfolioAction } from '../actions';
import PortfolioForm from '@/components/admin/PortfolioForm';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPortfolioPage({ params }: PageProps) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect('/admin');
  }

  const { id } = await params;
  const portfolio = await getPortfolioById(id);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link
              href="/admin/portfolio"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로
            </Link>
            <h1 className="text-xl font-bold text-gray-900">시공사례 수정</h1>
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
              className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              삭제
            </button>
          </form>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <PortfolioForm
          portfolio={portfolio}
          action={updatePortfolioAction}
          submitLabel="수정하기"
        />
      </main>
    </div>
  );
}
