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
  created_at: string;
}

export interface PopupInput {
  title: string;
  image_url?: string;
  link_url?: string;
  start_date?: string;
  end_date?: string;
  is_active?: boolean;
  display_order?: number;
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
    console.warn('Supabase not configured');
    return [];
  }

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('popups')
    .select('*')
    .eq('is_active', true)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching active popups:', error);
    return [];
  }

  return data || [];
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
