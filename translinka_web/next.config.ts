import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {

    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: {}, 
  },
};

export default nextConfig;
