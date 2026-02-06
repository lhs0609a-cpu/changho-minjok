import { NavItem } from '@/types';

export const MAIN_NAV: NavItem[] = [
  {
    title: '프로모션',
    href: '/landing',
    highlight: true,
  },
  {
    title: '회사소개',
    href: '/about',
    children: [
      { title: '브랜드 스토리', href: '/about' },
      { title: '연혁', href: '/about/history' },
      { title: '공장 소개', href: '/about/factory' },
    ],
  },
  {
    title: '제품소개',
    href: '/products',
    children: [
      { title: 'PVC 창호', href: '/products/pvc' },
      { title: '하이샤시', href: '/products/hisash' },
      { title: '시스템창호', href: '/products/system' },
      { title: '유리 종류', href: '/products/glass' },
      { title: 'TPS 단열간봉', href: '/products/tps' },
    ],
  },
  {
    title: '견적 시뮬레이션',
    href: '/estimate',
  },
  {
    title: '시공사례',
    href: '/portfolio',
  },
  {
    title: '고객센터',
    href: '/support',
    children: [
      { title: '상담 신청', href: '/support/inquiry' },
      { title: '공장 견학 예약', href: '/support/tour' },
      { title: 'FAQ', href: '/support/faq' },
      { title: '공지사항', href: '/support/notice' },
    ],
  },
];

export const FOOTER_LINKS = {
  company: [
    { title: '회사소개', href: '/about' },
    { title: '연혁', href: '/about/history' },
    { title: '공장 소개', href: '/about/factory' },
  ],
  products: [
    { title: 'PVC 창호', href: '/products/pvc' },
    { title: '하이샤시', href: '/products/hisash' },
    { title: '시스템창호', href: '/products/system' },
  ],
  support: [
    { title: '견적 시뮬레이션', href: '/estimate' },
    { title: '상담 신청', href: '/support/inquiry' },
    { title: 'FAQ', href: '/support/faq' },
  ],
};

export const COMPANY_INFO = {
  name: '창호의 민족',
  companyName: '(주)현경시스템',
  address: '경상북도 청도군 청도읍 청매로 86-29',
  phone: '1668-1453',
  fax: '031-000-0001',
  email: 'changhopeople@naver.com',
  businessNumber: '268-86-01889',
  ceo: '허자현',
  kakaoChannel: 'http://pf.kakao.com/_GjHxgn/chat', // 카카오톡 채널 URL
};

export const COMPANY_INFO_SUB = {
  name: '창호의민족',
  businessNumber: '221-31-52133',
  ceo: '허자현',
  address: '경상남도 창원시 의창구 팔용로396번길 9, 1층(팔용동)',
};
