"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/types";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play هر ۵ ثانیه
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-sagart bg-charcoal text-luxury-white lg:aspect-[24/9]">
        <p className="font-estedad text-2xl">هیچ اسلایدی موجود نیست</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-sagart shadow-luxury">
      {/* Slides Container */}
      <div
        className="relative aspect-[16/9] lg:aspect-[24/9]"
        dir="ltr" // برای اسلایدر افقی
      >
        {slides.map((slide, index) => (
          <Link
            key={slide.id}
            href={slide.navigatelink}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
          </Link>
        ))}

        {/* Navigation Buttons */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-charcoal/40 p-3 text-luxury-white backdrop-blur-sm transition-colors hover:bg-gold hover:text-charcoal"
              aria-label="اسلاید قبلی"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-charcoal/40 p-3 text-luxury-white backdrop-blur-sm transition-colors hover:bg-gold hover:text-charcoal"
              aria-label="اسلاید بعدی"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-gold"
                    : "w-2 bg-luxury-white/60"
                }`}
                aria-label={`رفتن به اسلاید ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}