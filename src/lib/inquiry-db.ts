import { supabase, InquiryRecord, InquiryInput } from './supabase';

export async function getAllInquiries(): Promise<InquiryRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }

  return data || [];
}

export async function getInquiryById(id: string): Promise<InquiryRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching inquiry:', error);
    return null;
  }

  return data;
}

export async function createInquiry(input: InquiryInput): Promise<{ data: InquiryRecord | null; error: string | null }> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return { data: null, error: 'Supabase가 설정되지 않았습니다.' };
  }

  const { data, error } = await supabase
    .from('inquiries')
    .insert([{
      ...input,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating inquiry:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryRecord['status'],
  admin_note?: string
): Promise<InquiryRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const updateData: { status: string; admin_note?: string; updated_at: string } = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (admin_note !== undefined) {
    updateData.admin_note = admin_note;
  }

  const { data, error } = await supabase
    .from('inquiries')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating inquiry:', error);
    return null;
  }

  return data;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting inquiry:', error);
    return false;
  }

  return true;
}

export async function getInquiryStats(): Promise<{
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
}> {
  if (!supabase) {
    return { total: 0, pending: 0, in_progress: 0, completed: 0 };
  }

  const { data, error } = await supabase
    .from('inquiries')
    .select('status');

  if (error || !data) {
    return { total: 0, pending: 0, in_progress: 0, completed: 0 };
  }

  return {
    total: data.length,
    pending: data.filter(d => d.status === 'pending').length,
    in_progress: data.filter(d => d.status === 'in_progress').length,
    completed: data.filter(d => d.status === 'completed').length,
  };
}
