// ✅ NO "use client" — Server Component with CSS-based horizontal scroll.

import Link from "next/link";
import type { ProductVariant } from "@/types";
import { formatPrice } from "@/lib/utils";

interface VariantsCarouselProps {
  variants: ProductVariant[];
  currentSlug: string;
}

export default function VariantsCarousel({ variants, currentSlug }: VariantsCarouselProps) {
  if (variants.length === 0) return null;

  return (
    <div className="rounded-sagart border border-gold/20 bg-luxury-surface p-6 shadow-luxury">
      <h3 className="mb-6 font-estedad text-xl font-bold text-charcoal">
        وزن‌های دیگر این محصول
      </h3>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {variants.map((variant) => (
          <Link
            key={variant.id}
            href={`/category/${variant.categoryName}/product/${variant.slug}`}
            className={`flex min-w-[180px] snap-start flex-col items-center rounded-sagart border-2 p-4 transition-colors duration-300 ${
              variant.slug === currentSlug
                ? "border-gold bg-gold/10"
                : "border-gold/20 hover:border-gold"
            }`}
          >
            <div className="mb-3 h-20 w-20 overflow-hidden rounded-sagart bg-charcoal-surface">
              <img
                src={variant.image}
                alt={variant.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="font-estedad text-sm font-bold text-charcoal">{variant.measure}</p>
              <p className="mt-1 text-xs text-gold">
                {formatPrice(variant.price)} تومان
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}