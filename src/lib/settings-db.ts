import { supabase } from './supabase';

export interface SettingRecord {
  id: string;
  key: string;
  value: string | null;
  updated_at: string;
}

export async function getAllSettings(): Promise<Record<string, string>> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return {};
  }

  const { data, error } = await supabase
    .from('settings')
    .select('key, value');

  if (error) {
    console.error('Error fetching settings:', error);
    return {};
  }

  const settings: Record<string, string> = {};
  data?.forEach((item) => {
    settings[item.key] = item.value || '';
  });

  return settings;
}

export async function getSetting(key: string): Promise<string | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single();

  if (error) {
    console.error('Error fetching setting:', error);
    return null;
  }

  return data?.value || null;
}

export async function updateSetting(key: string, value: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('settings')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });

  if (error) {
    console.error('Error updating setting:', error);
    return false;
  }

  return true;
}

export async function updateSettings(settings: Record<string, string>): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const updates = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('settings')
    .upsert(updates, { onConflict: 'key' });

  if (error) {
    console.error('Error updating settings:', error);
    return false;
  }

  return true;
}
