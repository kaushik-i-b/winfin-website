import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages: `npm run build` writes the site to out/.
  output: "export",
  // One URL per page (/saakshi/ rather than /saakshi). GitHub Pages also
  // redirects /saakshi to /saakshi/.
  trailingSlash: true,
  // Serve from a subpath, e.g. "/winfin-website" for kaushik-i-b.github.io/winfin-website/.
  // Leave unset when the site is on its own domain (winfintechnologies.com).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
