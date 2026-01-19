import { withWhopAppConfig } from "@whop/react/next.config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  env: {
    // NEXTAUTH_SECRET to be provided via environment variables in production
  },
  images: {
    remotePatterns: [
      { hostname: "cdn.whop.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default withWhopAppConfig(nextConfig);
