export interface Category {
  id: string;
  name: string;
  image: string ;
  coverImage: string;
  label: string | null;
  isActive: boolean;
}

export interface ArticleListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  readingTime: number;
  views: number;
  productCount: number;
  publishedAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  featuredImage: {
    url: string;
    alt: string;
    caption: string;
  };
  blocks: ArticleBlock[];
}

export type ArticleBlock =
  | {
      type: "paragraph";
      data: { text: string; color?: string };
    }
  | {
      type: "heading";
      data: { level: 1 | 2 | 3 | 4 | 5 | 6; text: string; color?: string };
    }
  | {
      type: "video";
      data: { url: string; posterUrl?: string; caption?: string };
    }
  | {
      type: "blockquote";
      data: { text: string; color?: string };
    }
  | {
      type: "image";
      data: { url: string; alt?: string; caption?: string };
    };

export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  navigatelink: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}
// ... مدل‌های قبلی

export interface ProductListItem {
  id: string;
  title: string;
  slug: string;
  code: string;
  measure: string;
  price: number;
  priceAfterDiscount: string;
  discountDisplay: string;
  images: string[];
  rating: number;
  isActive: boolean;
  isFavorite: boolean;
  isInCart: boolean;
  category: {
    id: string;
    name: string;
  };
}

export interface ProductDetail {
  id: string;
  title: string;
  slug: string;
  code: string;
  price: number;
  discountDisplay: string;
  priceAfterDiscount: string;
  measure: string;
  images: string[];
  description: string;
  harvestMethod: string;
  storageMethod: string;
  specifications: string;
  packagingShipping: string;
  usageGuide: string;
  rating: number;
  isActive: boolean;
  isFavorite: boolean;
  isInCart: boolean;
  category: {
    id: string;
    name: string;
  };
}

export interface ProductVariant {
  id: string;
  title: string;
  slug: string;
  measure: string;
  price: number;
  priceAfterDiscount: string;
  discountDisplay: string;
  image: string;
  isFavorite: boolean;
  categoryName: string;
}
export interface ArticleDetail {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Array<{
    type: "paragraph" | "heading" | "blockquote" | "video" | "image";
    data: any;
  }>;
  featuredImage: string;
  videoUrl?: string;
  readingTime: number;
  publishedAt: string;
  status: string;
  views: number;
  products: Array<{
    id: string;
    title: string;
    slug: string;
    price: number;
    discountPercent: number;
    priceAfterDiscount: string;
    measure: string;
    image: string;
    isActive: boolean;
    categoryName: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
