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
        step_order: i,
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

  if (stepsJson) {
    let steps: Array<{
      delay_hours: number;
      title: string;
      message: string;
      channel: 'kakao' | 'sms' | 'email';
      link_url?: string;
    }>;

    try {
      steps = JSON.parse(stepsJson);
    } catch {
      return { success: false, error: '단계 데이터가 올바르지 않습니다.' };
    }

    await deleteStepsByTemplateId(id);

    for (let i = 0; i < steps.length; i++) {
      await createStep({
        template_id: id,
        step_order: i,
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

export async function createSampleFunnelAction() {
  const template = await createTemplate({
    name: '신규 문의 자동 응대 (샘플)',
    description: '문의가 들어오면 자동으로 3번 메시지를 보내는 기본 퍼널입니다. 내용을 자유롭게 수정해서 사용하세요!',
    is_active: true,
  });

  if (!template) {
    redirect('/admin/funnels?error=sample-create-failed');
  }

  const sampleSteps = [
    {
      step_order: 0,
      delay_hours: 0,
      title: '상담 접수 안내',
      message: '안녕하세요, 창호의민족입니다!\n상담 문의를 접수해 주셔서 감사합니다.\n전문 상담사가 빠르게 연락드리겠습니다.\n\n- 창호의민족 드림',
      channel: 'kakao' as const,
    },
    {
      step_order: 1,
      delay_hours: 24,
      title: '추가 안내 메시지',
      message: '안녕하세요, 창호의민족입니다.\n어제 문의해 주신 창호 시공 관련하여 궁금한 점이 있으신가요?\n무료 현장 방문 견적도 가능합니다!\n\n편하신 시간에 연락 주세요.',
      channel: 'kakao' as const,
    },
    {
      step_order: 2,
      delay_hours: 72,
      title: '특별 혜택 안내',
      message: '창호의민족에서 특별 혜택을 안내드립니다!\n이번 달 시공 시 로이유리 무상 업그레이드 혜택이 있습니다.\n자세한 내용은 상담사에게 문의해 주세요.\n\n- 창호의민족 드림',
      channel: 'kakao' as const,
    },
  ];

  for (const step of sampleSteps) {
    await createStep({
      template_id: template.id,
      ...step,
    });
  }

  revalidatePath('/admin/funnels');
  redirect(`/admin/funnels/${template.id}`);
}
