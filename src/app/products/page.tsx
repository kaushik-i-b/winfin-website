import type { Metadata } from "next";
import { MovedPage } from "@/components/moved-page";
import { absoluteUrl } from "@/lib/seo";

// The old /products/ page now lives at /saakshi/ (Oppuna has /oppuna/).
export const metadata: Metadata = {
  title: { absolute: "Moved to Saakshi | Winfin Technologies" },
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl("/saakshi/") },
};

export default function ProductsMoved() {
  return <MovedPage to="/saakshi/" label="Saakshi" />;
}
