import { getArticles } from "@/lib/api";
import ArticleCard from "@/components/article/articlecard";
import Link from "next/link";

type ArticlesPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const ITEMS_PER_PAGE = 10;

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));

  let articlesData: any = { items: [], total: 0, totalPages: 1 };
  
  try {
    const response = await getArticles(currentPage, ITEMS_PER_PAGE) as any;
// Adapt based on how your api.ts unwraps the response
articlesData = response?.data || response; 
  } catch (error) {
    console.error("❌ Failed to fetch articles:", error);
  }

  const articles = articlesData.items || [];
  const totalPages = articlesData.totalPages || 1;
  const totalItems = articlesData.total || 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      {/* Hero Banner */}
      <section className="mb-12 overflow-hidden rounded-sagart border border-gold/20 shadow-luxury">
        <div className="relative aspect-[16/9] lg:aspect-[24/9] bg-charcoal-surface">
          <div className="absolute inset-0 bg-black/40 backdrop-brightness-95" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <p className="font-estedad text-sm tracking-widest text-gold md:text-base">
              کتیبه‌های باستانی
            </p>
            <h1 className="mt-4 font-estedad text-4xl font-bold tracking-wider text-luxury-white md:text-6xl">
              داستان‌های سرخ و زرین
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
              دانش و هنر در بارگاه ساگارت
            </p>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-tr-sagart border-r-2 border-t-2 border-gold opacity-50" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 rounded-bl-sagart border-b-2 border-l-2 border-gold opacity-50" />
        </div>
      </section>

      {/* Articles Grid */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-estedad text-2xl font-bold text-charcoal">
            همه مقالات
          </h2>
          <span className="text-sm text-charcoal/60">
            {totalItems.toLocaleString("fa-IR")} مقاله
          </span>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {articles.map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-sagart border border-gold/20 bg-luxury-surface p-12 text-center">
            <p className="text-charcoal/60">
              در حال حاضر مقاله‌ای در خزانه موجود نیست.
            </p>
          </div>
        )}

        {/* Pagination (Same pattern as category page) */}
        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`/articles?page=${currentPage - 1}`}
                className="flex h-10 w-10 items-center justify-center rounded-sagart border border-gold/20 bg-luxury-surface text-charcoal transition-colors hover:border-gold hover:text-gold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/articles?page=${pageNum}`}
                className={`flex h-10 w-10 items-center justify-center rounded-sagart border text-sm font-bold transition-colors ${
                  pageNum === currentPage
                    ? "border-gold bg-gold text-charcoal"
                    : "border-gold/20 bg-luxury-surface text-charcoal hover:border-gold hover:text-gold"
                }`}
              >
                {pageNum.toLocaleString("fa-IR")}
              </Link>
            ))}

            {currentPage < totalPages && (
              <Link
                href={`/articles?page=${currentPage + 1}`}
                className="flex h-10 w-10 items-center justify-center rounded-sagart border border-gold/20 bg-luxury-surface text-charcoal transition-colors hover:border-gold hover:text-gold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            )}
          </nav>
        )}
      </section>
    </div>
  );
}