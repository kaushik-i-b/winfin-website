import Link from "next/link";
import { JsonLd } from "./json-ld";
import { absoluteUrl } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. Home is added automatically. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-subtle">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="inline-flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-medium text-ink">{c.name}</span>
                ) : (
                  <>
                    <Link href={c.path} className="text-muted transition-colors hover:text-accent">{c.name}</Link>
                    <span aria-hidden="true" className="text-line-strong">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.path),
          })),
        }}
      />
    </>
  );
}
