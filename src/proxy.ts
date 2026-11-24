import { NextResponse, type NextRequest } from "next/server";

/**
 * Keeps non-production hosts out of search results and folds the www/apex
 * twin of the production domain into one canonical host.
 *
 * - Indexing allowed (production): requests on the "www." twin of the
 *   configured domain (or the apex, if the domain uses www) get a 308 to the
 *   canonical host. Any other host (e.g. *.vercel.app) gets X-Robots-Tag: noindex.
 * - Indexing not allowed (local, staging, previews): every response gets noindex.
 */
const canonical = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
const indexable =
  process.env.ALLOW_INDEXING === "true" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

function twinOf(host: string) {
  return host.startsWith("www.") ? host.slice(4) : `www.${host}`;
}

export function proxy(request: NextRequest) {
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "").toLowerCase();

  if (indexable && host === twinOf(canonical.host)) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, canonical);
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();
  if (!indexable || host !== canonical.host) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
