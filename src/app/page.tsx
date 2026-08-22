import { getArticles, getCategories } from "@/lib/api";
import { heroSlides } from "@/lib/mock-data";
import HeroCarousel from "@/components/hero/herocarousel";
import CategoryCard from "@/components/category/categorycard";
import ArticleCard from "@/components/article/articlecard";
import Link from "next/link";

export default async function HomePage() {
  // Parallel fetching برای سرعت بیشتر
  // نام‌گذاری صحیح متغیرهای نتیجه (Result) برای جلوگیری از تداخل
  const [categoriesResult, articlesResult] = await Promise.allSettled([
    getCategories(),
    getArticles(1, 4), 
  ]);

  // استخراج داده‌ها از Result
  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  const articles =
    articlesResult.status === "fulfilled" ? articlesResult.value.items : [];
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      {/* Hero Carousel */}
      <section className="mb-16">
        <HeroCarousel slides={heroSlides} />
      </section>

      {/* Category Showcase */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm tracking-widest text-gold">خزانه ساگارت</p>
            <h2 className="mt-2 font-estedad text-3xl font-bold text-charcoal">
              پیشکش‌های اصیل ایرانی
            </h2>
          </div>

          <Link
            href="/category/all"
            className="hidden items-center gap-2 text-sm text-charcoal transition-colors hover:text-gold md:flex"
          >
            <span>مشاهده همه</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="rounded-sagart border border-gold/20 bg-luxury-surface p-12 text-center">
            <p className="text-charcoal/60">
              در حال حاضر دسته‌بندی‌ای موجود نیست.
            </p>
          </div>
        )}
      </section>

      {/* Article Teaser */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm tracking-widest text-gold">
              کتیبه‌های باستانی
            </p>
            <h2 className="mt-2 font-estedad text-3xl font-bold text-charcoal">
              داستان‌های سرخ و زرین
            </h2>
          </div>

          <Link
            href="/articles"
            className="hidden items-center gap-2 text-sm text-charcoal transition-colors hover:text-gold md:flex"
          >
            <span>همه کتیبه‌ها</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-sagart border border-gold/20 bg-luxury-surface p-12 text-center">
            <p className="text-charcoal/60">در حال حاضر مقاله‌ای موجود نیست.</p>
          </div>
        )}

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/articles"
            className="rounded-sagart border border-gold px-8 py-3 text-sm text-charcoal transition-colors hover:bg-gold hover:text-charcoal"
          >
            مشاهده همه کتیبه‌ها
          </Link>
        </div>
      </section>
    </div>
  );
}