import Link from "next/link";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800";

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = category.image || FALLBACK_IMG;
  const hasLabel = category.label && category.label.trim() !== "";

  return (
    <Link
      href={`/category/${category.name}`} // Adjust to category.slug if you add it to your types
      className="group relative block aspect-square overflow-hidden rounded-sagart border border-gold/20 shadow-luxury transition-all duration-300 hover:border-gold hover:shadow-2xl"
    >
      {/* Full Background Image */}
      <img
        src={imageUrl}
        alt={category.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* ✅ Optional Badge (e.g., "پر فروش") */}
      {hasLabel && (
        <span className="absolute right-3 top-3 rounded-full bg-crimson px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow-md">
          {category.label}
        </span>
      )}

      {/* ✅ Minimal Name Overlay at Bottom (Always readable, elegant) */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 sm:p-4">
        <h3 className="font-estedad text-sm font-bold text-white drop-shadow-md sm:text-base">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}