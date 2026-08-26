import type { MetadataRoute } from "next";
import { getCategories, getArticles } from "@/lib/api";
import { SITE_URL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/category/all`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  try {
    const [categories, articlesRes] = await Promise.all([
      getCategories().catch(() => []),
      getArticles(1, 100).catch(() => ({ items: [] })),
    ]);

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${SITE_URL}/category/${encodeURIComponent(cat.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    const articleRoutes: MetadataRoute.Sitemap = (articlesRes.items || []).map((art) => ({
      url: `${SITE_URL}/articles/${encodeURIComponent(art.slug)}`,
      lastModified: new Date(art.publishedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
  } catch (error) {
    console.error("❌ Sitemap Generation Error:", error);
    return staticRoutes;
  }
}