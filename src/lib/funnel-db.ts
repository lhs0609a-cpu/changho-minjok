import { supabase, FunnelTemplateRecord, FunnelTemplateInput, FunnelStepRecord, FunnelStepInput, CustomerFunnelRecord, CustomerFunnelInput, MessageLogRecord } from './supabase';

export interface MessageLogInput {
  customer_funnel_id: string;
  step_id: string;
  channel: string;
  status?: 'pending' | 'sent' | 'failed';
  error_message?: string;
}

// ============================================
// 퍼널 템플릿 CRUD
// ============================================

export async function getAllTemplates(): Promise<FunnelTemplateRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('funnel_templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching funnel templates:', error);
    return [];
  }

  return data || [];
}

export async function getActiveTemplates(): Promise<FunnelTemplateRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('funnel_templates')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching active funnel templates:', error);
    return [];
  }

  return data || [];
}

export async function getTemplateById(id: string): Promise<FunnelTemplateRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('funnel_templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching funnel template:', error);
    return null;
  }

  return data;
}

export async function createTemplate(input: FunnelTemplateInput): Promise<FunnelTemplateRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('funnel_templates')
    .insert([{
      ...input,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating funnel template:', error);
    return null;
  }

  return data;
}

export async function updateTemplate(id: string, input: Partial<FunnelTemplateInput>): Promise<FunnelTemplateRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('funnel_templates')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating funnel template:', error);
    return null;
  }

  return data;
}

export async function deleteTemplate(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('funnel_templates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting funnel template:', error);
    return false;
  }

  return true;
}

// ============================================
// 퍼널 스텝 CRUD
// ============================================

export async function getStepsByTemplateId(templateId: string): Promise<FunnelStepRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('funnel_steps')
    .select('*')
    .eq('template_id', templateId)
    .order('step_order', { ascending: true });

  if (error) {
    console.error('Error fetching funnel steps:', error);
    return [];
  }

  return data || [];
}

export async function createStep(input: FunnelStepInput): Promise<FunnelStepRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('funnel_steps')
    .insert([{
      ...input,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating funnel step:', error);
    return null;
  }

  return data;
}

export async function updateStep(id: string, input: Partial<Omit<FunnelStepInput, 'template_id'>>): Promise<FunnelStepRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('funnel_steps')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating funnel step:', error);
    return null;
  }

  return data;
}

export async function deleteStep(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('funnel_steps')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting funnel step:', error);
    return false;
  }

  return true;
}

export async function deleteStepsByTemplateId(templateId: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('funnel_steps')
    .delete()
    .eq('template_id', templateId);

  if (error) {
    console.error('Error deleting funnel steps:', error);
    return false;
  }

  return true;
}

// ============================================
// 고객 퍼널 관리
// ============================================

export async function startCustomerFunnel(input: CustomerFunnelInput): Promise<CustomerFunnelRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('customer_funnels')
    .insert([{
      ...input,
      current_step: 0,
      status: 'active',
      started_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error starting customer funnel:', error);
    return null;
  }

  return data;
}

export async function getCustomerFunnelByInquiryId(inquiryId: string): Promise<CustomerFunnelRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('customer_funnels')
    .select('*')
    .eq('inquiry_id', inquiryId)
    .order('started_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching customer funnel:', error);
    return null;
  }

  return data;
}

export async function updateCustomerFunnel(id: string, updates: Partial<CustomerFunnelRecord>): Promise<CustomerFunnelRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('customer_funnels')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating customer funnel:', error);
    return null;
  }

  return data;
}

export async function pauseFunnel(id: string): Promise<CustomerFunnelRecord | null> {
  return updateCustomerFunnel(id, {
    status: 'paused',
    paused_at: new Date().toISOString(),
  });
}

export async function resumeFunnel(id: string): Promise<CustomerFunnelRecord | null> {
  return updateCustomerFunnel(id, {
    status: 'active',
    paused_at: null,
  });
}

export async function stopFunnel(id: string): Promise<CustomerFunnelRecord | null> {
  return updateCustomerFunnel(id, {
    status: 'stopped',
    completed_at: new Date().toISOString(),
  });
}

export async function getActiveFunnels(): Promise<CustomerFunnelRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('customer_funnels')
    .select('*')
    .eq('status', 'active')
    .order('started_at', { ascending: false });

  if (error) {
    console.error('Error fetching active funnels:', error);
    return [];
  }

  return data || [];
}

// ============================================
// 퍼널 통계
// ============================================

export async function getTemplateStepCount(templateId: string): Promise<number> {
  if (!supabase) {
    return 0;
  }

  const { count, error } = await supabase
    .from('funnel_steps')
    .select('*', { count: 'exact', head: true })
    .eq('template_id', templateId);

  if (error) {
    console.error('Error counting funnel steps:', error);
    return 0;
  }

  return count || 0;
}

