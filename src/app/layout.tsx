import type { Metadata, Viewport } from "next";
import { Vazirmatn, Estedad } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UnderConstructionProvider } from "@/components/under-construction/UnderConstructionOverlayProvider";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-body-vazir",
  display: "swap",
});

const estedad = Estedad({
  subsets: ["arabic"],
  variable: "--font-heading-estedad",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ساگارت | پیشکش‌های اصیل ایرانی",
    template: "%s | ساگارت",
  },
  description:
    "فروشگاه لوکس زعفران، زرشک و عناب با الهام از دوران هخامنشی و پیشکش ساگارتیان به بارگاه پادشاهان.",
};

export const viewport: Viewport = {
  themeColor: "#F5F5F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} ${estedad.variable}`}>
      <body className="min-h-screen flex flex-col">
        <UnderConstructionProvider>
          <Navbar />

          <main className="flex-grow">{children}</main>

          <Footer />
        </UnderConstructionProvider>
      </body>
    </html>
  );
}