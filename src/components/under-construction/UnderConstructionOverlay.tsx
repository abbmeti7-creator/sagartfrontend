"use client";

import { useEffect } from "react";

interface UnderConstructionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UnderConstructionOverlay({
  isOpen,
  onClose,
}: UnderConstructionOverlayProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="در دست ساخت"
    >
      <div
        className="relative w-full max-w-md rounded-sagart border border-gold/30 bg-luxury-surface p-8 text-center shadow-luxury animate-slide-up"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-tr-sagart border-r-2 border-t-2 border-gold opacity-50" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 rounded-bl-sagart border-b-2 border-l-2 border-gold opacity-50" />

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-imperial-purple/20 bg-imperial-purple/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-imperial-purple"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h3 className="text-2xl text-charcoal">در دست ساخت</h3>

        <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-charcoal/80">
          این بخش در نسخه نخست ساگارت در دست ساخت است.
          <br />
          قابلیت خرید و حساب کاربری در نسخه بعدی فعال خواهد شد.
        </p>

        <button
          type="button"
          onClick={onClose}
  className="w-full py-4 bg-imperial-purple text-luxury-white font-estedad text-lg rounded-sagart hover:bg-imperial-light transition-all duration-300 shadow-luxury tracking-wide"
        >
          بازگشت به بارگاه
        </button>
      </div>
    </div>
  );
}