export async function getTemplateActiveCustomerCount(templateId: string): Promise<number> {
  if (!supabase) {
    return 0;
  }

  const { count, error } = await supabase
    .from('customer_funnels')
    .select('*', { count: 'exact', head: true })
    .eq('template_id', templateId)
    .in('status', ['active', 'paused']);

  if (error) {
    console.error('Error counting active customers:', error);
    return 0;
  }

  return count || 0;
}

export async function getFunnelStats(): Promise<{
  totalTemplates: number;
  activeTemplates: number;
  activeFunnels: number;
  completedFunnels: number;
}> {
  if (!supabase) {
    return { totalTemplates: 0, activeTemplates: 0, activeFunnels: 0, completedFunnels: 0 };
  }

  const [templates, customerFunnels] = await Promise.all([
    supabase.from('funnel_templates').select('is_active'),
    supabase.from('customer_funnels').select('status'),
  ]);

  const templateData = templates.data || [];
  const funnelData = customerFunnels.data || [];

  return {
    totalTemplates: templateData.length,
    activeTemplates: templateData.filter(t => t.is_active).length,
    activeFunnels: funnelData.filter(f => f.status === 'active').length,
    completedFunnels: funnelData.filter(f => f.status === 'completed').length,
  };
}

// 문의 목록에서 퍼널 상태를 일괄 조회하기 위한 함수
export async function getCustomerFunnelsByInquiryIds(inquiryIds: string[]): Promise<Record<string, CustomerFunnelRecord>> {
  if (!supabase || inquiryIds.length === 0) {
    return {};
  }

  const { data, error } = await supabase
    .from('customer_funnels')
    .select('*')
    .in('inquiry_id', inquiryIds)
    .order('started_at', { ascending: false });

  if (error) {
    console.error('Error fetching customer funnels:', error);
    return {};
  }

  // 각 inquiry_id에 대해 가장 최신 퍼널만 반환
  const result: Record<string, CustomerFunnelRecord> = {};
  for (const funnel of (data || [])) {
    if (!result[funnel.inquiry_id]) {
      result[funnel.inquiry_id] = funnel;
    }
  }

  return result;
}

// ============================================
// 메시지 발송 이력 관리
// ============================================

export async function createMessageLog(input: MessageLogInput): Promise<MessageLogRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('message_logs')
    .insert([{
      ...input,
      status: input.status || 'pending',
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating message log:', error);
    return null;
  }

  return data;
}

export async function updateMessageLog(
  id: string,
  updates: { status?: 'pending' | 'sent' | 'failed'; sent_at?: string; error_message?: string | null }
): Promise<MessageLogRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('message_logs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating message log:', error);
    return null;
  }

  return data;
}

export async function getMessageLogsByFunnelId(customerFunnelId: string): Promise<MessageLogRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('message_logs')
    .select('*')
    .eq('customer_funnel_id', customerFunnelId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching message logs:', error);
    return [];
  }

  return data || [];
}

// ============================================
// 발송 대기 퍼널 조회 및 진행
// ============================================

/**
 * 발송 대기 퍼널 조회: status='active'이고 next_send_at <= now()
 */
export async function getPendingFunnels(): Promise<CustomerFunnelRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('customer_funnels')
    .select('*')
    .eq('status', 'active')
    .not('next_send_at', 'is', null)
    .lte('next_send_at', new Date().toISOString())
    .order('next_send_at', { ascending: true });

  if (error) {
    console.error('Error fetching pending funnels:', error);
    return [];
  }

  return data || [];
}

/**
 * 퍼널 다음 단계로 진행
 * current_step 증가, next_send_at 갱신, 마지막 스텝이면 completed 처리
 */
export async function advanceFunnelStep(
  id: string,
  nextSendAt?: string | null
): Promise<CustomerFunnelRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  // 현재 퍼널 조회
  const { data: funnel, error: fetchError } = await supabase
    .from('customer_funnels')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !funnel) {
    console.error('Error fetching funnel for advance:', fetchError);
    return null;
  }

  const newStep = funnel.current_step + 1;
  const isLastStep = newStep >= funnel.total_steps;

  const updates: Record<string, unknown> = {
    current_step: newStep,
  };

  if (isLastStep) {
    updates.status = 'completed';
    updates.completed_at = new Date().toISOString();
    updates.next_send_at = null;
  } else {
    updates.next_send_at = nextSendAt || null;
  }

  const { data, error } = await supabase
    .from('customer_funnels')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error advancing funnel step:', error);
    return null;
  }

  return data;
}
