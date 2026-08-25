import { getCategories } from "@/lib/api";
import CategoryCard from "@/components/category/categorycard";

export default async function AllCategoriesPage() {
  let categories: any[] = [];
  
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("❌ Failed to fetch categories:", error);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      {/* ═══════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════ */}
      <section className="mb-12 overflow-hidden rounded-sagart border border-gold/20 shadow-luxury">
        <div className="relative aspect-[16/9] lg:aspect-[24/9] bg-charcoal-surface">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-brightness-95" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <p className="font-estedad text-sm tracking-widest text-gold md:text-base">
              خزانه ساگارت
            </p>
            <h1 className="mt-4 font-estedad text-4xl font-bold tracking-wider text-luxury-white md:text-6xl">
              تمام دسته‌بندی‌ها
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
              مجموعه‌ای کامل از پیشکش‌های اصیل ایرانی از بارگاه هخامنشی
            </p>
          </div>

          {/* Gold Corner Decorations */}
          <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-tr-sagart border-r-2 border-t-2 border-gold opacity-50" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 rounded-bl-sagart border-b-2 border-l-2 border-gold opacity-50" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CATEGORY GRID
      ═══════════════════════════════════════════════ */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-estedad text-2xl font-bold text-charcoal">
            دسته‌بندی محصولات
          </h2>
          <span className="text-sm text-charcoal/60">
            {categories.length.toLocaleString("fa-IR")} دسته‌بندی
          </span>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="rounded-sagart border border-gold/20 bg-luxury-surface p-12 text-center">
            <p className="text-charcoal/60">
              در حال حاضر دسته‌بندی‌ای در خزانه موجود نیست.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}