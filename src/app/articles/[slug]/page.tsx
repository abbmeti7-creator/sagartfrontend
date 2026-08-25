import { getArticleBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ArticleContentRenderer from "@/components/article/ArticleContentRenderer";
import ProductCard from "@/components/product/productcard";
import type { ProductListItem } from "@/types";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  let articleData: any = null;
  try {
    const response = await getArticleBySlug(slug);
    // Unwrap based on your API structure: response.data.data
    articleData = response?.data?.data || response?.data || response;
  } catch (error) {
    console.error("❌ Failed to fetch article:", error);
  }

  if (!articleData) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-charcoal/60">
        <Link href="/" className="transition-colors hover:text-gold">
          بارگاه
        </Link>
        <span className="text-gold">/</span>
        <Link href="/articles" className="transition-colors hover:text-gold">
          کتیبه‌ها
        </Link>
        <span className="text-gold">/</span>
        <span className="truncate text-charcoal">{articleData.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8 text-center md:text-right">
        <h1 className="font-estedad text-3xl font-bold leading-tight text-charcoal md:text-4xl">
          {articleData.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal/60 md:justify-start">
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {articleData.readingTime} دقیقه مطالعه
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {articleData.views.toLocaleString("fa-IR")} بازدید
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {articleData.publishedAt}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {/* Featured Image */}
      {articleData.featuredImage && (
        // ✅ Added max-w-2xl mx-auto to keep it proportional on large screens, while remaining square
        <div className="mb-10 overflow-hidden rounded-sagart border border-gold/20 shadow-luxury mx-auto max-w-2xl">
          <div className="relative aspect-square w-full">
            <Image
              src={articleData.featuredImage}
              alt={articleData.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Root Level Video (if exists) */}
      {articleData.videoUrl && (
        <div className="mb-10 overflow-hidden rounded-sagart border border-gold/20 bg-charcoal-surface shadow-luxury">
          <video
            src={articleData.videoUrl}
            controls
            className="w-full"
            poster={articleData.featuredImage}
          />
        </div>
      )}

      {/* Dynamic Content */}
      <article className="prose prose-lg max-w-none">
        <ArticleContentRenderer content={articleData.content} />
      </article>

      {/* Related Products */}
      {articleData.products && articleData.products.length > 0 && (
        <section className="mt-16 border-t border-gold/20 pt-12">
          <h3 className="mb-6 font-estedad text-2xl font-bold text-charcoal">
            محصولات مرتبط با این مقاله
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {articleData.products.map((product: any) => {
              // Map to match ProductListItem interface
              const mappedProduct: ProductListItem = {
                id: product.id,
                title: product.title,
                slug: product.slug,
                code: "",
                measure: product.measure,
                price: product.price,
                priceAfterDiscount: product.priceAfterDiscount,
                discountDisplay:
                  product.discountPercent > 0
                    ? `${product.discountPercent}%`
                    : "۰%",
                images: [product.image],
                rating: 5,
                isActive: product.isActive,
                isFavorite: false,
                isInCart: false,
                category: {
                  id: "",
                  name: product.categoryName,
                },
              };

              return (
                <ProductCard
                  key={product.id}
                  product={mappedProduct}
                  categorySlug={product.categoryName}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
