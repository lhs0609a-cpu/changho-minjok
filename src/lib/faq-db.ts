import { supabase } from './supabase';

export interface FAQRecord {
  id: string;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface FAQInput {
  question: string;
  answer: string;
  category?: string;
  is_active?: boolean;
  display_order?: number;
}

export async function getAllFAQs(): Promise<FAQRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return data || [];
}

export async function getActiveFAQs(category?: string): Promise<FAQRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  let query = supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching active FAQs:', error);
    return [];
  }

  return data || [];
}

export async function getFAQById(id: string): Promise<FAQRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching FAQ:', error);
    return null;
  }

  return data;
}

export async function createFAQ(input: FAQInput): Promise<FAQRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('faqs')
    .insert([{
      ...input,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating FAQ:', error);
    return null;
  }

  return data;
}

export async function updateFAQ(id: string, input: Partial<FAQInput>): Promise<FAQRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('faqs')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating FAQ:', error);
    return null;
  }

  return data;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting FAQ:', error);
    return false;
  }

  return true;
}
