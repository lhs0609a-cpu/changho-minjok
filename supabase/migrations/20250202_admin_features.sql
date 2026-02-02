-- 관리자 기능 확장 SQL 스키마
-- 실행: Supabase Dashboard > SQL Editor에서 실행

-- 1. 설정 테이블
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. 팝업 테이블
CREATE TABLE IF NOT EXISTS popups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  link_url TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. 배너 테이블
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  mobile_image_url TEXT,
  link_url TEXT,
  location VARCHAR(50) DEFAULT 'main',
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. FAQ 테이블
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. 공지사항 테이블
CREATE TABLE IF NOT EXISTS notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. 견적 테이블
CREATE TABLE IF NOT EXISTS estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  building_type VARCHAR(50),
  floor_size VARCHAR(50),
  frame_type VARCHAR(50),
  glass_type VARCHAR(50),
  spacer_type VARCHAR(50),
  window_count INT,
  estimated_price DECIMAL(12,0),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. 후기 테이블
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
  is_approved BOOLEAN DEFAULT false,
  is_best BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. inquiries 테이블 확장 (CRM 기능)
ALTER TABLE inquiries
ADD COLUMN IF NOT EXISTS contract_status VARCHAR(20) DEFAULT 'inquiry',
ADD COLUMN IF NOT EXISTS contract_date DATE,
ADD COLUMN IF NOT EXISTS construction_date DATE,
ADD COLUMN IF NOT EXISTS construction_status VARCHAR(20),
ADD COLUMN IF NOT EXISTS total_amount DECIMAL(12,0),
ADD COLUMN IF NOT EXISTS notes TEXT;

-- RLS 정책 설정
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE popups ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 각 테이블에 대한 RLS 정책 (모든 접근 허용 - 실제 환경에서는 더 제한적인 정책 권장)
CREATE POLICY "Enable all for settings" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for popups" ON popups FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for banners" ON banners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for faqs" ON faqs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for notices" ON notices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for estimates" ON estimates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);

-- 기본 설정 데이터 삽입
INSERT INTO settings (key, value) VALUES
  ('company_name', '창호의민족'),
  ('phone', '1588-0000'),
  ('email', 'info@changho.co.kr'),
  ('address', '서울특별시 강남구 테헤란로 123'),
  ('kakao_channel', ''),
  ('instagram', ''),
  ('youtube', ''),
  ('business_hours', '평일 09:00 - 18:00')
ON CONFLICT (key) DO NOTHING;
