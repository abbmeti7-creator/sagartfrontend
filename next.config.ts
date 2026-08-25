import type { NextConfig } from "next";
const BACKEND_API_URL = process.env.BACKEND_API_URL;


const nextConfig: NextConfig = {

  experimental: {
    scrollRestoration: true,
  },
  images: {
    // ✅ این خط به Next.js اجازه می‌دهد تصاویر localhost را در محیط توسعه لود کند
    remotePatterns: [
      {
        protocol: "http",
        hostname: BACKEND_API_URL,
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;