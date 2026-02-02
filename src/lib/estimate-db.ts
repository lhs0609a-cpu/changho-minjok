import { supabase } from './supabase';

export interface EstimateRecord {
  id: string;
  customer_name: string | null;
  phone: string | null;
  email: string | null;
  building_type: string | null;
  floor_size: string | null;
  frame_type: string | null;
  glass_type: string | null;
  spacer_type: string | null;
  window_count: number | null;
  estimated_price: number | null;
  created_at: string;
}

export interface EstimateInput {
  customer_name?: string;
  phone?: string;
  email?: string;
  building_type?: string;
  floor_size?: string;
  frame_type?: string;
  glass_type?: string;
  spacer_type?: string;
  window_count?: number;
  estimated_price?: number;
}

export async function getAllEstimates(): Promise<EstimateRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('estimates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching estimates:', error);
    return [];
  }

  return data || [];
}

export async function getEstimateById(id: string): Promise<EstimateRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('estimates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching estimate:', error);
    return null;
  }

  return data;
}

export async function createEstimate(input: EstimateInput): Promise<EstimateRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('estimates')
    .insert([{
      ...input,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating estimate:', error);
    return null;
  }

  return data;
}

export async function deleteEstimate(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('estimates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting estimate:', error);
    return false;
  }

  return true;
}

export async function getEstimateStats(): Promise<{
  total: number;
  thisMonth: number;
  avgPrice: number;
}> {
  if (!supabase) {
    return { total: 0, thisMonth: 0, avgPrice: 0 };
  }

  const { data, error } = await supabase
    .from('estimates')
    .select('created_at, estimated_price');

  if (error || !data) {
    return { total: 0, thisMonth: 0, avgPrice: 0 };
  }

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const thisMonthEstimates = data.filter(e =>
    new Date(e.created_at) >= firstDayOfMonth
  );

  const pricesWithValue = data.filter(e => e.estimated_price != null);
  const avgPrice = pricesWithValue.length > 0
    ? pricesWithValue.reduce((sum, e) => sum + (e.estimated_price || 0), 0) / pricesWithValue.length
    : 0;

  return {
    total: data.length,
    thisMonth: thisMonthEstimates.length,
    avgPrice: Math.round(avgPrice),
  };
}
