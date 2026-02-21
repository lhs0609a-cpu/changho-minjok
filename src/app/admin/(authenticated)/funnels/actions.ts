'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  createStep,
  deleteStepsByTemplateId,
} from '@/lib/funnel-db';

export async function createFunnelAction(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const is_active = formData.get('is_active') === 'true';
  const stepsJson = formData.get('steps') as string;

  if (!name) {
    return { success: false, error: '퍼널 이름을 입력해주세요.' };
  }

  const template = await createTemplate({ name, description, is_active });

  if (!template) {
    return { success: false, error: '퍼널 생성에 실패했습니다.' };
  }

  // 단계 생성
  if (stepsJson) {
    const steps = JSON.parse(stepsJson) as Array<{
      delay_hours: number;
      title: string;
      message: string;
      channel: 'kakao' | 'sms' | 'email';
      link_url?: string;
    }>;

    for (let i = 0; i < steps.length; i++) {
      await createStep({
        template_id: template.id,
        step_order: i + 1,
        delay_hours: steps[i].delay_hours,
        title: steps[i].title,
        message: steps[i].message,
        channel: steps[i].channel,
        link_url: steps[i].link_url,
      });
    }
  }

  revalidatePath('/admin/funnels');
  redirect('/admin/funnels');
}

export async function updateFunnelAction(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const is_active = formData.get('is_active') === 'true';
  const stepsJson = formData.get('steps') as string;

  if (!id || !name) {
    return { success: false, error: '필수 정보가 누락되었습니다.' };
  }

  const template = await updateTemplate(id, { name, description, is_active });

  if (!template) {
    return { success: false, error: '퍼널 수정에 실패했습니다.' };
  }

  // 기존 스텝 삭제 후 재생성
  if (stepsJson) {
    await deleteStepsByTemplateId(id);

    const steps = JSON.parse(stepsJson) as Array<{
      delay_hours: number;
      title: string;
      message: string;
      channel: 'kakao' | 'sms' | 'email';
      link_url?: string;
    }>;

    for (let i = 0; i < steps.length; i++) {
      await createStep({
        template_id: id,
        step_order: i + 1,
        delay_hours: steps[i].delay_hours,
        title: steps[i].title,
        message: steps[i].message,
        channel: steps[i].channel,
        link_url: steps[i].link_url,
      });
    }
  }

  revalidatePath('/admin/funnels');
  redirect('/admin/funnels');
}

export async function deleteFunnelAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;

  if (!id) {
    return;
  }

  await deleteTemplate(id);
  revalidatePath('/admin/funnels');
}

export async function toggleFunnelActiveAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  const is_active = formData.get('is_active') === 'true';

  if (!id) {
    return;
  }

  await updateTemplate(id, { is_active: !is_active });
  revalidatePath('/admin/funnels');
}
