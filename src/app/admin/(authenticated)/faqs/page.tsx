import { getAllFAQs } from '@/lib/faq-db';
import FAQManager from './FAQManager';

export const dynamic = 'force-dynamic';

export default async function AdminFAQsPage() {
  const faqs = await getAllFAQs();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">FAQ 관리</h1>
        <p className="text-gray-500 mt-1">자주 묻는 질문을 관리합니다.</p>
      </div>

      <FAQManager initialFaqs={faqs} />
    </div>
  );
}
