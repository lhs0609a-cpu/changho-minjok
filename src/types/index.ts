// 건물 유형
export type BuildingType = 'apartment' | 'villa' | 'house' | 'commercial' | 'factory';

// 시공 범위
export type ScopeType = 'full' | 'partial';

// 프레임 종류
export type FrameType = 'pvc_standard' | 'pvc_premium' | 'hisash' | 'system';

// 유리 종류
export type GlassType = 'double_22' | 'double_24' | 'lowe_24' | 'triple_39';

// 간봉 타입
export type SpacerType = 'aluminum' | 'tps';

// 개폐 방식
export type OpeningType = 'sliding' | 'casement' | 'project' | 'fixed' | 'tilt_turn';

// 설치 타입
export type InstallationType = 'self' | 'standard' | 'premium';

// 창문 정보
export interface WindowItem {
  id: string;
  location: string;
  openingType: OpeningType;
  width: number;
  height: number;
  quantity: number;
}

// 추가 옵션
export interface AdditionalOptions {
  screen: 'none' | 'standard' | 'micro';
  safetyLock: boolean;
  fallPrevention: boolean;
  blindBuiltin: boolean;
  installation: InstallationType;
  demolition: boolean;
}

// 견적 결과
export interface EstimateResult {
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  totalAmount: number;
  breakdown: PriceBreakdownItem[];
  validUntil: Date;
}

// 가격 상세 내역
export interface PriceBreakdownItem {
  category: string;
  item: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

// 고객 정보
export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  buildingType: BuildingType;
  preferredDate?: string;
  message?: string;
}

// 제품
export interface Product {
  id: string;
  categoryId: string;
  slug: string;
  name: string;
  subtitle?: string;
  description?: string;
  features: string[];
  specifications: Record<string, string>;
  thumbnailUrl?: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
}

// 제품 카테고리
export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  displayOrder: number;
}

// 시공사례
export interface Portfolio {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  buildingType: BuildingType;
  location: string;
  completionDate: string;
  description?: string;
  thumbnailUrl?: string;
  beforeImages: string[];
  afterImages: string[];
  productsUsed: string[];
  testimonial?: string;
  rating?: number;
  isFeatured: boolean;
}

// 공지사항
export interface Notice {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: 'general' | 'event' | 'update';
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
}

// FAQ
export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  displayOrder: number;
}

// 네비게이션 아이템
export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}
