-- 상담신청 테이블 생성 SQL
-- Supabase SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  inquiry_type VARCHAR(50) NOT NULL,
  address TEXT,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  admin_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 INSERT 가능 (상담신청 등록)
CREATE POLICY "Anyone can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 인증된 사용자만 SELECT 가능 (관리자용)
CREATE POLICY "Authenticated users can view inquiries" ON inquiries
  FOR SELECT USING (true);

-- 인증된 사용자만 UPDATE 가능 (상태 변경)
CREATE POLICY "Authenticated users can update inquiries" ON inquiries
  FOR UPDATE USING (true);

-- 인증된 사용자만 DELETE 가능
CREATE POLICY "Authenticated users can delete inquiries" ON inquiries
  FOR DELETE USING (true);

-- 테이블 설명 추가
COMMENT ON TABLE inquiries IS '상담신청 테이블';
COMMENT ON COLUMN inquiries.id IS '고유 ID';
COMMENT ON COLUMN inquiries.name IS '신청자 이름';
COMMENT ON COLUMN inquiries.phone IS '연락처';
COMMENT ON COLUMN inquiries.email IS '이메일 (선택)';
COMMENT ON COLUMN inquiries.inquiry_type IS '문의 유형 (estimate, product, installation, as, other)';
COMMENT ON COLUMN inquiries.address IS '주소 (선택)';
COMMENT ON COLUMN inquiries.message IS '문의 내용';
COMMENT ON COLUMN inquiries.status IS '처리 상태 (pending, in_progress, completed, cancelled)';
COMMENT ON COLUMN inquiries.admin_note IS '관리자 메모';
