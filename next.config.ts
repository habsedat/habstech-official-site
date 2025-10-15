import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable API routes for static export
  // API routes will be added back later with Firebase Functions
};

export default nextConfig;
