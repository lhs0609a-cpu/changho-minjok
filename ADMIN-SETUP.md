# 관리자 시스템 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 접속 후 회원가입/로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `changho-minjok`
   - Database Password: 안전한 비밀번호 설정
   - Region: `Northeast Asia (Seoul)` 선택
4. "Create new project" 클릭 (2-3분 소요)

---

## 2. 데이터베이스 테이블 생성

1. Supabase 대시보드에서 **SQL Editor** 클릭
2. `supabase-setup.sql` 파일 내용 복사
3. SQL Editor에 붙여넣기
4. **Run** 클릭

---

## 3. Storage 버킷 생성

1. Supabase 대시보드에서 **Storage** 클릭
2. **New bucket** 클릭
3. 설정:
   - Name: `portfolio-images`
   - Public bucket: **ON**
4. **Create bucket** 클릭
5. 생성된 버킷 클릭 → **Policies** 탭
6. **New policy** → **For full customization** 클릭
7. 다음 정책들 추가:

### SELECT 정책 (읽기)
```
Policy name: Allow public read
Allowed operation: SELECT
Target roles: (비워두기 = 모든 사용자)
USING expression: true
```

### INSERT 정책 (업로드)
```
Policy name: Allow public insert
Allowed operation: INSERT
Target roles: (비워두기)
WITH CHECK expression: true
```

### DELETE 정책 (삭제)
```
Policy name: Allow public delete
Allowed operation: DELETE
Target roles: (비워두기)
USING expression: true
```

---

## 4. API 키 확인

1. Supabase 대시보드에서 **Settings** → **API** 클릭
2. 다음 값들 복사:
   - **Project URL**: `https://xxxx.supabase.co`
   - **anon public** key: `eyJhbGciOiJS...`

---

## 5. 환경변수 설정

### 로컬 개발 (.env.local)
프로젝트 루트에 `.env.local` 파일 생성:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_PASSWORD=원하는관리자비밀번호
```

### Vercel 배포
1. Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables**
2. 다음 변수들 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_PASSWORD`

---

## 6. Next.js 이미지 설정

`next.config.ts`에 Supabase 도메인 추가:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};
```

---

## 7. 사용 방법

### 관리자 로그인
1. `https://your-domain.com/admin` 접속
2. 설정한 `ADMIN_PASSWORD` 입력
3. 로그인

### 시공사례 등록
1. 로그인 후 "새 시공사례" 클릭
2. 양식 작성:
   - 제목, 지역, 날짜
   - 건물 유형, 제품 유형
   - 면적, 창호 개수, 시공 기간
   - 상세 설명, 특징
   - 고객 후기 (선택)
   - 이미지 업로드 (썸네일, Before/After)
3. "등록하기" 클릭

### 시공사례 수정/삭제
1. 목록에서 수정할 항목의 연필 아이콘 클릭
2. 내용 수정 후 "수정하기" 클릭
3. 삭제는 "삭제" 버튼 클릭

---

## 주의사항

- `ADMIN_PASSWORD`는 반드시 안전한 비밀번호로 설정하세요
- 이미지 파일 크기는 5MB 이하 권장
- 슬러그(URL)는 자동 생성되며 영문+숫자로 구성됩니다

---

## 문제 해결

### 이미지가 표시되지 않는 경우
1. Storage 버킷이 Public인지 확인
2. Storage Policies가 올바르게 설정되었는지 확인
3. `next.config.ts`에 Supabase 도메인이 추가되었는지 확인

### 로그인이 안 되는 경우
1. 환경변수 `ADMIN_PASSWORD`가 설정되었는지 확인
2. Vercel에서 환경변수 설정 후 재배포 필요

### 데이터가 저장되지 않는 경우
1. Supabase 환경변수가 올바른지 확인
2. RLS 정책이 설정되었는지 확인
