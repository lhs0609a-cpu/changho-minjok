'use server';

import { revalidatePath } from 'next/cache';
import { createAdvisor, updateAdvisor, deleteAdvisor } from '@/lib/advisor-db';

export async function createAdvisorAction(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const position = formData.get('position') as string;
  const is_active = formData.get('is_active') === 'true';
  const display_order = parseInt(formData.get('display_order') as string) || 0;

  if (!name || !phone) {
    return { success: false, error: '이름과 전화번호는 필수입니다.' };
  }

  const advisor = await createAdvisor({
    name,
    phone,
    email: email || '',
    position: position || '',
    is_active,
    display_order,
  });

  if (!advisor) {
    return { success: false, error: '어드바이저 생성에 실패했습니다.' };
  }

  revalidatePath('/admin/advisors');
  return { success: true };
}

export async function updateAdvisorAction(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const position = formData.get('position') as string;
  const is_active = formData.get('is_active') === 'true';
  const display_order = parseInt(formData.get('display_order') as string) || 0;

  if (!id || !name || !phone) {
    return { success: false, error: '필수 정보가 누락되었습니다.' };
  }

  const advisor = await updateAdvisor(id, {
    name,
    phone,
    email: email || '',
    position: position || '',
    is_active,
    display_order,
  });

  if (!advisor) {
    return { success: false, error: '어드바이저 수정에 실패했습니다.' };
  }

  revalidatePath('/admin/advisors');
  return { success: true };
}

export async function deleteAdvisorAction(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return { success: false, error: 'ID가 누락되었습니다.' };
  }

  const success = await deleteAdvisor(id);

  if (!success) {
    return { success: false, error: '어드바이저 삭제에 실패했습니다.' };
  }

  revalidatePath('/admin/advisors');
  return { success: true };
}

export async function toggleAdvisorActiveAction(formData: FormData) {
  const id = formData.get('id') as string;
  const is_active = formData.get('is_active') === 'true';

  if (!id) {
    return { success: false, error: 'ID가 누락되었습니다.' };
  }

  const advisor = await updateAdvisor(id, { is_active: !is_active });

  if (!advisor) {
    return { success: false, error: '상태 변경에 실패했습니다.' };
  }

  revalidatePath('/admin/advisors');
  return { success: true };
}
