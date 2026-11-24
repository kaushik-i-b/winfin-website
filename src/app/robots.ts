import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/lib/site";

// Generated once at build time (static export for GitHub Pages).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Non-production builds put noindex on every page; crawling stays open so
  // crawlers can see it, and no sitemap is advertised.
  if (!allowIndexing) {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
