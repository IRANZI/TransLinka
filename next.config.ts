import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "bcryptjs", "nodemailer"],
  eslint: {

    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: {}, 
  },
};

export default nextConfig;
