export interface PortfolioItem {
  slug: string;
  title: string;
  location: string;
  buildingType: '아파트' | '빌라' | '단독주택' | '상가' | '기타';
  product: '시스템창호' | '하이샤시' | 'PVC창호';
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  description: string;
  details: {
    area: string;
    windowCount: string;
    duration: string;
    features: string[];
  };
  review?: string;
  images: {
    thumbnail: string;
    before?: string;
    after?: string;
    gallery?: string[];
  };
  published: boolean;
  order: number;
}

export interface PortfolioListItem {
  slug: string;
  title: string;
  location: string;
  buildingType: string;
  product: string;
  rating: number;
  date: string;
  thumbnail: string;
  published: boolean;
  order: number;
}
