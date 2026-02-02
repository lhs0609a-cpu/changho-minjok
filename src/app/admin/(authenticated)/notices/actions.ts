'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createNotice, updateNotice, deleteNotice } from '@/lib/notice-db';

export async function createNoticeAction(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const is_pinned = formData.get('is_pinned') === 'true';
  const is_active = formData.get('is_active') === 'true';

  if (!title || !content) {
    return { success: false, error: '제목과 내용을 입력해주세요.' };
  }

  const notice = await createNotice({
    title,
    content,
    is_pinned,
    is_active,
  });

  if (!notice) {
    return { success: false, error: '공지사항 생성에 실패했습니다.' };
  }

  revalidatePath('/admin/notices');
  redirect('/admin/notices');
}

export async function updateNoticeAction(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const is_pinned = formData.get('is_pinned') === 'true';
  const is_active = formData.get('is_active') === 'true';

  if (!id || !title || !content) {
    return { success: false, error: '필수 정보가 누락되었습니다.' };
  }

  const notice = await updateNotice(id, {
    title,
    content,
    is_pinned,
    is_active,
  });

  if (!notice) {
    return { success: false, error: '공지사항 수정에 실패했습니다.' };
  }

  revalidatePath('/admin/notices');
  redirect('/admin/notices');
}

export async function deleteNoticeAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;

  if (!id) {
    return;
  }

  await deleteNotice(id);
  revalidatePath('/admin/notices');
}

export async function toggleNoticePinnedAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  const is_pinned = formData.get('is_pinned') === 'true';

  if (!id) {
    return;
  }

  await updateNotice(id, { is_pinned: !is_pinned });
  revalidatePath('/admin/notices');
}

export async function toggleNoticeActiveAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  const is_active = formData.get('is_active') === 'true';

  if (!id) {
    return;
  }

  await updateNotice(id, { is_active: !is_active });
  revalidatePath('/admin/notices');
}
