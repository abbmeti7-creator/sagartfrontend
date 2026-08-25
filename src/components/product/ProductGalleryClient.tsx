"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryClientProps {
  images: string[];
  title: string;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800";

export default function ProductGalleryClient({
  images,
  title,
}: ProductGalleryClientProps) {
  // ✅ Fallback for products without images
  const validImages =
    images && images.length > 0 ? images : [FALLBACK_IMG];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = validImages[selectedIndex];

  return (
    <div className="relative">
      {/* ✅ Purple-Gold Glow Effect (kept for luxury feel) */}
      <div className="absolute -inset-3 rounded-sagart bg-gradient-to-tr from-imperial-purple/30 via-gold/20 to-transparent blur-2xl" />

      <div className="relative">
        {/* ✅ Main Image - SSR with Next.js Image */}
        <div className="overflow-hidden rounded-sagart border border-gold/20 bg-luxury-surface shadow-luxury">
          <div className="relative aspect-square">
            <Image
              src={currentImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={selectedIndex === 0} // ✅ Priority only for first view
              className="object-cover transition-opacity duration-300"
              quality={90}
            />
          </div>
        </div>

        {/* ✅ Thumbnails - Only show if 2+ images */}
        {validImages.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {validImages.map((img, index) => {
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    isSelected
                      ? "border-gold shadow-lg scale-95"
                      : "border-gold/20 hover:border-gold/50 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`نمایش تصویر ${index + 1}`}
                  aria-pressed={isSelected}
                >
                  <Image
                    src={img}
                    alt={`${title} - تصویر ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                    className="object-cover"
                    quality={75} // ✅ Lower quality for thumbnails (faster)
                  />

                  {/* ✅ Gold overlay for selected state */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gold/10" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}