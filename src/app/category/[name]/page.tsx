import { getCategories, getProductsByCategory } from "@/lib/api";
import ProductCard from "@/components/product/productcard";
import Link from "next/link";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{
    name: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

// Mapping from URL slug to Persian category name
const slugToNameMap: Record<string, string> = {
  saffron: "زعفران",
  barberry: "زرشک",
  jujube: "عناب",
  gifts: "سوغات",
  پیشکش: "سوغات",
};

const ITEMS_PER_PAGE = 10;

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { name: rawName } = await params;
  const { page: pageParam } = await searchParams;

  // Decode the slug safely (handles both encoded and already-decoded values)
  let decodedName: string;
  try {
    decodedName = decodeURIComponent(rawName);
  } catch {
    decodedName = rawName;
  }

  // Resolve the Persian category name (handles both English slugs and Persian names)
  const categoryName = slugToNameMap[decodedName] || decodedName;

  // Get current page number
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));

  // Fetch categories and products in parallel
  const [categoriesResult, productsResult] = await Promise.allSettled([
    getCategories(),
    // We'll fetch products after finding the category, so this is a placeholder
    Promise.resolve(null),
  ]);

  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];

  // Find the category by Persian name
  const category = categories.find((c) => c.name === categoryName);

  if (!category) {
    notFound();
  }

  // Now fetch products with the correct category ID and pagination
  let products: Awaited<ReturnType<typeof getProductsByCategory>>["items"] = [];
  let totalPages = 1;
  let totalItems = 0;

  try {
    const productsData = await getProductsByCategory(
      category.id,
      currentPage,
      ITEMS_PER_PAGE
    );
    products = productsData.items;
    totalPages = productsData.totalPages;
    totalItems = productsData.total;
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  }

  // Hero banner image (prefer coverImage, fallback to image, then placeholder)
  const bannerImage =
    category.coverImage ||
    category.image ||
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      {/* ═══════════════════════════════════════════════
          HERO BANNER (24:9 desktop / 16:9 mobile)
      ═══════════════════════════════════════════════ */}
      <section className="mb-12 overflow-hidden rounded-sagart border border-gold/20 shadow-luxury">
        <div className="relative aspect-[16/9] lg:aspect-[24/9]">
          {/* Background Image */}
          <img
            src={bannerImage}
            alt={categoryName}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-brightness-95" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <p className="font-estedad text-sm tracking-widest text-gold">
              خزانه ساگارت
            </p>
            <h1 className="mt-4 font-estedad text-4xl font-bold tracking-wider text-luxury-white md:text-6xl">
              {categoryName}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
              پیشکش‌های اصیل ایرانی از بارگاه هخامنشی
            </p>
          </div>

          {/* Gold Corner Decorations */}
          <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-tr-sagart border-r-2 border-t-2 border-gold opacity-50" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 rounded-bl-sagart border-b-2 border-l-2 border-gold opacity-50" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCT GRID (4 cols desktop / 2 cols mobile)
      ═══════════════════════════════════════════════ */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-estedad text-2xl font-bold text-charcoal">
            محصولات {categoryName}
          </h2>
          <span className="text-sm text-charcoal/60">
            {totalItems} محصول
          </span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={decodedName}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-sagart border border-gold/20 bg-luxury-surface p-12 text-center">
            <p className="text-charcoal/60">
              در حال حاضر محصولی در این دسته‌بندی موجود نیست.
            </p>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
          PAGINATION (only if more than 1 page)
      ═══════════════════════════════════════════════ */}
      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2">
          {/* Previous Page */}
          {currentPage > 1 ? (
            <Link
              href={`/category/${rawName}?page=${currentPage - 1}`}
              className="flex h-10 w-10 items-center justify-center rounded-sagart border border-gold/20 bg-luxury-surface text-charcoal transition-colors hover:border-gold hover:text-gold"
              aria-label="صفحه قبلی"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-sagart border border-gold/10 bg-luxury-surface text-charcoal/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          )}

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/category/${rawName}?page=${pageNum}`}
              className={`flex h-10 w-10 items-center justify-center rounded-sagart border text-sm font-bold transition-colors ${
                pageNum === currentPage
                  ? "border-gold bg-gold text-charcoal"
                  : "border-gold/20 bg-luxury-surface text-charcoal hover:border-gold hover:text-gold"
              }`}
              aria-current={pageNum === currentPage ? "page" : undefined}
            >
              {pageNum.toLocaleString("fa-IR")}
            </Link>
          ))}

          {/* Next Page */}
          {currentPage < totalPages ? (
            <Link
              href={`/category/${rawName}?page=${currentPage + 1}`}
              className="flex h-10 w-10 items-center justify-center rounded-sagart border border-gold/20 bg-luxury-surface text-charcoal transition-colors hover:border-gold hover:text-gold"
              aria-label="صفحه بعدی"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-sagart border border-gold/10 bg-luxury-surface text-charcoal/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </span>
          )}
        </nav>
      )}
    </div>
  );
}