'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { updateInquiryStatus, deleteInquiry } from '@/lib/inquiry-db';
import { InquiryRecord } from '@/lib/supabase';
import {
  startCustomerFunnel,
  pauseFunnel,
  resumeFunnel,
  stopFunnel,
  getStepsByTemplateId,
  updateCustomerFunnel,
} from '@/lib/funnel-db';
import { initializeFunnel } from '@/lib/funnel-processor';

export async function updateInquiryStatusAction(formData: FormData) {
  const id = formData.get('id') as string;
  const status = formData.get('status') as InquiryRecord['status'];
  const adminNote = formData.get('admin_note') as string | null;

  if (!id || !status) {
    return;
  }

  await updateInquiryStatus(id, status, adminNote || undefined);

  revalidatePath('/admin/inquiries');
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function deleteInquiryAction(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return;
  }

  await deleteInquiry(id);

  revalidatePath('/admin/inquiries');
  redirect('/admin/inquiries');
}

export async function startFunnelAction(formData: FormData) {
  const inquiryId = formData.get('inquiry_id') as string;
  const templateId = formData.get('template_id') as string;

  if (!inquiryId || !templateId) {
    return;
  }

  const steps = await getStepsByTemplateId(templateId);

  const customerFunnel = await startCustomerFunnel({
    inquiry_id: inquiryId,
    template_id: templateId,
    total_steps: steps.length,
  });

  // 퍼널 생성 후 첫 스텝의 delay_hours 기반으로 next_send_at 설정
  if (customerFunnel) {
    await initializeFunnel(customerFunnel.id, templateId);
  }

  revalidatePath('/admin/inquiries');
  revalidatePath(`/admin/inquiries/${inquiryId}`);
}

export async function pauseFunnelAction(formData: FormData) {
  const funnelId = formData.get('funnel_id') as string;
  const inquiryId = formData.get('inquiry_id') as string;

  if (!funnelId) return;

  await pauseFunnel(funnelId);

  revalidatePath('/admin/inquiries');
  if (inquiryId) revalidatePath(`/admin/inquiries/${inquiryId}`);
}

export async function resumeFunnelAction(formData: FormData) {
  const funnelId = formData.get('funnel_id') as string;
  const inquiryId = formData.get('inquiry_id') as string;

  if (!funnelId) return;

  const resumed = await resumeFunnel(funnelId);

  // next_send_at이 null이면 Cron이 잡을 수 없으므로 즉시 발송되도록 설정
  if (resumed && !resumed.next_send_at) {
    await updateCustomerFunnel(funnelId, {
      next_send_at: new Date().toISOString(),
    });
  }

  revalidatePath('/admin/inquiries');
  if (inquiryId) revalidatePath(`/admin/inquiries/${inquiryId}`);
}

export async function stopFunnelAction(formData: FormData) {
  const funnelId = formData.get('funnel_id') as string || formData.get('id') as string;
  const inquiryId = formData.get('inquiry_id') as string;

  if (!funnelId) return;

  await stopFunnel(funnelId);

  revalidatePath('/admin/inquiries');
  if (inquiryId) revalidatePath(`/admin/inquiries/${inquiryId}`);
}
