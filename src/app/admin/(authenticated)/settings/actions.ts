'use server';

import { revalidatePath } from 'next/cache';
import { updateSettings } from '@/lib/settings-db';

export async function saveSettingsAction(formData: FormData) {
  const settings: Record<string, string> = {};

  const keys = [
    'company_name',
    'phone',
    'email',
    'address',
    'kakao_channel',
    'instagram',
    'youtube',
    'business_hours',
  ];

  keys.forEach((key) => {
    const value = formData.get(key);
    if (value !== null) {
      settings[key] = value as string;
    }
  });

  const success = await updateSettings(settings);

  if (success) {
    revalidatePath('/admin/settings');
    return { success: true };
  }

  return { success: false, error: '설정 저장에 실패했습니다.' };
}
