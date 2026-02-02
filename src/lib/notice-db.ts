import { supabase } from './supabase';

export interface NoticeRecord {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  is_active: boolean;
  view_count: number;
  created_at: string;
}

export interface NoticeInput {
  title: string;
  content: string;
  is_pinned?: boolean;
  is_active?: boolean;
}

export async function getAllNotices(): Promise<NoticeRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notices:', error);
    return [];
  }

  return data || [];
}

export async function getActiveNotices(): Promise<NoticeRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('is_active', true)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching active notices:', error);
    return [];
  }

  return data || [];
}

export async function getNoticeById(id: string): Promise<NoticeRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching notice:', error);
    return null;
  }

  return data;
}

export async function createNotice(input: NoticeInput): Promise<NoticeRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('notices')
    .insert([{
      ...input,
      view_count: 0,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating notice:', error);
    return null;
  }

  return data;
}

export async function updateNotice(id: string, input: Partial<NoticeInput>): Promise<NoticeRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('notices')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating notice:', error);
    return null;
  }

  return data;
}

export async function deleteNotice(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('notices')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting notice:', error);
    return false;
  }

  return true;
}

export async function incrementViewCount(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase.rpc('increment_notice_view_count', { notice_id: id });

  if (error) {
    // Fallback: increment manually
    const notice = await getNoticeById(id);
    if (notice) {
      const { error: updateError } = await supabase
        .from('notices')
        .update({ view_count: notice.view_count + 1 })
        .eq('id', id);

      return !updateError;
    }
    return false;
  }

  return true;
}
