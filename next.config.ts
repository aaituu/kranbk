import type { NextConfig } from "next";

// STATIC_EXPORT=1 — сборка статической версии сайта в ./out (см. build-static.sh):
// без API и админки, картинки без оптимизации (для GitHub Pages и любого хостинга).
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
