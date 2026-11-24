import type { Metadata } from "next";
import { site } from "./site";

/** Absolute URL on the configured production domain. Paths keep their trailing slash. */
export function absoluteUrl(path = "/") {
  return new URL(path, `${site.url}/`).toString();
}

type PageMeta = {
  /** Full <title>, used as-is (no template). */
  title: string;
  description: string;
  /** Path with a trailing slash, e.g. "/saakshi/". */
  path: string;
  /** Social preview image route. Defaults to the site-wide Saakshi image. */
  image?: { path: string; alt: string };
};

const defaultImage = {
  path: "/opengraph-image/",
  alt: "Saakshi by Winfin Technologies: every recovery call, evidence your team can review.",
};

/** Unique title, description, self-referencing canonical and social tags for a page. */
export function pageMetadata({ title, description, path, image = defaultImage }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const images = [{ url: absoluteUrl(image.path), width: 1200, height: 630, alt: image.alt }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      url,
      title,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export const orgId = `${absoluteUrl("/")}#organization`;
export const websiteId = `${absoluteUrl("/")}#website`;
