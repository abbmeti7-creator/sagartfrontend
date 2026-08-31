import "server-only";

import type {
  ArticleDetail,
  ApiResponse,
  ArticleListItem,
  Category,
  PaginatedResponse,ProductListItem,
  ProductDetail,
  ProductVariant,
} from "@/types";


const BACKEND_API_URL = process.env.BACKEND_API_URL;
if (!BACKEND_API_URL) {
  throw new Error("متغیر محیطی BACKEND_API_URL تعریف نشده است.");
}


async function fetchFromBackend<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
   const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`خطای API: ${response.status} برای ${endpoint}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    // ✅ این خط باعث می‌شود دلیل واقعی خطا در ترمینال چاپ شود
    console.error(`❌ Fetch Error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * دریافت لیست همه دسته‌بندی‌های فعال
 */
export async function getCategories(): Promise<Category[]> {

  const response = await fetchFromBackend<ApiResponse<Category[]>>(
    "/api/categories"
  );

  // فقط دسته‌بندی‌های فعال را برمی‌گردانیم
  return response.data.filter((category) => category.isActive);
}
// نوع پاسخ بک‌اند را تعریف کنید
type ApiResponseWithData<T> = {
  success: boolean;
  statusCode: number;
  data: {
    message: string;
    data: T;
  };
  timestamp: string;
};

export async function getArticleBySlug(slug: string): Promise<ArticleDetail> {
  try {
    const endpoint = `/api/articles/${encodeURIComponent(slug)}`;
    console.log('📡 Requesting:', endpoint);

    // استفاده از نوع صحیح برای نتیجه
    const result = await fetchFromBackend<ApiResponseWithData<ArticleDetail>>(endpoint);

    // بررسی ساختار داده
    if (result.success && result.data?.data) {
      return result.data.data;
    }

    // اگر موفق نبود، خطا پرتاب کنید
    throw new Error(`مقاله با slug "${slug}" یافت نشد`);
  } catch (error) {
    console.error(`❌ Error fetching article with slug "${slug}":`, error);
    throw error;
  }
}
/**
 * دریافت لیست مقالات با pagination
 */
export async function getArticles(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<ArticleListItem>> {
  const response = await fetchFromBackend<
    ApiResponse<{
      message: string;
      data: PaginatedResponse<ArticleListItem>;
    }>
  >(`/api/articles?page=${page}&limit=${limit}`);

  return response.data.data;
}

/**
 * دریافت لیست محصولات بر اساس دسته‌بندی
 */
export async function getProductsByCategory(
  categoryId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<ProductListItem>> {
  const response = await fetchFromBackend<
    ApiResponse<{
      message: string;
      data: PaginatedResponse<ProductListItem>;
    }>
  >(`/api/products?category=${categoryId}&page=${page}&limit=${limit}`);

  return response.data.data;
}

/**
 * دریافت جزئیات محصول بر اساس slug
 */
export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  const response = await fetchFromBackend<
    ApiResponse<{
      message: string;
      data: ProductDetail;
    }>
  >(`/api/products/${encodeURIComponent(slug)}`);

  return response.data.data;
}

/**
 * دریافت variants محصول (تنوع وزنی)
 */
export async function getProductVariants(slug: string): Promise<ProductVariant[]> {
  const response = await fetchFromBackend<
    ApiResponse<{
      message: string;
      data: ProductVariant[];
    }>
  >(`/api/products/${encodeURIComponent(slug)}/variants`);

  return response.data.data;
}

/**
 * دریافت محصولات مرتبط
 */
export async function getRelatedProducts(
  slug: string,
  limit: number = 7
): Promise<ProductDetail[]> {
  const response = await fetchFromBackend<
    ApiResponse<{
      message: string;
      data: ProductDetail[];
    }>
  >(`/api/products/${encodeURIComponent(slug)}/related?limit=${limit}`);

  return response.data.data;
}