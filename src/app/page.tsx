import { getArticles, getCategories } from "@/lib/api";
import { heroSlides } from "@/lib/mock-data";
import HeroCarousel from "@/components/hero/herocarousel";
import CategoryCard from "@/components/category/categorycard";
import ArticleCard from "@/components/article/articlecard";
import Link from "next/link";

export default async function HomePage() {
  // ✅ Increased articles limit from 4 to 8 to fill the new tighter grid
  const [categoriesResult, articlesResult] = await Promise.allSettled([
    getCategories(),
    getArticles(1, 4), 
  ]);

  const categories = categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  const articles = articlesResult.status === "fulfilled" ? articlesResult.value.items : [];

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 md:px-4 md:py-8 lg:py-12">
      {/* Hero Carousel */}
      <section className="mb-10 md:mb-14">
        <HeroCarousel slides={heroSlides} />
      </section>

      {/* Category Showcase */}
      <section className="mb-10 md:mb-14">
        <div className="mb-5 flex items-center justify-between md:mb-8">
          <div>
            <p className="text-xs tracking-widest text-gold md:text-sm">خزانه ساگارت</p>
            <h2 className="mt-1 font-estedad text-xl font-bold text-charcoal md:text-3xl">
              پیشکش‌های اصیل ایرانی
            </h2>
          </div>

          <Link
            href="/category/all"
            className="hidden items-center gap-2 text-sm text-charcoal transition-colors hover:text-gold md:flex"
          >
            <span>مشاهده همه</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        {categories.length > 0 ? (
          // ✅ Tighter Grid: 2 cols mobile -> 3 cols sm -> 4 cols md -> 5 cols xl
         // ✅ For Category Showcase
<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
  {categories.map((category) => (
    <CategoryCard key={category.id} category={category} />
  ))}
</div>
        ) : (
          <div className="rounded-sagart border border-gold/20 bg-luxury-surface p-8 text-center md:p-12">
            <p className="text-charcoal/60">در حال حاضر دسته‌بندی‌ای موجود نیست.</p>
          </div>
        )}
      </section>

      {/* Article Teaser */}
      <section className="mb-10 md:mb-14">
        <div className="mb-5 flex items-center justify-between md:mb-8">
          <div>
            <p className="text-xs tracking-widest text-gold md:text-sm">کتیبه‌های باستانی</p>
            <h2 className="mt-1 font-estedad text-xl font-bold text-charcoal md:text-3xl">
              داستان‌های سرخ و زرین
            </h2>
          </div>

          <Link
            href="/articles"
            className="hidden items-center gap-2 text-sm text-charcoal transition-colors hover:text-gold md:flex"
          >
            <span>همه کتیبه‌ها</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        {articles.length > 0 ? (
          // ✅ Same tighter grid for articles
          // ✅ For Article Teaser
<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
  {articles.map((article) => (
    <ArticleCard key={article.id} article={article} />
  ))}
</div>
        ) : (
          <div className="rounded-sagart border border-gold/20 bg-luxury-surface p-8 text-center md:p-12">
            <p className="text-charcoal/60">در حال حاضر مقاله‌ای موجود نیست.</p>
          </div>
        )}

        <div className="mt-6 flex justify-center md:mt-8 md:hidden">
          <Link
            href="/articles"
            className="rounded-sagart border border-gold px-6 py-2 text-xs text-charcoal transition-colors hover:bg-gold hover:text-charcoal"
          >
            مشاهده همه کتیبه‌ها
          </Link>
        </div>
      </section>
    </div>
  );
}