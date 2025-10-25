import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true }, // optional, skip lint warnings
};

export default nextConfig;

