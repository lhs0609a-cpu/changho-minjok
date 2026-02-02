import { getAllReviews, getReviewStats } from '@/lib/review-db';
import ReviewManager from './ReviewManager';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  const [reviews, stats] = await Promise.all([
    getAllReviews(),
    getReviewStats(),
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">후기/리뷰 관리</h1>
        <p className="text-gray-500 mt-1">고객 후기를 관리하고 승인합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">전체</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-green-600">승인됨</p>
          <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-yellow-600">대기중</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-amber-600">평균 평점</p>
          <p className="text-2xl font-bold text-amber-700">{stats.avgRating} / 5</p>
        </div>
      </div>

      <ReviewManager initialReviews={reviews} />
    </div>
  );
}
