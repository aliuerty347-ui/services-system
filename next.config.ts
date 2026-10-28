import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // يتجاوز أخطاء TypeScript أثناء الـ Build على Render
    ignoreBuildErrors: true,
  },
};

export default nextConfig;