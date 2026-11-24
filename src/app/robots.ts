import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Outside production the pages carry noindex (meta tag + X-Robots-Tag), so
  // crawling stays open for crawlers to see it; no sitemap is advertised.
  if (!allowIndexing) {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
