import Link from "next/link";
import type { ProductListItem } from "@/types";
import { formatPrice, faDigits } from "@/lib/utils";

interface ProductCardProps {
  product: ProductListItem;
  categorySlug: string;
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800";

export default function ProductCard({ product, categorySlug }: ProductCardProps) {
  const imageUrl = product.images?.[0] || FALLBACK_IMG;
  const hasDiscount = !!product.discountDisplay && product.discountDisplay.trim() !== "۰%";

  return (
    <Link
      href={`/category/${categorySlug}/product/${product.slug}`}
      // ✅ Removed overflow-hidden from root to prevent badge clipping
      className="group flex flex-col rounded-sagart border border-gold/20 bg-luxury-surface shadow-luxury transition-all duration-300 hover:border-gold hover:shadow-2xl"
    >
      {/* ── Image Section ── */}
      {/* ✅ Added rounded-t-sagart and overflow-hidden here only */}
      <div className="relative aspect-square overflow-hidden rounded-t-sagart bg-charcoal-surface">
        <img
          src={imageUrl}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {hasDiscount && (
          // ✅ Moved further inside (right-4 top-4) to clear the large border radius
          <span className="absolute right-4 top-4 rounded-full bg-crimson px-3 py-1 text-xs font-bold text-white shadow-lg">
            {product.discountDisplay}% تخفیف
          </span>
        )}
      </div>

      {/* ── Content Section ── */}
      {/* ✅ Added rounded-b-sagart and background to match the card shape */}
      <div className="flex flex-1 flex-col rounded-b-sagart bg-luxury-surface p-3 sm:p-4">
        <h3 className="line-clamp-2 font-estedad text-sm font-bold text-charcoal transition-colors group-hover:text-gold sm:text-base">
          {product.title}
        </h3>

        <p className="mt-1 text-[11px] text-charcoal/60 sm:text-xs">
          {faDigits(product.measure)}
        </p>

        {/* Price */}
        <div className="mt-auto pt-3">
          {hasDiscount ? (
            <>
              <div className="flex items-baseline gap-1.5">
                <span className="font-estedad text-base font-bold text-gold sm:text-lg">
                  {formatPrice(product.priceAfterDiscount)}
                </span>
                <span className="text-[10px] text-charcoal/60 sm:text-xs">تومان</span>
              </div>
              <p className="mt-0.5 text-[10px] text-charcoal/40 line-through sm:text-xs">
                {formatPrice(product.price)}
              </p>
            </>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="font-estedad text-base font-bold text-gold sm:text-lg">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] text-charcoal/60 sm:text-xs">تومان</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}