import { supabase } from './supabase';

export interface BannerRecord {
  id: string;
  title: string;
  image_url: string;
  mobile_image_url: string | null;
  link_url: string | null;
  location: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface BannerInput {
  title: string;
  image_url: string;
  mobile_image_url?: string;
  link_url?: string;
  location?: string;
  is_active?: boolean;
  display_order?: number;
}

export async function getAllBanners(): Promise<BannerRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching banners:', error);
    return [];
  }

  return data || [];
}

export async function getActiveBanners(location: string = 'main'): Promise<BannerRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .eq('location', location)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching active banners:', error);
    return [];
  }

  return data || [];
}

export async function getBannerById(id: string): Promise<BannerRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching banner:', error);
    return null;
  }

  return data;
}

export async function createBanner(input: BannerInput): Promise<BannerRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('banners')
    .insert([{
      ...input,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating banner:', error);
    return null;
  }

  return data;
}

export async function updateBanner(id: string, input: Partial<BannerInput>): Promise<BannerRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('banners')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating banner:', error);
    return null;
  }

  return data;
}

export async function deleteBanner(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('banners')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting banner:', error);
    return false;
  }

  return true;
}
