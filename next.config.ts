import type { NextConfig } from "next";

const LARAVEL_URL = process.env.LARAVEL_API_URL ?? "http://localhost:218";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${LARAVEL_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
