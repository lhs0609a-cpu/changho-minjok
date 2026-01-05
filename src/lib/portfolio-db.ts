import { supabase, isSupabaseConfigured, PortfolioRecord, PortfolioInput } from './supabase';

export async function getAllPortfoliosFromDB(): Promise<PortfolioRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching portfolios:', error);
    return [];
  }

  return data || [];
}

export async function getPublishedPortfolios(): Promise<PortfolioRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching portfolios:', error);
    return [];
  }

  return data || [];
}

export async function getPortfolioById(id: string): Promise<PortfolioRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching portfolio:', error);
    return null;
  }

  return data;
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching portfolio:', error);
    return null;
  }

  return data;
}

export async function createPortfolio(input: PortfolioInput): Promise<PortfolioRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('portfolios')
    .insert([{
      ...input,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating portfolio:', error);
    return null;
  }

  return data;
}

export async function updatePortfolio(id: string, input: Partial<PortfolioInput>): Promise<PortfolioRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('portfolios')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating portfolio:', error);
    return null;
  }

  return data;
}

export async function deletePortfolio(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('portfolios')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting portfolio:', error);
    return false;
  }

  return true;
}

export async function uploadImage(file: File, folder: string): Promise<string | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from('portfolio-images')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  // URL에서 파일 경로 추출
  const path = url.split('/portfolio-images/')[1];
  if (!path) return false;

  const { error } = await supabase.storage
    .from('portfolio-images')
    .remove([path]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }

  return true;
}
