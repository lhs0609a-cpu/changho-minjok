'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createPortfolio, updatePortfolio, deletePortfolio, uploadImage, getAllPortfoliosFromDB } from '@/lib/portfolio-db';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[가-힣]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-|-$/g, '')
    || `portfolio-${Date.now()}`;
}

export async function createPortfolioAction(formData: FormData): Promise<void> {
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

  const features = (featuresRaw || '')
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
    review: review || null,
    thumbnail_url: thumbnailUrl || null,
    before_url: beforeUrl || null,
    after_url: afterUrl || null,
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

  const existingThumbnail = formData.get('existingThumbnail') as string;
  const existingBefore = formData.get('existingBefore') as string;
  const existingAfter = formData.get('existingAfter') as string;

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

  const features = (featuresRaw || '')
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
    review: review || null,
    thumbnail_url: thumbnailUrl || null,
    before_url: beforeUrl || null,
    after_url: afterUrl || null,
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
  const id = formData.get('id') as string;

  const result = await deletePortfolio(id);

  if (!result) {
    redirect('/admin/portfolio?error=delete-failed');
  }

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  redirect('/admin/portfolio');
}

const seedPortfolios = [
  {
    slug: 'yangjung-hyundai',
    title: '부산 아파트 창호 전체 교체',
    location: '부산 소재',
    building_type: '아파트',
    product: '발코니 창호',
    rating: 5,
    date: '2024년 12월',
    description: '이사 전 리모델링을 위한 아파트 창호 교체 공사. 노후 단창 구조를 고성능 창호로 교체해 외풍·결로·소음 문제를 개선하고, 하루 시공으로 단열 성능과 주거 쾌적성을 크게 향상시킨 현장입니다.',
    area: '84㎡ (34평형)',
    window_count: '12개',
    duration: '1일',
    features: ['휴그린 창호 적용', '로이(Low-E) 복층유리', '외풍·결로·소음 개선', '하루 시공 완료'],
    review: '이사 전에 창호를 교체했는데 정말 잘한 것 같아요. 단열이 확실히 좋아졌고, 시공도 하루만에 깔끔하게 끝나서 만족합니다.',
    thumbnail_url: '/images/portfolio/yangjung-hyundai/thumbnail.jpg',
    before_url: '/images/portfolio/yangjung-hyundai/before-1.jpg',
    after_url: '/images/portfolio/yangjung-hyundai/after-1.jpg',
    gallery_urls: [
      '/images/portfolio/yangjung-hyundai/before-1.jpg',
      '/images/portfolio/yangjung-hyundai/before-2.jpg',
      '/images/portfolio/yangjung-hyundai/after-1.jpg',
      '/images/portfolio/yangjung-hyundai/after-2.jpg',
    ],
    published: true,
    display_order: 1,
  },
  {
    slug: 'cheongdo-house',
    title: '경북 단독주택 이중창 교체',
    location: '경북 소재',
    building_type: '단독주택',
    product: '이중창',
    rating: 5,
    date: '2024년 12월',
    description: '거주 중 주택 단창에서 이중창으로 교체 공사. 노후 단창 구조를 고성능 이중창으로 교체해 외풍·소음·결로 문제를 개선하고, 거주 중 시공으로 생활 불편을 최소화하며 단열과 난방 효율을 크게 향상시킨 현장입니다.',
    area: '132㎡ (40평형)',
    window_count: '15개',
    duration: '2일',
    features: ['이중창 교체', '브론즈 로이(Low-E) 복층유리', '주방 발코니창호', '거주 중 시공'],
    review: '겨울에 외풍이 심해서 고민이었는데, 이중창으로 교체하고 나니 확실히 따뜻해졌어요. 거주하면서 시공했는데 불편함 없이 잘 진행됐습니다.',
    thumbnail_url: '/images/portfolio/cheongdo-house/thumbnail.jpg',
    before_url: '/images/portfolio/cheongdo-house/before-1.jpg',
    after_url: '/images/portfolio/cheongdo-house/after-1.jpg',
    gallery_urls: [
      '/images/portfolio/cheongdo-house/before-1.jpg',
      '/images/portfolio/cheongdo-house/before-2.jpg',
      '/images/portfolio/cheongdo-house/after-1.jpg',
      '/images/portfolio/cheongdo-house/after-2.jpg',
    ],
    published: true,
    display_order: 2,
  },
  {
    slug: 'towol-sungwon',
    title: '경남 아파트 창호 교체',
    location: '경남 소재',
    building_type: '아파트',
    product: '발코니 창호',
    rating: 5,
    date: '2024년 11월',
    description: '이사 전 올수리 과정에서 진행한 아파트 창호 교체 공사. 이사 전 사전 점검을 통해 외풍·소음·결로 문제를 개선하고, 로이 복층유리와 자동손잡이 옵션을 적용해 단열 성능과 사용 편의성을 동시에 높인 시공 사례입니다.',
    area: '105㎡ (32평형)',
    window_count: '14개',
    duration: '1일',
    features: ['KCC 발코니창호', 'LOW-E 로이 복층유리', '자동손잡이(오토핸들)', '이사 전 올수리'],
    review: '올수리하면서 창호도 같이 교체했어요. 자동손잡이가 정말 편리하고, 단열도 확실히 좋아졌습니다. KCC 제품이라 믿음이 갔어요.',
    thumbnail_url: '/images/portfolio/towol-sungwon/thumbnail.jpg',
    before_url: '/images/portfolio/towol-sungwon/before-1.jpg',
    after_url: '/images/portfolio/towol-sungwon/after-1.jpg',
    gallery_urls: [
      '/images/portfolio/towol-sungwon/before-1.jpg',
      '/images/portfolio/towol-sungwon/before-2.jpg',
      '/images/portfolio/towol-sungwon/after-1.jpg',
      '/images/portfolio/towol-sungwon/after-2.jpg',
    ],
    published: true,
    display_order: 3,
  },
  {
    slug: 'dongwon-royalduke',
    title: '부산 아파트 창호 교체',
    location: '부산 소재',
    building_type: '아파트',
    product: '발코니 창호',
    rating: 5,
    date: '2024년 12월',
    description: '비거주 세대 아파트 창호 교체 공사. 맞춤 제작을 통해 기밀성과 단열 성능을 강화하고, 외풍 차단 및 에너지 효율 개선에 중점을 둔 시공입니다.',
    area: '116㎡ (35평형)',
    window_count: '10개',
    duration: '1일',
    features: ['KCC 창호', '로이(Low-E) 복층유리', '아르곤 가스 충진', '맞춤 제작'],
    review: '아르곤 가스 충진까지 해주셔서 단열 효과가 확실합니다. 맞춤 제작으로 딱 맞게 시공해주셔서 기밀성도 좋아요.',
    thumbnail_url: '/images/portfolio/dongwon-royalduke/thumbnail.jpg',
    before_url: '/images/portfolio/dongwon-royalduke/before-1.jpg',
    after_url: '/images/portfolio/dongwon-royalduke/after-1.jpg',
    gallery_urls: [
      '/images/portfolio/dongwon-royalduke/before-1.jpg',
      '/images/portfolio/dongwon-royalduke/before-2.jpg',
      '/images/portfolio/dongwon-royalduke/after-1.jpg',
      '/images/portfolio/dongwon-royalduke/after-2.jpg',
    ],
    published: true,
    display_order: 4,
  },
];

export async function seedPortfoliosAction(): Promise<{ success: boolean; count: number }> {
  const existing = await getAllPortfoliosFromDB();
  const existingSlugs = new Set(existing.map((p) => p.slug));

  let insertedCount = 0;

  for (const portfolio of seedPortfolios) {
    if (existingSlugs.has(portfolio.slug)) continue;

    const result = await createPortfolio(portfolio);
    if (result) insertedCount++;
  }

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  revalidatePath('/');

  return { success: true, count: insertedCount };
}
