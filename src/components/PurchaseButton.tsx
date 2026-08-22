"use client";

import { useUnderConstruction } from "@/components/under-construction/UnderConstructionOverlayProvider";

interface PurchaseButtonProps {
  label?: string;
  className?: string;
}

export default function PurchaseButton({
  label = "افزودن به سبد خرید",
  className = "",
}: PurchaseButtonProps) {
  const { openUnderConstruction } = useUnderConstruction();

  return (
    <button
      type="button"
      onClick={openUnderConstruction}
      className={`rounded-sagart bg-crimson px-8 py-4 font-estedad text-lg tracking-wide text-white transition-all duration-300 hover:bg-gold hover:text-charcoal ${className}`}
    >
      {label}
    </button>
  );
}