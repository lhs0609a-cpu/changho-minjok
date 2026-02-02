'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCustomerAction } from '../actions';
import {
  Save,
  Loader2,
  FileText,
  Hammer,
  Wallet,
} from 'lucide-react';

interface CustomerData {
  id: string;
  status: string;
  admin_note: string | null;
  contract_status?: string;
  contract_date?: string;
  construction_date?: string;
  construction_status?: string;
  total_amount?: number;
  notes?: string;
}

interface CustomerDetailFormProps {
  customer: CustomerData;
}

export default function CustomerDetailForm({ customer }: CustomerDetailFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateCustomerAction(formData);

    setIsLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: '정보가 저장되었습니다.' });
      router.refresh();
    } else {
      setMessage({ type: 'error', text: result.error || '저장에 실패했습니다.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="id" value={customer.id} />

      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 상담 관리 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          상담 관리
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상담 상태
            </label>
            <select
              name="status"
              defaultValue={customer.status}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="pending">대기중</option>
              <option value="in_progress">처리중</option>
              <option value="completed">완료</option>
              <option value="cancelled">취소</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              계약 상태
            </label>
            <select
              name="contract_status"
              defaultValue={customer.contract_status || 'inquiry'}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="inquiry">상담중</option>
              <option value="quoted">견적제출</option>
              <option value="negotiating">협상중</option>
              <option value="contracted">계약완료</option>
              <option value="cancelled">취소</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              관리자 메모
            </label>
            <textarea
              name="admin_note"
              defaultValue={customer.admin_note || ''}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
              placeholder="상담 관련 메모를 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* 계약 정보 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          계약 정보
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              계약일
            </label>
            <input
              type="date"
              name="contract_date"
              defaultValue={customer.contract_date || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              계약 금액 (원)
            </label>
            <input
              type="number"
              name="total_amount"
              defaultValue={customer.total_amount || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* 시공 정보 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Hammer className="w-5 h-5" />
          시공 정보
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시공 예정일
            </label>
            <input
              type="date"
              name="construction_date"
              defaultValue={customer.construction_date || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시공 상태
            </label>
            <select
              name="construction_status"
              defaultValue={customer.construction_status || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            >
              <option value="">선택 안함</option>
              <option value="pending">대기</option>
              <option value="scheduled">예정</option>
              <option value="in_progress">진행중</option>
              <option value="completed">완료</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비고
            </label>
            <textarea
              name="notes"
              defaultValue={customer.notes || ''}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
              placeholder="계약/시공 관련 특이사항을 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        정보 저장
      </button>
    </form>
  );
}
