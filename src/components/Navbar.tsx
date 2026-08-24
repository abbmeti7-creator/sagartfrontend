"use client";

import Link from "next/link";
import { useState } from "react";

import SagartLogo from "@/components/SagartLogo";
import { useUnderConstruction } from "@/components/under-construction/UnderConstructionOverlayProvider";

const categories = [
  {
    name: "زعفران",
    slug: "saffron",
  },
  {
    name: "زرشک",
    slug: "barberry",
  },
  {
    name: "عناب",
    slug: "jujube",
  },
  {
    name: "پیشکش",
    slug: "gifts",
  },
] as const;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openUnderConstruction } = useUnderConstruction();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-luxury-white/80 backdrop-blur-md">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Right side */}
          <div className="flex w-1/3 items-center gap-6">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-charcoal transition-colors hover:text-gold lg:hidden"
              aria-label="باز کردن منو"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={openUnderConstruction}
              className="text-charcoal transition-colors hover:text-gold lg:hidden"
              aria-label="پروفایل کاربری"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>

            <div className="hidden items-center gap-8 font-estedad text-lg text-charcoal lg:flex">
              <Link href="/" className="transition-colors hover:text-gold">
                بارگاه
              </Link>

              <div className="group relative">
                <Link
                  href="/category/all"
                  className="flex items-center gap-1 transition-colors hover:text-gold"
                >
                  خزانه
                  <svg
                    className="h-4 w-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>

                <div className="invisible absolute right-0 top-full z-50 mt-4 w-44 rounded-sagart border border-gold/20 bg-luxury-surface p-2 opacity-0 shadow-luxury transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.name}`}
                      className="block rounded-xl px-4 py-2 text-base text-charcoal transition-colors hover:bg-luxury-white hover:text-gold"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/articles"
                className="transition-colors hover:text-gold"
              >
                کتیبه‌ها
              </Link>
            </div>
          </div>

          {/* Center logo */}
          <div className="flex w-1/3 justify-center">
            <Link href="/" className="flex justify-center">
              <SagartLogo className="h-12 w-auto" />
            </Link>
          </div>

          {/* Left side */}
          <div className="flex w-1/3 items-center justify-end gap-6">
            <button
              type="button"
              onClick={openUnderConstruction}
              className="text-charcoal transition-colors hover:text-gold"
              aria-label="جستجو"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={openUnderConstruction}
              className="hidden text-charcoal transition-colors hover:text-gold lg:block"
              aria-label="پروفایل کاربری"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={openUnderConstruction}
              className="relative text-charcoal transition-colors hover:text-gold"
              aria-label="سبد خرید"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.357-4.5h-9.214c-1.342 0-2.477.951-2.746 2.266l-1.467 7.117A2.25 2.25 0 005.35 17.58h13.3a2.25 2.25 0 002.222-1.954l-1.467-7.117A2.25 2.25 0 0017.107 6z"
                />
              </svg>

              <span className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-crimson text-[10px] font-bold text-white">
                ۰
              </span>
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-luxury-white p-6 animate-fade-in lg:hidden">
          <div className="mb-10 flex items-center justify-between">
            <SagartLogo className="h-10 w-auto" />

            <button
              type="button"
              onClick={closeMobileMenu}
              className="text-charcoal transition-colors hover:text-gold"
              aria-label="بستن منو"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-8 text-3xl font-estedad font-bold text-charcoal">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="transition-colors hover:text-gold"
            >
              بارگاه
            </Link>

            <div className="border-b border-gold/20 pb-8">
              <div className="mb-4 text-lg font-normal text-gold">خزانه</div>

              <div className="flex flex-col gap-4 font-vazir text-xl font-normal">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={closeMobileMenu}
                    className="transition-colors hover:text-gold"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/articles"
              onClick={closeMobileMenu}
              className="transition-colors hover:text-gold"
            >
              کتیبه‌ها
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}