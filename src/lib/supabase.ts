import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 (환경변수가 없으면 null)
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}

// 타입 정의
export interface PortfolioRecord {
  id: string;
  slug: string;
  title: string;
  location: string;
  building_type: string;
  product: string;
  rating: number;
  date: string;
  description: string;
  area: string;
  window_count: string;
  duration: string;
  features: string[];
  review: string | null;
  thumbnail_url: string | null;
  before_url: string | null;
  after_url: string | null;
  gallery_urls: string[];
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioInput {
  slug: string;
  title: string;
  location: string;
  building_type: string;
  product: string;
  rating: number;
  date: string;
  description: string;
  area: string;
  window_count: string;
  duration: string;
  features: string[];
  review?: string;
  thumbnail_url?: string;
  before_url?: string;
  after_url?: string;
  gallery_urls?: string[];
  published?: boolean;
  display_order?: number;
}

// 상담신청 타입 정의
export interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  inquiry_type: string;
  address: string | null;
  message: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface InquiryInput {
  name: string;
  phone: string;
  email?: string;
  inquiry_type: string;
  address?: string;
  message: string;
}

// 퍼널 템플릿 타입 정의
export interface FunnelTemplateRecord {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FunnelTemplateInput {
  name: string;
  description?: string;
  is_active?: boolean;
}

// 퍼널 단계 타입 정의
export interface FunnelStepRecord {
  id: string;
  template_id: string;
  step_order: number;
  delay_hours: number;
  title: string;
  message: string;
  channel: 'kakao' | 'sms' | 'email';
  link_url: string | null;
  created_at: string;
}

export interface FunnelStepInput {
  template_id: string;
  step_order: number;
  delay_hours: number;
  title: string;
  message: string;
  channel: 'kakao' | 'sms' | 'email';
  link_url?: string;
}

// 고객 퍼널 진행 상태 타입 정의
export interface CustomerFunnelRecord {
  id: string;
  inquiry_id: string;
  template_id: string;
  current_step: number;
  total_steps: number;
  status: 'active' | 'paused' | 'completed' | 'stopped';
  started_at: string;
  next_send_at: string | null;
  completed_at: string | null;
  paused_at: string | null;
}

export interface CustomerFunnelInput {
  inquiry_id: string;
  template_id: string;
  total_steps: number;
}

// 메시지 발송 이력 타입 정의
export interface MessageLogRecord {
  id: string;
  customer_funnel_id: string;
  step_id: string;
  channel: string;
  status: 'pending' | 'sent' | 'failed';
  sent_at: string | null;
  error_message: string | null;
  created_at: string;
}
