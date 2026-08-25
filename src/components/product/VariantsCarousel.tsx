"use client";

import Link from "next/link";
import Image from "next/image";
import type { ProductVariant } from "@/types";
import { formatPrice } from "@/lib/utils";

interface VariantsCarouselProps {
  variants: ProductVariant[];
  currentSlug: string;
}

export default function VariantsCarousel({ variants, currentSlug }: VariantsCarouselProps) {
  if (variants.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1.5 rounded-full bg-imperial-purple" />
        <h2 className="font-estedad text-2xl font-bold text-imperial-purple">
          سایر وزن‌ها و بسته‌بندی‌ها
        </h2>
      </div>

      <div 
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" 
        style={{ scrollbarWidth: "none" }}
      >
        {variants.map((variant) => {
          const isActive = variant.slug === currentSlug;
          // ✅ Check if variant has a discount
          const hasDiscount = variant.discountDisplay && variant.discountDisplay.trim() !== "۰%";

          return (
            <Link
              key={variant.id}
              href={`/category/${variant.categoryName}/product/${variant.slug}`}
              className={`group relative flex min-w-[160px] flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                isActive
                  ? "border-imperial-purple bg-imperial-tint shadow-lg scale-[1.02]"
                  : "border-gold/20 bg-luxury-surface hover:border-imperial-purple/50"
              }`}
            >
              {/* Variant Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-charcoal-surface">
                <Image
                  src={variant.image}
                  alt={variant.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Active Indicator Badge (Right side for RTL) */}
                {isActive && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-imperial-purple text-white shadow-md z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* ✅ Discount Badge (Left side to avoid overlap) */}
                {hasDiscount && (
                  <span className="absolute left-2 top-2 rounded-full bg-crimson px-2 py-0.5 text-[10px] font-bold text-white shadow-md z-10">
                    {variant.discountDisplay}%
                  </span>
                )}
              </div>

              {/* Variant Info */}
              <div className="flex flex-1 flex-col p-3 text-center">
                <p className={`text-xs font-bold ${isActive ? "text-imperial-purple" : "text-charcoal"}`}>
                  {variant.measure}
                </p>
                <p className="mt-1 font-estedad text-sm font-bold text-gold">
                  {formatPrice(variant.priceAfterDiscount)}
                </p>
                {/* ✅ Crossed out original price if discounted */}
                {hasDiscount && (
                  <p className="mt-0.5 text-[9px] text-charcoal/40 line-through">
                    {formatPrice(variant.price)}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}