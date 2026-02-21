-- 자동 퍼널 시스템 SQL 스키마
-- 실행: Supabase Dashboard > SQL Editor에서 실행

-- 1. 퍼널 템플릿 테이블
CREATE TABLE IF NOT EXISTS funnel_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. 퍼널 단계 테이블
CREATE TABLE IF NOT EXISTS funnel_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES funnel_templates(id) ON DELETE CASCADE,
  step_order INT NOT NULL DEFAULT 1,
  delay_hours INT NOT NULL DEFAULT 0,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  channel VARCHAR(20) NOT NULL DEFAULT 'kakao',
  link_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. 고객별 퍼널 진행 상태 테이블
CREATE TABLE IF NOT EXISTS customer_funnels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES funnel_templates(id) ON DELETE CASCADE,
  current_step INT NOT NULL DEFAULT 0,
  total_steps INT NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  started_at TIMESTAMP DEFAULT NOW(),
  next_send_at TIMESTAMP,
  completed_at TIMESTAMP,
  paused_at TIMESTAMP
);

-- 4. 메시지 발송 이력 테이블
CREATE TABLE IF NOT EXISTS message_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_funnel_id UUID NOT NULL REFERENCES customer_funnels(id) ON DELETE CASCADE,
  step_id UUID NOT NULL REFERENCES funnel_steps(id) ON DELETE CASCADE,
  channel VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMP,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_funnel_steps_template_id ON funnel_steps(template_id);
CREATE INDEX IF NOT EXISTS idx_funnel_steps_order ON funnel_steps(template_id, step_order);
CREATE INDEX IF NOT EXISTS idx_customer_funnels_inquiry_id ON customer_funnels(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_customer_funnels_status ON customer_funnels(status);
CREATE INDEX IF NOT EXISTS idx_message_logs_customer_funnel_id ON message_logs(customer_funnel_id);

-- RLS 정책 설정
ALTER TABLE funnel_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for funnel_templates" ON funnel_templates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for funnel_steps" ON funnel_steps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for customer_funnels" ON customer_funnels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for message_logs" ON message_logs FOR ALL USING (true) WITH CHECK (true);
