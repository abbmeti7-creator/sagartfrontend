import Link from "next/link";
import type { ArticleListItem } from "@/types";

interface ArticleCardProps {
  article: ArticleListItem;
}

const FALLBACK_IMG = "/public/squareimage.png";

export default function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = article.featuredImage || FALLBACK_IMG;

  return (
    <Link
      href={`/articles/${article.slug}`}
      // ✅ Changed to aspect-square
      className="group relative block aspect-square overflow-hidden rounded-sagart border border-gold/20 shadow-luxury transition-all duration-300 hover:border-gold hover:shadow-2xl"
    >
      {/* Full Background Image */}
      <img
        src={imageUrl}
        alt={article.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Text Content at the Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <h3 className="line-clamp-2 font-estedad text-sm font-bold text-white drop-shadow-md sm:text-base">
          {article.title}
        </h3>
        
        <div className="mt-2 flex items-center gap-2 text-[10px] text-white/80 sm:text-xs">
          <span>{article.readingTime} دقیقه مطالعه</span>
          <span>•</span>
          <span>{article.views} بازدید</span>
        </div>
      </div>
    </Link>
  );
}