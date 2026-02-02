'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export interface CustomerUpdateInput {
  contract_status?: string;
  contract_date?: string | null;
  construction_date?: string | null;
  construction_status?: string;
  total_amount?: number | null;
  notes?: string;
  status?: string;
  admin_note?: string;
}

export async function updateCustomerAction(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return { success: false, error: 'ID가 누락되었습니다.' };
  }

  if (!supabase) {
    return { success: false, error: 'Supabase가 설정되지 않았습니다.' };
  }

  const updateData: CustomerUpdateInput = {};

  const contract_status = formData.get('contract_status') as string;
  if (contract_status) updateData.contract_status = contract_status;

  const contract_date = formData.get('contract_date') as string;
  updateData.contract_date = contract_date || null;

  const construction_date = formData.get('construction_date') as string;
  updateData.construction_date = construction_date || null;

  const construction_status = formData.get('construction_status') as string;
  if (construction_status) updateData.construction_status = construction_status;

  const total_amount = formData.get('total_amount') as string;
  updateData.total_amount = total_amount ? parseInt(total_amount) : null;

  const notes = formData.get('notes') as string;
  if (notes !== null) updateData.notes = notes;

  const status = formData.get('status') as string;
  if (status) updateData.status = status;

  const admin_note = formData.get('admin_note') as string;
  if (admin_note !== null) updateData.admin_note = admin_note;

  const { error } = await supabase
    .from('inquiries')
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating customer:', error);
    return { success: false, error: '고객 정보 수정에 실패했습니다.' };
  }

  revalidatePath('/admin/customers');
  revalidatePath(`/admin/customers/${id}`);
  return { success: true };
}
