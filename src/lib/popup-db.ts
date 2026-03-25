import { supabase } from './supabase';

export interface PopupRecord {
  id: string;
  title: string;
  image_url: string | null;
  link_url: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  display_order: number;
  popup_width: number | null;
  popup_height: number | null;
  created_at: string;
}

export interface PopupInput {
  title: string;
  image_url?: string | null;
  link_url?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_active?: boolean;
  display_order?: number;
  popup_width?: number | null;
  popup_height?: number | null;
}

export async function getAllPopups(): Promise<PopupRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('popups')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching popups:', error);
    return [];
  }

  return data || [];
}

export async function getActivePopups(): Promise<PopupRecord[]> {
  if (!supabase) {
    console.warn('[Popup] Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('popups')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[Popup] Error fetching active popups:', error);
    return [];
  }

  // 날짜 필터링을 JS에서 처리 (Supabase .or() 체이닝 버그 우회)
  const now = new Date();
  const filtered = (data || []).filter((popup) => {
    if (popup.start_date && new Date(popup.start_date) > now) return false;
    if (popup.end_date && new Date(popup.end_date) < now) return false;
    return true;
  });

  return filtered;
}

export async function getPopupById(id: string): Promise<PopupRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('popups')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching popup:', error);
    return null;
  }

  return data;
}

export async function createPopup(input: PopupInput): Promise<PopupRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('popups')
    .insert([{
      ...input,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating popup:', error);
    return null;
  }

  return data;
}

export async function updatePopup(id: string, input: Partial<PopupInput>): Promise<PopupRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('popups')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating popup:', error);
    return null;
  }

  return data;
}

export async function deletePopup(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('popups')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting popup:', error);
    return false;
  }

  return true;
}
