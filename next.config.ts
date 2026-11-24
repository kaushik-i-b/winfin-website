import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages: `npm run build` writes the site to out/.
  output: "export",
  // One URL per page (/saakshi/ rather than /saakshi). GitHub Pages also
  // redirects /saakshi to /saakshi/.
  trailingSlash: true,
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
