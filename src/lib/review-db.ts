import { supabase } from './supabase';

export interface ReviewRecord {
  id: string;
  customer_name: string;
  content: string;
  rating: number;
  portfolio_id: string | null;
  is_approved: boolean;
  is_best: boolean;
  created_at: string;
}

export interface ReviewInput {
  customer_name: string;
  content: string;
  rating?: number;
  portfolio_id?: string;
  is_approved?: boolean;
  is_best?: boolean;
}

export async function getAllReviews(): Promise<ReviewRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data || [];
}

export async function getApprovedReviews(): Promise<ReviewRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('is_best', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching approved reviews:', error);
    return [];
  }

  return data || [];
}

export async function getBestReviews(): Promise<ReviewRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .eq('is_best', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching best reviews:', error);
    return [];
  }

  return data || [];
}

export async function getReviewById(id: string): Promise<ReviewRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching review:', error);
    return null;
  }

  return data;
}

export async function createReview(input: ReviewInput): Promise<ReviewRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([{
      ...input,
      rating: input.rating || 5,
      is_approved: input.is_approved ?? false,
      is_best: input.is_best ?? false,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating review:', error);
    return null;
  }

  return data;
}

export async function updateReview(id: string, input: Partial<ReviewInput>): Promise<ReviewRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('reviews')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating review:', error);
    return null;
  }

  return data;
}

export async function deleteReview(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting review:', error);
    return false;
  }

  return true;
}

export async function getReviewStats(): Promise<{
  total: number;
  approved: number;
  pending: number;
  avgRating: number;
}> {
  if (!supabase) {
    return { total: 0, approved: 0, pending: 0, avgRating: 0 };
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('is_approved, rating');

  if (error || !data) {
    return { total: 0, approved: 0, pending: 0, avgRating: 0 };
  }

  const approved = data.filter(r => r.is_approved).length;
  const avgRating = data.length > 0
    ? data.reduce((sum, r) => sum + r.rating, 0) / data.length
    : 0;

  return {
    total: data.length,
    approved,
    pending: data.length - approved,
    avgRating: Math.round(avgRating * 10) / 10,
  };
}
