import Image from "next/image";
import Link from "next/link";
import type { ArticleListItem } from "@/types";

interface ArticleCardProps {
  article: ArticleListItem;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-sagart border border-gold/20 bg-luxury-surface shadow-luxury transition-all duration-300 hover:border-gold hover:shadow-2xl"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-surface">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-charcoal/60">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {article.readingTime} دقیقه مطالعه
          </span>

          <span className="text-gold">•</span>

          <span>{article.publishedAt}</span>
        </div>

        <h3 className="font-estedad text-lg font-bold leading-relaxed text-charcoal transition-colors duration-300 group-hover:text-gold">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-charcoal/70">
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm text-gold transition-colors duration-300 group-hover:text-gold-hover">
          <span>ادامه کتیبه</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}