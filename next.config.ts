import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One URL per page: /saakshi redirects to /saakshi/ (308).
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Old products page: Saakshi and Oppuna now have their own pages.
      { source: "/products", destination: "/saakshi/", permanent: true },
      { source: "/saakshi/pilot-enquiry", destination: "/saakshi/pilot/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
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
