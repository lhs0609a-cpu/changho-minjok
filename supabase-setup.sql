-- ================================================
-- 창호의 민족 - Supabase 데이터베이스 설정
-- ================================================

-- 1. portfolios 테이블 생성
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  building_type VARCHAR(50) NOT NULL,
  product VARCHAR(50) NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  date VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  area VARCHAR(100) NOT NULL,
  window_count VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  features TEXT[] DEFAULT '{}',
  review TEXT,
  thumbnail_url TEXT,
  before_url TEXT,
  after_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_portfolios_published ON portfolios(published);
CREATE INDEX IF NOT EXISTS idx_portfolios_display_order ON portfolios(display_order);

-- 3. RLS (Row Level Security) 설정
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 공개된 포트폴리오 읽기 가능
CREATE POLICY "Public portfolios are viewable by everyone"
  ON portfolios
  FOR SELECT
  USING (published = true);

-- 인증된 사용자만 모든 포트폴리오 관리 가능 (또는 anon key로 관리)
CREATE POLICY "Enable all access for service role"
  ON portfolios
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ================================================
-- Storage 버킷 설정 (Supabase 대시보드에서 수동 설정 필요)
-- ================================================
-- 1. Storage > New bucket 클릭
-- 2. 버킷 이름: portfolio-images
-- 3. Public bucket: 활성화
-- 4. 정책 추가:
--    - SELECT: 모든 사용자 허용
--    - INSERT: 모든 사용자 허용 (또는 인증된 사용자만)
--    - UPDATE: 모든 사용자 허용
--    - DELETE: 모든 사용자 허용
