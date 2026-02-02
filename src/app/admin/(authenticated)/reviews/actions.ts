'use server';

import { revalidatePath } from 'next/cache';
import { createReview, updateReview, deleteReview } from '@/lib/review-db';

export async function createReviewAction(formData: FormData) {
  const customer_name = formData.get('customer_name') as string;
  const content = formData.get('content') as string;
  const rating = parseInt(formData.get('rating') as string) || 5;
  const portfolio_id = formData.get('portfolio_id') as string;
  const is_approved = formData.get('is_approved') === 'true';
  const is_best = formData.get('is_best') === 'true';

  if (!customer_name || !content) {
    return { success: false, error: '고객명과 내용을 입력해주세요.' };
  }

  const review = await createReview({
    customer_name,
    content,
    rating,
    portfolio_id: portfolio_id || undefined,
    is_approved,
    is_best,
  });

  if (!review) {
    return { success: false, error: '후기 생성에 실패했습니다.' };
  }

  revalidatePath('/admin/reviews');
  return { success: true };
}

export async function updateReviewAction(formData: FormData) {
  const id = formData.get('id') as string;
  const customer_name = formData.get('customer_name') as string;
  const content = formData.get('content') as string;
  const rating = parseInt(formData.get('rating') as string) || 5;
  const portfolio_id = formData.get('portfolio_id') as string;
  const is_approved = formData.get('is_approved') === 'true';
  const is_best = formData.get('is_best') === 'true';

  if (!id || !customer_name || !content) {
    return { success: false, error: '필수 정보가 누락되었습니다.' };
  }

  const review = await updateReview(id, {
    customer_name,
    content,
    rating,
    portfolio_id: portfolio_id || undefined,
    is_approved,
    is_best,
  });

  if (!review) {
    return { success: false, error: '후기 수정에 실패했습니다.' };
  }

  revalidatePath('/admin/reviews');
  return { success: true };
}

export async function deleteReviewAction(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return { success: false, error: 'ID가 누락되었습니다.' };
  }

  const success = await deleteReview(id);

  if (!success) {
    return { success: false, error: '후기 삭제에 실패했습니다.' };
  }

  revalidatePath('/admin/reviews');
  return { success: true };
}

export async function toggleReviewApprovalAction(formData: FormData) {
  const id = formData.get('id') as string;
  const is_approved = formData.get('is_approved') === 'true';

  if (!id) {
    return { success: false, error: 'ID가 누락되었습니다.' };
  }

  const review = await updateReview(id, { is_approved: !is_approved });

  if (!review) {
    return { success: false, error: '상태 변경에 실패했습니다.' };
  }

  revalidatePath('/admin/reviews');
  return { success: true };
}

export async function toggleReviewBestAction(formData: FormData) {
  const id = formData.get('id') as string;
  const is_best = formData.get('is_best') === 'true';

  if (!id) {
    return { success: false, error: 'ID가 누락되었습니다.' };
  }

  const review = await updateReview(id, { is_best: !is_best });

  if (!review) {
    return { success: false, error: '상태 변경에 실패했습니다.' };
  }

  revalidatePath('/admin/reviews');
  return { success: true };
}
