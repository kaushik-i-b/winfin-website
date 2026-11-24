/** Subpath the site is served from ("" on its own domain). Mirrors next.config basePath. */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

export const site = {
  name: "Winfin Technologies",
  shortName: "Winfin",
  tagline: "Saakshi — AI call review for lending and collections",
  description:
    "Winfin Technologies is an India-based AI and software company developing Saakshi, an AI call-review product for lenders, NBFCs and collection agencies, and Oppuna, a private on-device wellness companion.",
  /** Production origin, without a trailing slash. NEXT_PUBLIC_SITE_URL overrides it. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://winfintechnologies.com").replace(/\/+$/, ""),
  email: "support@oppuna.com",
  location: "India",
} as const;

/**
 * Search engines may index the site only when the build sets
 * ALLOW_INDEXING=true (the GitHub Pages workflow does). Local and test
 * builds get noindex on every page.
 */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";

export const nav = [
  { href: "/saakshi/", label: "Saakshi" },
  { href: "/saakshi/#how-it-works", label: "How it works" },
  { href: "/saakshi/pilot/", label: "Pilot" },
  { href: "/oppuna/", label: "Other products" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Where every "Discuss a pilot" action lands: the enquiry section of the pilot page. */
export const pilotHref = "/saakshi/pilot/#enquiry";

export const oppunaLinks = {
  website: "https://oppuna.com/oppuna/",
  play: "https://play.google.com/store/apps/details?id=com.oppuna.care",
  privacy: "https://oppuna.com/privacy/",
  terms: "https://oppuna.com/terms/",
} as const;

type MailOptions = { subject: string; body?: string };

export function mailto({ subject, body }: MailOptions) {
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which some mail clients show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}

export const mail = {
  general: mailto({
    subject: "General enquiry — Winfin Technologies",
    body: "Hello Winfin team,\n\n",
  }),
  project: mailto({
    subject: "Software project enquiry — Winfin Technologies",
    body:
      "Hello Winfin team,\n\nOrganisation:\nWhat we want to build:\nTimeline:\nEngagement type (project / ongoing partnership / licensing):\n\n",
  }),
  saakshi: `mailto:${site.email}?subject=Saakshi%20pilot%20enquiry`,
  integration: mailto({
    subject: "Saakshi integration enquiry",
    body:
      "Hello Winfin team,\n\nCompany:\nPlatform (telephony / dialler / collections software):\nHow recordings are stored today:\nWhat you'd like to explore:\n\n",
  }),
  licensing: mailto({
    subject: "Product licensing enquiry — Winfin Technologies",
    body: "Hello Winfin team,\n\nOrganisation:\nProduct of interest:\nIntended use:\n\n",
  }),
} as const;
