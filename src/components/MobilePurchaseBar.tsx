"use client";

import { useUnderConstruction } from "@/components/under-construction/UnderConstructionOverlayProvider";
import { formatPrice, faDigits } from "@/lib/utils";

interface MobilePurchaseBarProps {
  title: string;
  price: number;
  priceAfterDiscount: string;
  discountDisplay: string;
  measure: string;
  image: string;
}

export default function MobilePurchaseBar({
  title,
  price,
  priceAfterDiscount,
  discountDisplay,
  measure,
  image,
}: MobilePurchaseBarProps) {
  const { openUnderConstruction } = useUnderConstruction();

  // Determine if product has a real discount
  const hasDiscount = discountDisplay && discountDisplay.trim() !== "۰%";
  
  // Use discounted price if available, otherwise format the original price
  const displayPrice = hasDiscount ? priceAfterDiscount : formatPrice(price);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-luxury-surface border-t border-gold/20 shadow-2xl md:hidden">
      <div className="flex items-center gap-3 p-3">
        {/* Product Thumbnail */}
        <div className="shrink-0">
          <div className="h-14 w-14 overflow-hidden rounded-lg border border-gold/20 bg-charcoal-surface">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Product Info & Price */}
        <div className="flex-1 min-w-0">
          <h3 className="font-estedad text-sm font-bold text-charcoal line-clamp-1">
            {title}
          </h3>
          <p className="text-[10px] text-charcoal/60 mt-0.5">
            {faDigits(measure)}
          </p>
          
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-estedad text-base font-bold text-gold whitespace-nowrap">
              {displayPrice}
            </span>
            <span className="text-[10px] text-charcoal/60 shrink-0">تومان</span>
          </div>
          
          {hasDiscount && (
            <p className="text-[9px] text-charcoal/40 line-through">
              {formatPrice(price)}
            </p>
          )}
        </div>

        {/* Purchase Button */}
        <button
          type="button"
          onClick={openUnderConstruction}
          className="shrink-0 rounded-sagart bg-crimson px-5 py-2.5 font-estedad text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-gold hover:text-charcoal active:scale-[0.98]"
        >
          خرید
        </button>
      </div>
    </div>
  );
}