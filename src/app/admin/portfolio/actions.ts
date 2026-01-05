'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { verifyAdmin } from '@/lib/auth';
import { createPortfolio, updatePortfolio, deletePortfolio, uploadImage } from '@/lib/portfolio-db';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[가-힣]/g, '') // 한글 제거
    .replace(/[^a-z0-9\s-]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/-+/g, '-') // 연속 하이픈 제거
    .trim()
    .replace(/^-|-$/g, '') // 앞뒤 하이픈 제거
    || `portfolio-${Date.now()}`; // 빈 문자열이면 기본값
}

export async function createPortfolioAction(formData: FormData): Promise<void> {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    redirect('/admin');
  }

  const title = formData.get('title') as string;
  const location = formData.get('location') as string;
  const buildingType = formData.get('buildingType') as string;
  const product = formData.get('product') as string;
  const rating = parseInt(formData.get('rating') as string) || 5;
  const date = formData.get('date') as string;
  const description = formData.get('description') as string;
  const area = formData.get('area') as string;
  const windowCount = formData.get('windowCount') as string;
  const duration = formData.get('duration') as string;
  const featuresRaw = formData.get('features') as string;
  const review = formData.get('review') as string;
  const published = formData.get('published') === 'true';
  const displayOrder = parseInt(formData.get('displayOrder') as string) || 1;

  // 이미지 업로드
  const thumbnail = formData.get('thumbnail') as File;
  const before = formData.get('before') as File;
  const after = formData.get('after') as File;

  let thumbnailUrl = null;
  let beforeUrl = null;
  let afterUrl = null;

  const slug = generateSlug(title) + '-' + Date.now().toString().slice(-6);

  if (thumbnail && thumbnail.size > 0) {
    thumbnailUrl = await uploadImage(thumbnail, slug);
  }
  if (before && before.size > 0) {
    beforeUrl = await uploadImage(before, slug);
  }
  if (after && after.size > 0) {
    afterUrl = await uploadImage(after, slug);
  }

  const features = featuresRaw
    .split('\n')
    .map((f) => f.trim())
    .filter((f) => f.length > 0);

  const result = await createPortfolio({
    slug,
    title,
    location,
    building_type: buildingType,
    product,
    rating,
    date,
    description,
    area,
    window_count: windowCount,
    duration,
    features,
    review: review || undefined,
    thumbnail_url: thumbnailUrl || undefined,
    before_url: beforeUrl || undefined,
    after_url: afterUrl || undefined,
    gallery_urls: [],
    published,
    display_order: displayOrder,
  });

  if (!result) {
    redirect('/admin/portfolio?error=create-failed');
  }

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  redirect('/admin/portfolio');
}

export async function updatePortfolioAction(formData: FormData): Promise<void> {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    redirect('/admin');
  }

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const title = formData.get('title') as string;
  const location = formData.get('location') as string;
  const buildingType = formData.get('buildingType') as string;
  const product = formData.get('product') as string;
  const rating = parseInt(formData.get('rating') as string) || 5;
  const date = formData.get('date') as string;
  const description = formData.get('description') as string;
  const area = formData.get('area') as string;
  const windowCount = formData.get('windowCount') as string;
  const duration = formData.get('duration') as string;
  const featuresRaw = formData.get('features') as string;
  const review = formData.get('review') as string;
  const published = formData.get('published') === 'true';
  const displayOrder = parseInt(formData.get('displayOrder') as string) || 1;

  // 기존 이미지 URL
  const existingThumbnail = formData.get('existingThumbnail') as string;
  const existingBefore = formData.get('existingBefore') as string;
  const existingAfter = formData.get('existingAfter') as string;

  // 새 이미지 업로드
  const thumbnail = formData.get('thumbnail') as File;
  const before = formData.get('before') as File;
  const after = formData.get('after') as File;

  let thumbnailUrl = existingThumbnail || null;
  let beforeUrl = existingBefore || null;
  let afterUrl = existingAfter || null;

  if (thumbnail && thumbnail.size > 0) {
    thumbnailUrl = await uploadImage(thumbnail, slug);
  }
  if (before && before.size > 0) {
    beforeUrl = await uploadImage(before, slug);
  }
  if (after && after.size > 0) {
    afterUrl = await uploadImage(after, slug);
  }

  const features = featuresRaw
    .split('\n')
    .map((f) => f.trim())
    .filter((f) => f.length > 0);

  const result = await updatePortfolio(id, {
    title,
    location,
    building_type: buildingType,
    product,
    rating,
    date,
    description,
    area,
    window_count: windowCount,
    duration,
    features,
    review: review || undefined,
    thumbnail_url: thumbnailUrl || undefined,
    before_url: beforeUrl || undefined,
    after_url: afterUrl || undefined,
    published,
    display_order: displayOrder,
  });

  if (!result) {
    redirect('/admin/portfolio?error=update-failed');
  }

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  revalidatePath(`/portfolio/${slug}`);
  redirect('/admin/portfolio');
}

export async function deletePortfolioAction(formData: FormData): Promise<void> {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    redirect('/admin');
  }

  const id = formData.get('id') as string;

  const result = await deletePortfolio(id);

  if (!result) {
    redirect('/admin/portfolio?error=delete-failed');
  }

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  redirect('/admin/portfolio');
}
