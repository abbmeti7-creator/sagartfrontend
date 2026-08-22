export interface Category {
  id: string;
  name: string;
  image: string | null;
  coverImage: string | null;
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