'use server';

import { createInquiry } from '@/lib/inquiry-db';

export async function submitInquiryAction(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const inquiryType = formData.get('inquiryType') as string;
  const address = formData.get('address') as string;
  const message = formData.get('message') as string;

  if (!name || !phone || !inquiryType || !message) {
    return { success: false, error: '필수 항목을 입력해주세요.' };
  }

  const result = await createInquiry({
    name,
    phone,
    email: email || undefined,
    inquiry_type: inquiryType,
    address: address || undefined,
    message,
  });

  if (!result) {
    return { success: false, error: '상담 신청 중 오류가 발생했습니다.' };
  }

  return { success: true };
}
