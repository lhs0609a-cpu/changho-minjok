import { supabase } from './supabase';

export interface AdvisorRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  position: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface AdvisorInput {
  name: string;
  phone: string;
  email: string;
  position: string;
  is_active?: boolean;
  display_order?: number;
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export function getDisplayPhone(advisor: AdvisorRecord): string {
  return formatPhone(advisor.phone);
}

export async function getAllAdvisors(): Promise<AdvisorRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('advisors')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching advisors:', error);
    return [];
  }

  return data || [];
}

export async function getActiveAdvisors(): Promise<AdvisorRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('advisors')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching active advisors:', error);
    return [];
  }

  return data || [];
}

export async function createAdvisor(input: AdvisorInput): Promise<AdvisorRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const phone = input.phone.replace(/\D/g, '');

  const { data, error } = await supabase
    .from('advisors')
    .insert([{
      name: input.name,
      phone,
      email: input.email,
      position: input.position,
      is_active: input.is_active ?? true,
      display_order: input.display_order ?? 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating advisor:', error);
    return null;
  }

  return data;
}

export async function updateAdvisor(id: string, input: Partial<AdvisorInput>): Promise<AdvisorRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const updateData: Record<string, unknown> = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  if (input.phone) {
    updateData.phone = input.phone.replace(/\D/g, '');
  }

  const { data, error } = await supabase
    .from('advisors')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating advisor:', error);
    return null;
  }

  return data;
}

export async function deleteAdvisor(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('advisors')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting advisor:', error);
    return false;
  }

  return true;
}

export async function searchAdvisor(query: string): Promise<AdvisorRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const normalized = query.replace(/[-\s]/g, '');

  // Try exact name match first
  const { data: nameMatch, error: nameError } = await supabase
    .from('advisors')
    .select('*')
    .eq('is_active', true)
    .eq('name', query.trim())
    .single();

  if (!nameError && nameMatch) {
    return nameMatch;
  }

  // Try phone number match
  if (normalized.length >= 4) {
    const { data: allActive, error: phoneError } = await supabase
      .from('advisors')
      .select('*')
      .eq('is_active', true);

    if (!phoneError && allActive) {
      const found = allActive.find(a => a.phone.includes(normalized));
      if (found) return found;
    }
  }

  return null;
}
