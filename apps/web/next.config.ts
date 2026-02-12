import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // @ts-ignore - serverExternalPackages is experimental but needed for Prisma
  experimental: {
    // @ts-ignore
    serverExternalPackages: ["@prisma/client"],
  },
};

export default nextConfig;
