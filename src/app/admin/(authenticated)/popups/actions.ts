'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPopup, updatePopup, deletePopup } from '@/lib/popup-db';

export async function createPopupAction(formData: FormData) {
  const title = formData.get('title') as string;
  const image_url = formData.get('image_url') as string;
  const link_url = formData.get('link_url') as string;
  const start_date = formData.get('start_date') as string;
  const end_date = formData.get('end_date') as string;
  const is_active = formData.get('is_active') === 'true';
  const display_order = parseInt(formData.get('display_order') as string) || 1;

  if (!title) {
    return { success: false, error: '제목을 입력해주세요.' };
  }

  const popup = await createPopup({
    title,
    image_url: image_url || undefined,
    link_url: link_url || undefined,
    start_date: start_date || undefined,
    end_date: end_date || undefined,
    is_active,
    display_order,
  });

  if (!popup) {
    return { success: false, error: '팝업 생성에 실패했습니다.' };
  }

  revalidatePath('/admin/popups');
  redirect('/admin/popups');
}

export async function updatePopupAction(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const image_url = formData.get('image_url') as string;
  const link_url = formData.get('link_url') as string;
  const start_date = formData.get('start_date') as string;
  const end_date = formData.get('end_date') as string;
  const is_active = formData.get('is_active') === 'true';
  const display_order = parseInt(formData.get('display_order') as string) || 1;

  if (!id || !title) {
    return { success: false, error: '필수 정보가 누락되었습니다.' };
  }

  const popup = await updatePopup(id, {
    title,
    image_url: image_url || undefined,
    link_url: link_url || undefined,
    start_date: start_date || undefined,
    end_date: end_date || undefined,
    is_active,
    display_order,
  });

  if (!popup) {
    return { success: false, error: '팝업 수정에 실패했습니다.' };
  }

  revalidatePath('/admin/popups');
  redirect('/admin/popups');
}

export async function deletePopupAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;

  if (!id) {
    return;
  }

  await deletePopup(id);
  revalidatePath('/admin/popups');
}

export async function togglePopupStatusAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  const is_active = formData.get('is_active') === 'true';

  if (!id) {
    return;
  }

  await updatePopup(id, { is_active: !is_active });
  revalidatePath('/admin/popups');
}
