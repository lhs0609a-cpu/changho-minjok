'use server';

import { revalidatePath } from 'next/cache';
import { createFAQ, updateFAQ, deleteFAQ } from '@/lib/faq-db';

export async function createFAQAction(formData: FormData) {
  const question = formData.get('question') as string;
  const answer = formData.get('answer') as string;
  const category = formData.get('category') as string;
  const is_active = formData.get('is_active') === 'true';
  const display_order = parseInt(formData.get('display_order') as string) || 1;

  if (!question || !answer) {
    return { success: false, error: '질문과 답변을 입력해주세요.' };
  }

  const faq = await createFAQ({
    question,
    answer,
    category: category || 'general',
    is_active,
    display_order,
  });

  if (!faq) {
    return { success: false, error: 'FAQ 생성에 실패했습니다.' };
  }

  revalidatePath('/admin/faqs');
  return { success: true };
}

export async function updateFAQAction(formData: FormData) {
  const id = formData.get('id') as string;
  const question = formData.get('question') as string;
  const answer = formData.get('answer') as string;
  const category = formData.get('category') as string;
  const is_active = formData.get('is_active') === 'true';
  const display_order = parseInt(formData.get('display_order') as string) || 1;

  if (!id || !question || !answer) {
    return { success: false, error: '필수 정보가 누락되었습니다.' };
  }

  const faq = await updateFAQ(id, {
    question,
    answer,
    category: category || 'general',
    is_active,
    display_order,
  });

  if (!faq) {
    return { success: false, error: 'FAQ 수정에 실패했습니다.' };
  }

  revalidatePath('/admin/faqs');
  return { success: true };
}

export async function deleteFAQAction(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return { success: false, error: 'ID가 누락되었습니다.' };
  }

  const success = await deleteFAQ(id);

  if (!success) {
    return { success: false, error: 'FAQ 삭제에 실패했습니다.' };
  }

  revalidatePath('/admin/faqs');
  return { success: true };
}

export async function toggleFAQStatusAction(formData: FormData) {
  const id = formData.get('id') as string;
  const is_active = formData.get('is_active') === 'true';

  if (!id) {
    return { success: false, error: 'ID가 누락되었습니다.' };
  }

  const faq = await updateFAQ(id, { is_active: !is_active });

  if (!faq) {
    return { success: false, error: '상태 변경에 실패했습니다.' };
  }

  revalidatePath('/admin/faqs');
  return { success: true };
}
