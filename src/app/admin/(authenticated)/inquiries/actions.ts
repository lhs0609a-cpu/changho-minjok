'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { updateInquiryStatus, deleteInquiry } from '@/lib/inquiry-db';
import { InquiryRecord } from '@/lib/supabase';

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
