'use server';

import { createInquiry } from '@/lib/inquiry-db';

export async function submitLandingInquiryAction(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const message = formData.get('message') as string;

  if (!name || !phone) {
    return { success: false, error: '이름과 연락처는 필수입니다.' };
  }

  const result = await createInquiry({
    name,
    phone,
    inquiry_type: 'estimate', // 랜딩페이지는 기본적으로 견적 문의
    address: address || undefined,
    message: message || '랜딩페이지 견적 문의',
  });

  if (!result) {
    return { success: false, error: '상담 신청 중 오류가 발생했습니다.' };
  }

  return { success: true };
}
