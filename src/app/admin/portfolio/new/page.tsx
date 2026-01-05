import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyAdmin } from '@/lib/auth';
import { createPortfolioAction } from '../actions';
import PortfolioForm from '@/components/admin/PortfolioForm';
import { ArrowLeft } from 'lucide-react';

export default async function NewPortfolioPage() {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/admin/portfolio"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Link>
          <h1 className="text-xl font-bold text-gray-900">새 시공사례 등록</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <PortfolioForm action={createPortfolioAction} submitLabel="등록하기" />
      </main>
    </div>
  );
}
