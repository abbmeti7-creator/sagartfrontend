import type { NextConfig } from "next";

// 1. Get the URL from env, fallback to localhost for dev safety
const rawBackendUrl = process.env.BACKEND_API_URL || "http://localhost:3000";

// 2. Safely parse the URL to extract exact parts Next.js needs
let hostname = "localhost";
let protocol: "http" | "https" = "http";
let port: string | undefined = undefined;

try {
  const parsed = new URL(rawBackendUrl);
  hostname = parsed.hostname;
  protocol = parsed.protocol.replace(":", "") as "http" | "https";
  port = parsed.port || undefined; // Only add port if it exists
} catch (error) {
  console.warn("⚠️ Invalid BACKEND_API_URL format. Falling back to localhost.");
}

const nextConfig: NextConfig = {
  // scrollRestoration is stable in Next.js 13.2+, no need for "experimental"

  images: {
    remotePatterns: [
      {
        protocol,
        hostname,
        ...(port && { port }),
        // 🔒 SECURITY BEST PRACTICE: Restrict to your specific upload folder
        // This prevents attackers from using your server to fetch malicious images
      },
      
      {
        protocol: "https",
        hostname: "sagartsaffron.ir",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
          {
        protocol: 'https',
        hostname: 'sagartsaffron.ir',
        port: '',
        pathname: '/images/**',
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