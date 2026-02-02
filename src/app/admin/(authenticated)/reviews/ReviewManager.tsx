'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReviewRecord } from '@/lib/review-db';
import {
  createReviewAction,
  updateReviewAction,
  deleteReviewAction,
  toggleReviewApprovalAction,
  toggleReviewBestAction,
} from './actions';
import {
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Star,
  Award,
  Save,
  X,
  Loader2,
} from 'lucide-react';

interface ReviewManagerProps {
  initialReviews: ReviewRecord[];
}

export default function ReviewManager({ initialReviews }: ReviewManagerProps) {
  const router = useRouter();
  const [reviews] = useState(initialReviews);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    let result;
    if (editingReview) {
      formData.append('id', editingReview.id);
      result = await updateReviewAction(formData);
    } else {
      result = await createReviewAction(formData);
    }

    setIsLoading(false);

    if (result.success) {
      setIsFormOpen(false);
      setEditingReview(null);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleEdit = (review: ReviewRecord) => {
    setEditingReview(review);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const formData = new FormData();
    formData.append('id', id);
    await deleteReviewAction(formData);
    router.refresh();
  };

  const handleToggleApproval = async (id: string, is_approved: boolean) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('is_approved', String(is_approved));
    await toggleReviewApprovalAction(formData);
    router.refresh();
  };

  const handleToggleBest = async (id: string, is_best: boolean) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('is_best', String(is_best));
    await toggleReviewBestAction(formData);
    router.refresh();
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingReview(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2.5 rounded-xl hover:bg-sky-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        새 후기
      </button>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingReview ? '후기 수정' : '새 후기 등록'}
              </h2>
              <button onClick={closeForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  고객명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customer_name"
                  defaultValue={editingReview?.customer_name || ''}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  placeholder="고객명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  평점
                </label>
                <select
                  name="rating"
                  defaultValue={editingReview?.rating || 5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                >
                  <option value={5}>5점</option>
                  <option value={4}>4점</option>
                  <option value={3}>3점</option>
                  <option value={2}>2점</option>
                  <option value={1}>1점</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  후기 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  defaultValue={editingReview?.content || ''}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
                  placeholder="후기 내용을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    승인 상태
                  </label>
                  <select
                    name="is_approved"
                    defaultValue={editingReview?.is_approved ? 'true' : 'false'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  >
                    <option value="false">대기</option>
                    <option value="true">승인</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    베스트 후기
                  </label>
                  <select
                    name="is_best"
                    defaultValue={editingReview?.is_best ? 'true' : 'false'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  >
                    <option value="false">일반</option>
                    <option value="true">베스트</option>
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

      {/* Review List */}
      {reviews.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">등록된 후기가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white rounded-2xl shadow-sm p-6 ${
                review.is_best ? 'ring-2 ring-amber-400' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">{review.customer_name}</span>
                    <div className="flex items-center">{renderStars(review.rating)}</div>
                    {review.is_best && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                        <Award className="w-3 h-3" />
                        베스트
                      </span>
                    )}
                    {review.is_approved ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        승인됨
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                        <Clock className="w-3 h-3" />
                        대기중
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>

                  <div className="mt-3 text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString('ko-KR')}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggleApproval(review.id, review.is_approved)}
                    className={`p-2 rounded-lg transition-colors ${
                      review.is_approved
                        ? 'text-green-600 bg-green-50 hover:bg-green-100'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={review.is_approved ? '승인 취소' : '승인'}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleToggleBest(review.id, review.is_best)}
                    className={`p-2 rounded-lg transition-colors ${
                      review.is_best
                        ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={review.is_best ? '베스트 해제' : '베스트 지정'}
                  >
                    <Award className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(review)}
                    className="p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="수정"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
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
