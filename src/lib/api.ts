import "server-only";

import type {
  ApiResponse,
  ArticleListItem,
  Category,
  PaginatedResponse,
} from "@/types";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("متغیر محیطی BACKEND_API_URL تعریف نشده است.");
}

async function fetchFromBackend<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    ...options,
    next: { revalidate: 3600 }, // ISR: هر ساعت یک بار رفرش شود
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(
      `خطای API: ${response.status} ${response.statusText} برای ${endpoint}`
    );
  }

  return (await response.json()) as T;
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