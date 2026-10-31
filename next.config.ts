import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
  experimental: {
    // Compile ICU messages at build time so the message-format parser never ships to the browser.
    messages: { path: "./messages", format: "json", locales: "infer", precompile: true },
  },
});

/**
 * Fully static site: `npm run build` writes plain HTML/CSS/JS to `out/`, which any web host can serve.
 * Every page is a folder with an index.html (trailingSlash), so no server rewrites are needed.
 * Security headers and caching for Apache hosts live in public/.htaccess.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // The photos in public/images are already compressed WebP; there is no image server in a static export.
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "radix-ui", "@react-three/drei"],
  },
};

export default withNextIntl(nextConfig);
