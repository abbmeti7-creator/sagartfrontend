import type { Metadata, Viewport } from "next";
import { Vazirmatn} from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UnderConstructionProvider } from "@/components/under-construction/UnderConstructionOverlayProvider";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-body-vazir",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ساگارت | فروشگاه لوکس زعفران، زرشک و عناب اصیل قائنات",
    template: "%s | ساگارت",
  },
  description:
    "خرید لوکس‌ترین پیشکش‌های اصیل ایرانی؛ زعفران نگین و سوپرنگین صادراتی، زرشک پفکی قائنات و عناب اعلا با بسته‌بندی نفیس هخامنشی.",
  keywords: [
    "خرید زعفران",
    "زعفران صادراتی قائنات",
    "قیمت زعفران سوپر نگین",
    "خرید زرشک پفکی",
    "عناب اعلا",
    "پک هدیه سازمانی لوکس",
    "ساگارت",
  ],
  authors: [{ name: "ساگارت (Sagart)" }],
  creator: "ساگارت",
  publisher: "ساگارت",
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: "ساگارت | Sagart",
    title: "ساگارت | پیشکش‌های اصیل ایرانی",
    description:
      "فروشگاه لوکس زعفران، زرشک و عناب با الهام از پیشکش ساگارتیان به بارگاه هخامنشی.",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "لوگوی رسمی ساگارت",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ساگارت | پیشکش‌های اصیل ایرانی",
    description: "فروشگاه لوکس زعفران، زرشک و عناب با ضمانت اصالت قائنات.",
    images: ["/icon-512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    <html lang="fa" dir="rtl" className={`${vazir.variable}`}>
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