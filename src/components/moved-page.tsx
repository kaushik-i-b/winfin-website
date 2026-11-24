import Link from "next/link";
import { Container } from "./ui";
import { basePath } from "@/lib/site";

/**
 * Static replacement for a server redirect (GitHub Pages has none): an
 * immediate meta refresh to the new URL plus a visible link. The page itself
 * is noindex with a canonical pointing at the destination.
 */
export function MovedPage({ to, label }: { to: string; label: string }) {
  return (
    <Container className="py-24">
      <meta httpEquiv="refresh" content={`0; url=${basePath}${to}`} />
      <h1 className="text-2xl font-semibold">This page has moved</h1>
      <p className="mt-3 text-muted">
        Continue to{" "}
        <Link href={to} className="font-medium text-accent underline underline-offset-4">
          {label}
        </Link>
        .
      </p>
    </Container>
  );
}
