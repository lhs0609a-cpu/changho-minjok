# 시공사례 관리 가이드

## 개요
이 폴더에서 시공사례를 관리합니다. 각 시공사례는 하나의 JSON 파일로 관리됩니다.

---

## 새 시공사례 추가하기

### 1단계: JSON 파일 생성
1. `_template.json` 파일을 복사합니다
2. 파일명을 영문 슬러그로 변경합니다 (예: `seoul-apartment-2025.json`)
3. 내용을 수정합니다

### 2단계: 이미지 추가
1. `public/images/portfolio/` 폴더에 새 폴더 생성 (파일명과 동일)
2. 필요한 이미지 업로드:
   - `thumbnail.jpg` - 목록 썸네일 (필수, 권장: 800x600)
   - `before.jpg` - 시공 전 사진 (선택)
   - `after.jpg` - 시공 후 사진 (선택)
   - `gallery-1.jpg`, `gallery-2.jpg` ... - 추가 사진 (선택)

### 3단계: 배포
GitHub에 커밋 & 푸시하면 자동으로 반영됩니다.

---

## JSON 파일 양식

```json
{
  "slug": "프로젝트-영문-슬러그",
  "title": "시공 제목",
  "location": "지역 (예: 서울 강남구)",
  "buildingType": "아파트",
  "product": "시스템창호",
  "rating": 5,
  "date": "2025년 1월",
  "description": "시공 내용 상세 설명...",
  "details": {
    "area": "84㎡ (34평형)",
    "windowCount": "12개",
    "duration": "1일",
    "features": ["특징1", "특징2", "특징3", "특징4"]
  },
  "review": "고객 후기 (없으면 삭제)",
  "images": {
    "thumbnail": "/images/portfolio/슬러그/thumbnail.jpg",
    "before": "/images/portfolio/슬러그/before.jpg",
    "after": "/images/portfolio/슬러그/after.jpg",
    "gallery": []
  },
  "published": true,
  "order": 1
}
```

---

## 필드 설명

| 필드 | 설명 | 필수 | 예시 |
|------|------|------|------|
| `slug` | URL 주소에 사용될 영문 ID | O | `gangnam-apt-2025` |
| `title` | 시공사례 제목 | O | `강남 OO아파트 전체 교체` |
| `location` | 시공 지역 | O | `서울 강남구` |
| `buildingType` | 건물 유형 | O | `아파트`, `빌라`, `단독주택`, `상가`, `기타` 중 택1 |
| `product` | 제품 유형 | O | `시스템창호`, `하이샤시`, `PVC창호` 중 택1 |
| `rating` | 고객 평점 (1~5) | O | `5` |
| `date` | 시공 날짜 | O | `2025년 1월` |
| `description` | 상세 설명 | O | 시공 내용에 대한 설명 |
| `details.area` | 면적 | O | `84㎡ (34평형)` |
| `details.windowCount` | 창호 개수 | O | `12개` |
| `details.duration` | 시공 기간 | O | `1일` |
| `details.features` | 특징 목록 (배열) | O | `["시스템창호 전체", "삼중유리"]` |
| `review` | 고객 후기 | X | 고객 후기 내용 |
| `images.thumbnail` | 썸네일 이미지 경로 | O | `/images/portfolio/slug/thumbnail.jpg` |
| `images.before` | 시공 전 사진 경로 | X | `/images/portfolio/slug/before.jpg` |
| `images.after` | 시공 후 사진 경로 | X | `/images/portfolio/slug/after.jpg` |
| `images.gallery` | 추가 사진 경로 배열 | X | `["/images/portfolio/slug/gallery-1.jpg"]` |
| `published` | 공개 여부 | O | `true` 또는 `false` |
| `order` | 정렬 순서 (낮을수록 먼저) | O | `1`, `2`, `3`... |

---

## 이미지 권장 사항

- **썸네일**: 800 x 600px (4:3 비율)
- **Before/After**: 1200 x 900px (4:3 비율)
- **갤러리**: 800 x 800px (1:1 비율)
- **파일 형식**: JPG 또는 PNG
- **파일 크기**: 500KB 이하 권장

---

## 주의사항

1. **파일명은 반드시 영문**으로 작성 (한글 불가)
2. **slug와 폴더명**을 동일하게 유지
3. JSON 문법 오류 시 사이트가 깨질 수 있으니 주의
4. `published: false`로 설정하면 비공개 처리됨
5. 이미지 경로는 `/images/portfolio/`로 시작

---

## 예시

### 파일 구조
```
data/portfolios/
├── _template.json (양식)
├── README.md (이 파일)
├── gangnam-apartment-1.json
├── suwon-villa-1.json
└── incheon-house-1.json

public/images/portfolio/
├── gangnam-apartment-1/
│   ├── thumbnail.jpg
│   ├── before.jpg
│   └── after.jpg
├── suwon-villa-1/
│   └── thumbnail.jpg
└── incheon-house-1/
    └── thumbnail.jpg
```

---

## 문의
문제가 있으면 개발팀에 연락해주세요.
