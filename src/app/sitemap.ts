import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Update when page content changes meaningfully. */
const lastModified = "2026-11-24";

const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/saakshi/", priority: 0.9 },
  { path: "/saakshi/pilot/", priority: 0.9 },
  { path: "/oppuna/", priority: 0.7 },
  { path: "/services/", priority: 0.6 },
  { path: "/about/", priority: 0.5 },
  { path: "/contact/", priority: 0.6 },
];

// Generated once at build time (static export for GitHub Pages).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
