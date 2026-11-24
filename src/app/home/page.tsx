import type { Metadata } from "next";
import { MovedPage } from "@/components/moved-page";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Moved | Winfin Technologies" },
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomeMoved() {
  return <MovedPage to="/" label="the Winfin Technologies homepage" />;
}
