'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FAQRecord } from '@/lib/faq-db';
import {
  createFAQAction,
  updateFAQAction,
  deleteFAQAction,
  toggleFAQStatusAction,
} from './actions';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  HelpCircle,
  Save,
  X,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const categoryLabels: Record<string, string> = {
  general: '일반',
  product: '제품',
  installation: '시공',
  price: '가격',
  as: 'A/S',
};

interface FAQManagerProps {
  initialFaqs: FAQRecord[];
}

export default function FAQManager({ initialFaqs }: FAQManagerProps) {
  const router = useRouter();
  const [faqs, setFaqs] = useState(initialFaqs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    let result;
    if (editingFaq) {
      formData.append('id', editingFaq.id);
      result = await updateFAQAction(formData);
    } else {
      result = await createFAQAction(formData);
    }

    setIsLoading(false);

    if (result.success) {
      setIsFormOpen(false);
      setEditingFaq(null);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleEdit = (faq: FAQRecord) => {
    setEditingFaq(faq);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const formData = new FormData();
    formData.append('id', id);
    await deleteFAQAction(formData);
    router.refresh();
  };

  const handleToggleStatus = async (id: string, is_active: boolean) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('is_active', String(is_active));
    await toggleFAQStatusAction(formData);
    router.refresh();
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingFaq(null);
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-xl hover:bg-sky-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        새 FAQ
      </button>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingFaq ? 'FAQ 수정' : '새 FAQ 등록'}
              </h2>
              <button onClick={closeForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리
                </label>
                <select
                  name="category"
                  defaultValue={editingFaq?.category || 'general'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  질문 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="question"
                  defaultValue={editingFaq?.question || ''}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  placeholder="질문을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  답변 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="answer"
                  defaultValue={editingFaq?.answer || ''}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
                  placeholder="답변을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    순서
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingFaq?.display_order || 1}
                    min={1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상태
                  </label>
                  <select
                    name="is_active"
                    defaultValue={editingFaq?.is_active !== false ? 'true' : 'false'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  >
                    <option value="true">활성</option>
                    <option value="false">비활성</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-xl hover:bg-sky-600 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ List */}
      {faqs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">등록된 FAQ가 없습니다.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-4">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="mt-1 p-1 hover:bg-gray-100 rounded"
                >
                  {expandedId === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {categoryLabels[faq.category] || faq.category}
                    </span>
                    <span className="text-xs text-gray-400">순서: {faq.display_order}</span>
                  </div>
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>

                  {expandedId === faq.id && (
                    <p className="mt-3 text-gray-600 text-sm whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">
                      {faq.answer}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(faq.id, faq.is_active)}
                    className={`p-2 rounded-lg transition-colors ${
                      faq.is_active
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={faq.is_active ? '비활성화' : '활성화'}
                  >
                    {faq.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleEdit(faq)}
                    className="p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="수정"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
