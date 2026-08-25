import {
  getProductBySlug,
  getProductVariants,
  getRelatedProducts,
  getCategories,
} from "@/lib/api";
import { notFound } from "next/navigation";
import { formatPrice, faDigits } from "@/lib/utils";
import PurchaseButton from "@/components/PurchaseButton";
import ProductAccordion from "@/components/product/ProductAccordion";
import VariantsCarousel from "@/components/product/VariantsCarousel";
import RelatedProductsCarousel from "@/components/product/RelatedProductsCarousel";
import ProductGalleryClient from "@/components/product/ProductGalleryClient"; // ✅ New import
import MobilePurchaseBar from "@/components/MobilePurchaseBar"; // ✅ Mobile bar
import Link from "next/link";
import { title } from "process";

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
  const slug = decodeURIComponent(rawSlug);
  const categoryName =
    categorySlugMap[categorySlug] || decodeURIComponent(categorySlug);

  const [productResult, variantsResult, relatedResult] =
    await Promise.allSettled([
      getProductBySlug(slug),
      getProductVariants(slug),
      getRelatedProducts(slug, 7),
    ]);

  if (productResult.status === "rejected") {
    notFound();
  }

  const product = productResult.value;
  const variants =
    variantsResult.status === "fulfilled" ? variantsResult.value : [];
  const relatedProducts =
    relatedResult.status === "fulfilled" ? relatedResult.value : [];
  const hasDiscount =
    product.discountDisplay && product.discountDisplay.trim() !== "۰%";

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
    {
      title:""
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-32 md:pb-12 md:py-12">
      {/* ── Breadcrumb ── */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-charcoal/60">
        <Link href="/" className="transition-colors hover:text-gold">
          بارگاه
        </Link>
        <span className="text-gold">/</span>
        <Link
          href={`/category/${categorySlug}`}
          className="transition-colors hover:text-gold"
        >
          {categoryName}
        </Link>
        <span className="text-gold">/</span>
        <span className="truncate text-charcoal">{product.title}</span>
      </nav>

      {/* ── Product Hero ── */}
      <section id="product-hero" className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* ✅ Gallery - Now using Next.js Image for SEO */}
        <ProductGalleryClient
          images={product.images}
          title={product.title}
        />

        {/* Info Card */}
        <div className="flex flex-col rounded-sagart border border-gold/20 bg-luxury-surface p-8 shadow-luxury">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-imperial-purple px-4 py-1.5 text-xs font-bold tracking-wide text-luxury-white">
            ✦ پیشکش شاهانه
          </span>

          <h1 className="font-estedad text-3xl font-bold tracking-wider text-charcoal">
            {product.title}
          </h1>
          <p className="mt-2 text-charcoal/60">{faDigits(product.measure)}</p>

          

          {/* Price Block */}
                   {/* Price Block - Clean & Clear */}
          <div className="my-6 border-y border-gold/20 py-6">
            <div className="flex items-end justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-charcoal/60 mb-2">قیمت</p>
                
                {hasDiscount ? (
                  <>
                    {/* Discounted Price - Large & Prominent */}
                    <div className="flex items-baseline gap-2">
                      <span className="font-estedad text-4xl font-bold text-gold">
                        {formatPrice(product.priceAfterDiscount)}
                      </span>
                      <span className="text-base text-charcoal/60">تومان</span>
                    </div>
                    
                    {/* Original Price - Crossed Out */}
                    <p className="mt-2 text-lg text-charcoal/40 line-through">
                      {formatPrice(product.price)} تومان
                    </p>
                  </>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="font-estedad text-4xl font-bold text-gold">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-base text-charcoal/60">تومان</span>
                  </div>
                )}
              </div>

              {/* Discount Badge - Large & Clear */}
              {hasDiscount && (
                <div className="flex flex-col items-center gap-1">
                  <span className="rounded-full bg-crimson px-5 py-2 text-lg font-bold text-white shadow-lg">
                    {product.discountDisplay}%
                  </span>
                  <span className="text-xs text-crimson font-bold">تخفیف</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <PurchaseButton label="افزودن به سبد خرید" />
          </div>
        </div>
      </section>

      {/* Trust Strip */}
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
            <p className="font-estedad text-sm font-bold text-imperial-purple">
              {item.title}
            </p>
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

      {/* ✅ Mobile Purchase Bar */}
      <MobilePurchaseBar
        title={product.title}
        price={product.price}
        priceAfterDiscount={product.priceAfterDiscount}
        discountDisplay={product.discountDisplay}
        measure={product.measure}
        image={product.images?.[0] || ""}
      />
    </div>
  );
}