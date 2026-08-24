// ✅ NO "use client" — Server Component.
// Native <details>/<summary> gives zero-JS expand/collapse + fully indexable content.

interface AccordionItem {
  title: string;
  content: string;
}

interface ProductAccordionProps {
  items: AccordionItem[];
}

export default function ProductAccordion({ items }: ProductAccordionProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <details
          key={index}
          open={index === 0}
          className="group overflow-hidden rounded-sagart border border-gold/20 bg-luxury-surface shadow-luxury"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-estedad text-lg font-bold text-charcoal transition-colors hover:bg-imperial-tint hover:text-imperial-purple [&::-webkit-details-marker]:hidden">
            <span>{item.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform duration-300 group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <div className="border-t border-gold/10 px-6 pb-6 pt-4 leading-relaxed text-charcoal/80">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}