import Image from "next/image";

interface Block {
  type: "paragraph" | "heading" | "blockquote" | "video" | "image";
  data: any;
}

export default function ArticleContentRenderer({ content }: { content: Block[] }) {
  if (!content || content.length === 0) return null;

  return (
    <div className="space-y-6 text-charcoal">
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            const HeadingTag = `h${block.data.level || 2}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag
                key={index}
                className="font-estedad text-2xl font-bold text-imperial-purple mt-8 mb-4"
                style={{ color: block.data.color || undefined }}
              >
                {block.data.text}
              </HeadingTag>
            );
            
          case "paragraph":
            return (
              <p
                key={index}
                className="leading-8 text-base md:text-lg"
                style={{ color: block.data.color || "var(--color-charcoal)" }}
              >
                {block.data.text}
              </p>
            );
            
          case "blockquote":
            return (
              <blockquote
                key={index}
                className="border-r-4 border-gold bg-imperial-tint/50 p-4 pr-6 italic rounded-l-sagart my-6"
                style={{ color: block.data.color || "var(--color-imperial-purple)" }}
              >
                {block.data.text}
              </blockquote>
            );
            
          case "image":
            return (
              <div key={index} className="my-8 overflow-hidden rounded-sagart border border-gold/20">
                <Image
                  src={block.data.url}
                  alt={block.data.alt || "تصویر مقاله"}
                  width={800}
                  height={400}
                  className="w-full object-cover"
                />
                {block.data.caption && (
                  <p className="bg-luxury-surface p-3 text-center text-xs text-charcoal/60">
                    {block.data.caption}
                  </p>
                )}
              </div>
            );
            
          case "video":
            return (
              <div key={index} className="my-8 overflow-hidden rounded-sagart border border-gold/20 bg-charcoal-surface">
                <video
                  src={block.data.url}
                  poster={block.data.posterUrl}
                  controls
                  className="w-full"
                />
                {block.data.caption && (
                  <p className="bg-luxury-surface p-3 text-center text-xs text-charcoal/60">
                    {block.data.caption}
                  </p>
                )}
              </div>
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
}