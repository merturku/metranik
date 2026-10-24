import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@metranik/core-calc", "@metranik/ifc"],
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
