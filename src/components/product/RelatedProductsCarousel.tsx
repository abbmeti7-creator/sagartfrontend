"use client";

import Link from "next/link";
import type { ProductDetail } from "@/types";
import { formatPrice } from "@/lib/utils";

interface RelatedProductsCarouselProps {
  products: ProductDetail[];
  categorySlug: string;
}

export default function RelatedProductsCarousel({
  products,
  categorySlug,
}: RelatedProductsCarouselProps) {
  if (products.length === 0) return null;

  return (
    <div className="rounded-sagart border border-gold/20 bg-luxury-surface p-6 shadow-luxury">
      <h3 className="mb-6 font-estedad text-xl font-bold text-charcoal">
        همراه با این پیشکش
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-4" dir="ltr">
        {products.map((product) => {
          const imageUrl = product.images[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800";

          return (
            <Link
              key={product.id}
              href={`/category/${categorySlug}/product/${product.slug}`}
              className="group flex min-w-[200px] flex-col overflow-hidden rounded-sagart border border-gold/20 bg-luxury-white shadow-luxury transition-all duration-300 hover:border-gold"
            >
              <div className="aspect-square overflow-hidden bg-charcoal-surface">
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h4 className="font-estedad text-sm font-bold text-charcoal transition-colors group-hover:text-gold">
                  {product.title}
                </h4>
                <p className="mt-1 text-xs text-charcoal/60">{product.measure}</p>
                <p className="mt-2 font-estedad text-sm font-bold text-gold">
                  {formatPrice(product.price)} تومان
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}