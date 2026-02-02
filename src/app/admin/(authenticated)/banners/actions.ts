'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createBanner, updateBanner, deleteBanner } from '@/lib/banner-db';

export async function createBannerAction(formData: FormData) {
  const title = formData.get('title') as string;
  const image_url = formData.get('image_url') as string;
  const mobile_image_url = formData.get('mobile_image_url') as string;
  const link_url = formData.get('link_url') as string;
  const location = formData.get('location') as string;
  const is_active = formData.get('is_active') === 'true';
  const display_order = parseInt(formData.get('display_order') as string) || 1;

  if (!title || !image_url) {
    return { success: false, error: '제목과 이미지 URL을 입력해주세요.' };
  }

  const banner = await createBanner({
    title,
    image_url,
    mobile_image_url: mobile_image_url || undefined,
    link_url: link_url || undefined,
    location: location || 'main',
    is_active,
    display_order,
  });

  if (!banner) {
    return { success: false, error: '배너 생성에 실패했습니다.' };
  }

  revalidatePath('/admin/banners');
  redirect('/admin/banners');
}

export async function updateBannerAction(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const image_url = formData.get('image_url') as string;
  const mobile_image_url = formData.get('mobile_image_url') as string;
  const link_url = formData.get('link_url') as string;
  const location = formData.get('location') as string;
  const is_active = formData.get('is_active') === 'true';
  const display_order = parseInt(formData.get('display_order') as string) || 1;

  if (!id || !title || !image_url) {
    return { success: false, error: '필수 정보가 누락되었습니다.' };
  }

  const banner = await updateBanner(id, {
    title,
    image_url,
    mobile_image_url: mobile_image_url || undefined,
    link_url: link_url || undefined,
    location: location || 'main',
    is_active,
    display_order,
  });

  if (!banner) {
    return { success: false, error: '배너 수정에 실패했습니다.' };
  }

  revalidatePath('/admin/banners');
  redirect('/admin/banners');
}

export async function deleteBannerAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;

  if (!id) {
    return;
  }

  await deleteBanner(id);
  revalidatePath('/admin/banners');
}

export async function toggleBannerStatusAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  const is_active = formData.get('is_active') === 'true';

  if (!id) {
    return;
  }

  await updateBanner(id, { is_active: !is_active });
  revalidatePath('/admin/banners');
}
