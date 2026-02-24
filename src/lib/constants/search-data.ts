export interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: '페이지' | '제품' | 'FAQ' | '고객센터';
  keywords: string[];
}

export const SEARCH_DATA: SearchItem[] = [
  // 페이지
  {
    title: '프로모션',
    description: '현재 진행 중인 특별 할인 프로모션',
    href: '/landing',
    category: '페이지',
    keywords: ['할인', '이벤트', '특가', '세일', '프로모션', '랜딩'],
  },
  {
    title: '브랜드 스토리',
    description: '창호의민족의 브랜드 이야기',
    href: '/about',
    category: '페이지',
    keywords: ['회사소개', '브랜드', '소개', '스토리', '창호의민족'],
  },
  {
    title: '연혁',
    description: '창호의민족의 성장 과정',
    href: '/about/history',
    category: '페이지',
    keywords: ['역사', '연혁', '성장', '히스토리'],
  },
  {
    title: '공장 소개',
    description: '스마트 팩토리 & 생산 시설 소개',
    href: '/about/factory',
    category: '페이지',
    keywords: ['공장', '팩토리', '생산', '제조', '스마트팩토리', '시설'],
  },
  {
    title: '상담 신청',
    description: '무료 전화 상담 및 카카오톡 상담',
    href: '/estimate',
    category: '페이지',
    keywords: ['상담', '견적', '가격', '비용', '무료상담', '전화상담', '카카오톡'],
  },
  {
    title: '시공사례',
    description: '실제 시공 완료된 사례 모음',
    href: '/portfolio',
    category: '페이지',
    keywords: ['시공', '사례', '포트폴리오', '후기', '시공사진', '완료'],
  },
  {
    title: '사업자 인증',
    description: '사업자 등록 인증 확인',
    href: '/support/verify',
    category: '페이지',
    keywords: ['사업자', '인증', '등록', '확인', '어드바이저'],
  },

  // 제품
  {
    title: 'PVC 창호',
    description: '경제적이고 단열 성능 우수한 PVC 창호',
    href: '/products/pvc',
    category: '제품',
    keywords: ['PVC', '피브이씨', '창호', '창문', '단열', '경제적'],
  },
  {
    title: '알루미늄 창호',
    description: '내구성과 슬림 디자인의 알루미늄 창호',
    href: '/products/aluminum',
    category: '제품',
    keywords: ['알루미늄', '알루미늄창호', '샤시', '새시', '내구성'],
  },
  {
    title: '시스템창호',
    description: '유럽식 고기밀 시스템창호',
    href: '/products/system',
    category: '제품',
    keywords: ['시스템', '시스템창호', '유럽식', '고기밀', '패시브', '패시브하우스'],
  },
  {
    title: '유리 종류',
    description: '로이유리, 복층유리 등 유리 사양 안내',
    href: '/products/glass',
    category: '제품',
    keywords: ['유리', '로이', 'Low-E', '복층', '삼중', '방음유리', '강화유리'],
  },
  {
    title: 'TPS 단열간봉',
    description: '결로 방지 TPS 단열간봉 기술',
    href: '/products/tps',
    category: '제품',
    keywords: ['TPS', '단열간봉', '간봉', '결로', '결로방지', '단열'],
  },

  // FAQ
  {
    title: '견적은 어떻게 받을 수 있나요?',
    description: '홈페이지 무료 견적 시뮬레이션 또는 현장 방문 상담',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['견적', '받기', '방법', '신청'],
  },
  {
    title: '견적 비용이 발생하나요?',
    description: '현장 방문 상담 및 견적은 100% 무료',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['견적', '비용', '무료', '가격'],
  },
  {
    title: '견적 후 반드시 계약해야 하나요?',
    description: '견적은 참고용, 비교 검토 후 결정 가능',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['계약', '의무', '필수'],
  },
  {
    title: '창호 가격은 어떻게 결정되나요?',
    description: '프레임 종류, 유리 사양, 창문 크기에 따라 결정',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['가격', '비용', '결정', '프레임', '유리'],
  },
  {
    title: '시공 기간은 얼마나 걸리나요?',
    description: '일반 아파트 기준 1~2일 소요',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['시공', '기간', '시간', '며칠', '얼마나'],
  },
  {
    title: '시공 중 거주가 가능한가요?',
    description: '거주하면서 시공 가능, 시공 당일 외출 권장',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['거주', '생활', '시공중'],
  },
  {
    title: '기존 창호 철거는 어떻게 하나요?',
    description: '철거 및 폐기 처리 포함, 견적에 포함',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['철거', '폐기', '처리'],
  },
  {
    title: '창호 시공 시 벽지 손상이 있나요?',
    description: '최소한의 손상, 필요 시 마감 처리 진행',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['벽지', '손상', '마감', '보수'],
  },
  {
    title: 'PVC 창호와 시스템창호의 차이는?',
    description: 'PVC는 경제적, 시스템창호는 고기밀 고성능',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['차이', '비교', 'PVC', '시스템', '성능'],
  },
  {
    title: '로이(Low-E) 유리가 무엇인가요?',
    description: '특수 금속막 코팅으로 에너지 효율을 높인 유리',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['로이', 'Low-E', '유리', '에너지', '효율'],
  },
  {
    title: 'TPS 단열간봉의 장점은?',
    description: '열전도율 1/1000, 결로 방지 탁월',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['TPS', '단열간봉', '장점', '결로'],
  },
  {
    title: 'A/S 보증 기간은 얼마인가요?',
    description: '기본 2년 무상 A/S, 제품 결함 10년 이상 보증',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['AS', 'A/S', '보증', '기간', '무상', '보증기간'],
  },
  {
    title: 'A/S 신청은 어떻게 하나요?',
    description: '고객센터 전화 또는 홈페이지 상담 신청',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['AS', 'A/S', '신청', '접수'],
  },
  {
    title: '보증 기간 이후 수리 비용은?',
    description: '실비 수리, 사전 비용 안내 후 진행',
    href: '/support/faq',
    category: 'FAQ',
    keywords: ['보증', '수리', '비용', '이후'],
  },

  // 고객센터
  {
    title: '상담 신청',
    description: '무료 상담 및 현장 방문 예약',
    href: '/support/inquiry',
    category: '고객센터',
    keywords: ['상담', '신청', '문의', '예약', '방문'],
  },
  {
    title: '공장 견학 예약',
    description: '스마트 팩토리 견학 신청',
    href: '/support/tour',
    category: '고객센터',
    keywords: ['공장', '견학', '투어', '방문', '예약'],
  },
  {
    title: '공지사항',
    description: '최신 소식 및 공지사항',
    href: '/support/notice',
    category: '고객센터',
    keywords: ['공지', '소식', '뉴스', '알림'],
  },
  {
    title: '전문 어드바이저 조회',
    description: '담당 어드바이저 정보 확인',
    href: '/support/verify',
    category: '고객센터',
    keywords: ['어드바이저', '담당자', '조회', '확인', '사업자'],
  },
];

export const CATEGORY_ICONS: Record<SearchItem['category'], string> = {
  '페이지': '📄',
  '제품': '📦',
  'FAQ': '❓',
  '고객센터': '📞',
};
