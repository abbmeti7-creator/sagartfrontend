import {
  getProductBySlug,
  getProductVariants,
  getRelatedProducts,
  getCategories,
} from "@/lib/api";
import { notFound } from "next/navigation";
import { formatPrice,faDigits } from "@/lib/utils";
import PurchaseButton from "@/components/PurchaseButton";
import ProductAccordion from "@/components/product/ProductAccordion";
import VariantsCarousel from "@/components/product/VariantsCarousel";
import RelatedProductsCarousel from "@/components/product/RelatedProductsCarousel";
import Link from "next/link";
type ProductPageProps = {
  params: Promise<{
    name: string;
    slug: string;
  }>;
};

const categorySlugMap: Record<string, string> = {
  saffron: "زعفران",
  barberry: "زرشک",
  jujube: "عناب",
  gifts: "سوغات",
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { name: categorySlug, slug: rawSlug } = await params;
  
  // ✅ Decode کردن Slug برای جلوگیری از Double Encoding
  const slug = decodeURIComponent(rawSlug); 
  const categoryName = categorySlugMap[categorySlug] || decodeURIComponent(categorySlug);

  // ... بقیه کد بدون تغییر
  const [productResult, variantsResult, relatedResult] = await Promise.allSettled([
    getProductBySlug(slug),
    getProductVariants(slug),
    getRelatedProducts(slug, 7),
  ]);

  if (productResult.status === "rejected") {
    notFound();
  }

  const product = productResult.value;
  const variants = variantsResult.status === "fulfilled" ? variantsResult.value : [];
  const relatedProducts = relatedResult.status === "fulfilled" ? relatedResult.value : [];
  const hasDiscount = product.discountDisplay && product.discountDisplay.trim() !== "۰%";
  const accordionItems = [
    {
      title: "مشخصات فنی و خصوصیات",
      content: product.specifications || "مشخصات فنی در حال تکمیل است.",
    },
    {
      title: "داستان باستانی و پیشینه پیشکش",
      content: product.description || "داستان این محصول در حال تکمیل است.",
    },
    {
      title: "شرایط نگهداری و ضمانت اصالت",
      content: product.storageMethod || "شرایط نگهداری در حال تکمیل است.",
    },
  ];

  const mainImage = product.images[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
     {/* ── Breadcrumb ── */}
<nav className="mb-6 flex items-center gap-2 text-xs text-charcoal/60">
  <Link href="/" className="transition-colors hover:text-gold">بارگاه</Link>
  <span className="text-gold">/</span>
  <Link href={`/category/${categorySlug}`} className="transition-colors hover:text-gold">
    {categoryName}
  </Link>
  <span className="text-gold">/</span>
  <span className="truncate text-charcoal">{product.title}</span>
</nav>
{/* ── Product Hero ── */}
<section id="product-hero" className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
  
  {/* Gallery with Purple-Gold Glow */}
  <div className="relative">
    {/* ✅ NEW: Purple-Gold Glow behind image */}
    <div className="absolute -inset-3 rounded-sagart bg-gradient-to-tr from-imperial-purple/30 via-gold/20 to-transparent blur-2xl" />
    
    <div className="relative overflow-hidden rounded-sagart border border-gold/20 bg-luxury-surface shadow-luxury">
      <div className="aspect-square">
        <img src={mainImage} alt={product.title} className="h-full w-full object-cover" />
      </div>
    </div>
  </div>

  {/* Info Card */}
  <div className="flex flex-col rounded-sagart border border-gold/20 bg-luxury-surface p-8 shadow-luxury">
    
    {/* ✅ NEW: Royal Badge (Imperial Purple) */}
    <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-imperial-purple px-4 py-1.5 text-xs font-bold tracking-wide text-luxury-white">
      ✦ پیشکش شاهانه
    </span>

    <h1 className="font-estedad text-3xl font-bold tracking-wider text-charcoal">
      {product.title}
    </h1>
    <p className="mt-2 text-charcoal/60">{faDigits(product.measure)}</p>

    {/* ✅ NEW: Stock Pill (Imperial Tint background) */}
    <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-imperial-tint px-4 py-1.5 text-xs font-bold text-imperial-purple">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      موجود در خزانه
    </span>

    {/* Price Block */}
    <div className="my-6 border-y border-gold/20 py-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-charcoal/60">قیمت</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-estedad text-3xl font-bold text-gold">
              {formatPrice(product.priceAfterDiscount)}
            </span>
            <span className="text-sm text-charcoal/60">تومان</span>
          </div>
          {hasDiscount && (
            <p className="mt-1 text-sm text-charcoal/40 line-through">
              {formatPrice(product.price)}
            </p>
          )}
        </div>

        {hasDiscount && (
          <span className="rounded-full bg-crimson px-4 py-2 text-sm font-bold text-white">
            {product.discountDisplay} حراج
          </span>
        )}
      </div>
    </div>

    <div className="mt-auto">
      <PurchaseButton label="افزودن به سبد خرید" />
    </div>
  </div>
</section>

{/* ✅ NEW: Trust Strip (Imperial Tint background) */}
<section className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
  {[
    { title: "ضمانت اصالت", desc: "مهر زرین ساگارت" },
    { title: "ارسال سریع", desc: "سراسر ایران" },
    { title: "بسته‌بندی لوکس", desc: "مخمل و کریستال" },
    { title: "۷ روز بازگشت", desc: "بدون قید و شرط" },
  ].map((item) => (
    <div
      key={item.title}
      className="rounded-sagart border border-gold/20 bg-imperial-tint p-5 text-center transition-colors hover:border-gold"
    >
      <p className="font-estedad text-sm font-bold text-imperial-purple">{item.title}</p>
      <p className="mt-1 text-xs text-charcoal/60">{item.desc}</p>
    </div>
  ))}
</section>
      {/* Variants Carousel */}
      {variants.length > 0 && (
        <section className="mb-12">
          <VariantsCarousel variants={variants} currentSlug={slug} />
        </section>
      )}

      {/* Accordion */}
      <section className="mb-12">
        <ProductAccordion items={accordionItems} />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <RelatedProductsCarousel
            products={relatedProducts}
            categorySlug={categorySlug}
          />
        </section>
      )}
    </div>
  );
}