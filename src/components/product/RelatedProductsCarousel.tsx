"use client";

import Link from "next/link";
import { useRef } from "react";
import ProductCard from "./productcard";
import type { ProductListItem } from "@/types";

interface RelatedProductsCarouselProps {
  products: ProductListItem[];
  categorySlug: string;
}

export default function RelatedProductsCarousel({
  products,
  categorySlug,
}: RelatedProductsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Header with Purple Accent */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-imperial-purple" />
          <h2 className="font-estedad text-2xl font-bold text-imperial-purple">
            محصولات مرتبط
          </h2>
        </div>

        {/* Purple Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-imperial-purple/30 text-imperial-purple transition-colors hover:bg-imperial-purple hover:text-white"
            aria-label="قبلی"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-imperial-purple/30 text-imperial-purple transition-colors hover:bg-imperial-purple hover:text-white"
            aria-label="بعدی"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] snap-center sm:min-w-[300px]">
            <ProductCard product={product} categorySlug={categorySlug} />
          </div>
        ))}
      </div>
    </section>
  );
}