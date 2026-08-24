import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

// نقشه تصاویر fallback برای دسته‌بندی‌هایی که image ندارند
// const fallbackImages: Record<string, string> = {
//   زعفران:
//     "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800",
//   زرشک: "https://images.unsplash.com/photo-1599909533730-3fb3d6e10e44?q=80&w=800",
//   عناب: "https://images.unsplash.com/photo-1604975701392-8a70508708f3?q=80&w=800",
//   سوغات: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
// };
// fallbackImages[category.name] ?? fallbackImages["سوغات"]
// const FALLBACK_IMG = "http://localhost:3000/uploads/images/1785940132030-8d2e8bdf-d6d6-4258-b4e0-69998f1d1248.png";


export default function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl =
    category.image ;

  return (
    <Link
      href={`/category/${category.name}`}
      className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-sagart border border-gold/20 bg-charcoal-surface shadow-luxury transition-all duration-300 hover:border-gold hover:shadow-2xl"
    >
      <Image
        src={imageUrl}
        alt={category.name}
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />

      {/* Category Name */}
      <div className="relative z-10 text-center">
        <h3 className="font-estedad text-3xl font-bold tracking-widest text-luxury-white transition-colors duration-300 group-hover:text-gold">
          {category.name}
        </h3>
      </div>

      {/* Gold Corner Decorations */}
      <div className="pointer-events-none absolute right-0 top-0 h-12 w-12 rounded-tr-sagart border-r-2 border-t-2 border-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 rounded-bl-sagart border-b-2 border-l-2 border-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}