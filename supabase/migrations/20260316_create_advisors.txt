-- Create advisors table
CREATE TABLE IF NOT EXISTS advisors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  position TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS policies
ALTER TABLE advisors ENABLE ROW LEVEL SECURITY;

-- Public read access (active advisors only)
CREATE POLICY "Anyone can read active advisors"
  ON advisors
  FOR SELECT
  USING (is_active = true);

-- Service role full access (for admin operations via supabase client)
CREATE POLICY "Service role has full access"
  ON advisors
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed initial data (existing staff members)
INSERT INTO advisors (name, phone, email, position, is_active, display_order)
VALUES
  ('양라윤', '01063739563', 'didalsdk12@naver.com', '사원', true, 1),
  ('배형민', '01066639978', 'gudals9978@naver.com', '영업팀장', true, 2),
  ('허자현', '01049972500', 'gjwkgus@naver.com', '대표', true, 3);
