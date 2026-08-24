import Link from "next/link";
import type { ProductListItem } from "@/types";
import { formatPrice, faDigits } from "@/lib/utils";

interface ProductCardProps {
  product: ProductListItem;
  categorySlug: string;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800";

export default function ProductCard({ product, categorySlug }: ProductCardProps) {
  const imageUrl = product.images?.[0] || FALLBACK_IMG;
  const hasDiscount =
    !!product.discountDisplay && product.discountDisplay.trim() !== "۰%";

  return (
    <Link
      href={`/category/${categorySlug}/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sagart border border-gold/20 bg-luxury-surface shadow-luxury transition-all duration-300 hover:border-gold hover:shadow-2xl"
    >
      {/* ── Image ── */}
      <div className="relative aspect-square overflow-hidden bg-charcoal-surface">
        <img
          src={imageUrl}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {hasDiscount && (
          <span className="absolute right-2 top-2 rounded-full bg-crimson px-2.5 py-1 text-[10px] font-bold text-white">
            {product.discountDisplay} حراج
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="line-clamp-1 font-estedad text-sm font-bold text-charcoal transition-colors group-hover:text-gold sm:text-lg">
          {product.title}
        </h3>

        <p className="mt-1 text-[11px] text-charcoal/60 sm:text-sm">
          {faDigits(product.measure)}
        </p>

        {/* Price row — single line, bottom-aligned */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 sm:pt-4">
          <div className="flex min-w-0 items-baseline gap-1">
            <span className="whitespace-nowrap font-estedad text-xs font-bold text-gold sm:text-lg">
              {formatPrice(product.price)}
            </span>
            <span className="shrink-0 text-[10px] text-charcoal/60 sm:text-xs">
              تومان
            </span>
          </div>

          {/* Compact circular "view" button instead of floating text */}
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-charcoal sm:h-9 sm:w-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}