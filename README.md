# Winfin Technologies — website

Website for Winfin Technologies. **Saakshi** (AI call review for lending and collections, in development) is the flagship and the focus of the homepage. **Oppuna** appears under "More from Winfin".

The main conversion goal is a Saakshi pilot enquiry. Every "Discuss a pilot" action leads to the `#pilot-enquiry` section on the homepage, whose main button is `mailto:support@oppuna.com?subject=Saakshi%20pilot%20enquiry`.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4. No other runtime dependencies.

## Run locally

Requires Node.js 20.9+ (22 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts: `npm run build` (production build), `npm start` (serve the build), `npm run lint`.

## Configuration

Copy `.env.example` to `.env.local` and fill in what you need.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public production URL without a trailing slash, defaults to `https://winfintechnologies.com`. Used for canonical URLs, Open Graph, structured data, `sitemap.xml` and `robots.txt`. Set it only if the production domain changes. Requests on `www.winfintechnologies.com` are redirected to it. |
| `ALLOW_INDEXING` | Set to `true` **only** on the production deployment. When unset, every page and file is served with `noindex` (meta tag and `X-Robots-Tag` header) and `robots.txt` lists no sitemap. On Vercel, preview deployments stay `noindex` even if this is set. |
| `CONTACT_WEBHOOK_URL` | Option A for the contact form: any endpoint that accepts a JSON `POST` (Formspree, Make, Zapier, n8n, your own API). |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Option B: send form submissions as email via [Resend](https://resend.com). `CONTACT_FROM_EMAIL` must use a domain verified in Resend. |

### Contact form behaviour

- **Not configured** (neither option set): the form shows a notice and its button opens the visitor's email app with their message pre-filled to `support@oppuna.com`. No submissions are lost silently.
- **Configured**: client and server validation, a loading state, a success confirmation, and an email fallback if delivery fails. A hidden honeypot field filters basic spam.
- Webhook payload: `{ subject, name, email, organisation, topic, topicLabel, message, text, submittedAt }`.

The email buttons on the Contact page (general, software project, Saakshi pilot, licensing) are plain `mailto:` links with subject lines and work without any configuration.

## Deploy

### Vercel (recommended)

1. Push this folder to a Git repository.
2. Import it at vercel.com/new. The framework is detected automatically.
3. Add the environment variables above under Settings → Environment Variables.
4. Add `winfintechnologies.com` and `www.winfintechnologies.com` as domains. Set `NEXT_PUBLIC_SITE_URL=https://winfintechnologies.com` and `ALLOW_INDEXING=true` for the **Production** environment only, then redeploy.
5. Recommended: in Vercel → Settings → Deployment Protection, protect preview deployments so staging is not publicly reachable at all.

### Any Node host

```bash
npm ci
npm run build
NEXT_PUBLIC_SITE_URL=https://winfintechnologies.com ALLOW_INDEXING=true npm run build
NEXT_PUBLIC_SITE_URL=https://winfintechnologies.com ALLOW_INDEXING=true npm start   # port 3000 (PORT to change)
```

The contact form uses a server route (`/api/contact`), so static-only hosting (`next export`) is not supported unless you remove the form and keep the `mailto:` links.

## SEO

### Pages and search focus

| Page | Path | Title | Focus |
| --- | --- | --- | --- |
| Home | `/` | Saakshi AI Recovery Call Review \| Winfin Technologies | Winfin, Saakshi AI call review |
| Saakshi | `/saakshi/` | AI Recovery Call Monitoring for Lenders \| Saakshi | Recovery call monitoring, AI QA for collections, FAQ |
| Saakshi pilot | `/saakshi/pilot/` | Recovery Call Review Pilot for Lenders & Collection Agencies \| Saakshi | Pilot scope, setup, pilot FAQ, enquiry |
| Oppuna | `/oppuna/` | Oppuna: Offline AI Wellness Journal & Private Mood Tracker | Offline AI journal, private mood tracking |
| Services | `/services/` | Custom AI & Software Engineering Services \| Winfin Technologies | Custom software and AI engineering |
| About | `/about/` | About Winfin Technologies \| AI & Software Company in India | Company information |
| Contact | `/contact/` | Contact Winfin Technologies \| Saakshi Pilots & Partnership Enquiries | Product and partnership enquiries |

Each page sets its title, description, canonical and social tags through `pageMetadata()` in `src/lib/seo.ts`. Every page is statically generated, so all content is in the initial HTML.

### What is implemented

- **URLs:** trailing slashes everywhere (`/saakshi` → 308 → `/saakshi/`). Self-referencing absolute canonicals on the production domain. `/products` → `/saakshi/`, `/home` and `/index.html` → `/`. On production, the `www`/apex twin of `NEXT_PUBLIC_SITE_URL` redirects (308) to the canonical host. Any other host serving the production build (for example `*.vercel.app`) gets `X-Robots-Tag: noindex` (`src/proxy.ts`).
- **Indexing:** see `ALLOW_INDEXING` above. `robots.txt` (`src/app/robots.ts`) and `sitemap.xml` (`src/app/sitemap.ts`) use the configured domain. Update `lastModified` in `sitemap.ts` when content changes meaningfully.
- **404:** unknown URLs return HTTP 404 with a `noindex` page linking to the main sections.
- **Social sharing:** Open Graph and Twitter tags on every page. There is a 1200×630 Saakshi image (`src/app/opengraph-image.tsx`) and a separate Oppuna image (`src/app/oppuna/opengraph-image.tsx`).
- **Structured data (JSON-LD):**
  - `Organization` and `WebSite` on every page (`layout.tsx`), with the logo at `/logo.png`.
  - `BreadcrumbList` on internal pages, matching the visible breadcrumbs.
  - `SoftwareApplication` for Oppuna.
  - `WebPage` for Saakshi.

  Saakshi has no software-application markup because it is not released. Add it, with offers and pricing, only once it is available. No ratings, prices or social profiles are included because none are verified. Add `sameAs` links to `Organization` once official profiles exist.
- **Performance:** no raster images in the page content (SVG and CSS only), fonts self-hosted via `next/font` with preloading, and minimal client JavaScript. Measured on the production build at 375px: layout shift 0.
- **Regulatory content:** none is published. If you add a regulatory article, cite current official sources and show a visible "Last reviewed" date on it.

### Checking a deployment

```bash
curl -sI https://winfintechnologies.com/saakshi | grep -i -E "^HTTP|location"     # 308 to /saakshi/
curl -s https://winfintechnologies.com/saakshi/ | grep -o '<link rel="canonical"[^>]*>'
curl -s https://winfintechnologies.com/robots.txt
curl -s https://winfintechnologies.com/sitemap.xml
curl -sI https://your-preview-url/ | grep -i x-robots-tag                  # noindex on previews
```

Then validate a few URLs in Google's [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/), and run PageSpeed Insights on the homepage and `/saakshi/` for mobile performance.

### Google Search Console: verify the domain and submit the sitemap

These steps need the **website owner's Google account and access to the domain's DNS settings**. They cannot be done from the codebase.

1. Go to [search.google.com/search-console](https://search.google.com/search-console) and choose **Add property → Domain**. Enter the bare domain, `winfintechnologies.com`. This covers `www`, apex, `http` and `https`.
2. Google shows a **TXT record**. Add it in the DNS settings at your domain registrar or DNS host. This needs DNS access.
3. Back in Search Console, click **Verify**. DNS changes can take from a few minutes to a day to propagate.
4. Open **Sitemaps** and submit `https://winfintechnologies.com/sitemap.xml`. The status should show "Success" with 7 discovered URLs.
5. Use **URL inspection** on `/` and `/saakshi/`, check that the canonical Google selects matches yours, and click **Request indexing**.
6. Optional: verify the same domain in [Bing Webmaster Tools](https://www.bing.com/webmasters), which can import from Search Console, and submit the sitemap there.

Make sure `ALLOW_INDEXING=true` is set on production **before** requesting indexing. Otherwise Google will see `noindex`.

## Project structure

```
src/
  app/
    page.tsx                 Home: Saakshi hero, problem, workflow, example
                             investigation, audiences, pilot scope, pilot
                             enquiry, Oppuna, company
    saakshi/page.tsx         Saakshi product page, demo, human review, FAQ
    saakshi/pilot/page.tsx   Pilot scope, stages, pilot FAQ, enquiry
    oppuna/page.tsx          Oppuna page, FAQ, own social image
    services/page.tsx        Services and engagement models
    about/page.tsx           Company
    contact/page.tsx         Email routes + contact form
    api/contact/route.ts     Configurable form backend
    opengraph-image.tsx      Generated social image
    sitemap.ts, robots.ts, icon.svg, logo.png/, not-found.tsx
  proxy.ts                   noindex for non-production hosts, www/apex redirect
  components/
    site-header.tsx          Responsive, keyboard-accessible navigation
    site-footer.tsx
    oppuna-visual.tsx        Illustrative Oppuna composition
    saakshi-preview.tsx      Hero dashboard preview (fictional data)
    investigation-example.tsx  Four-step fictional complaint investigation
    saakshi-demo.tsx         Detailed demo on the Saakshi page
    contact-form.tsx
    ui.tsx, logo.tsx, cta-band.tsx
  lib/
    site.ts                  Company details, links, mailto helpers
    content.ts               Services and engagement copy
    contact.ts               Shared validation
```

## Editing content

- Navigation, pilot link, company email, Oppuna links and email subject lines: `src/lib/site.ts`
- Homepage Saakshi copy (problem, workflow, audiences, pilot scope): `src/app/page.tsx`
- Services copy: `src/lib/content.ts`
- Saakshi FAQs, workflow and pilot scope: `src/lib/saakshi.tsx`
- Page titles and descriptions: the `pageMetadata()` call at the top of each page
- Saakshi demo data (all fictional): `src/components/saakshi-preview.tsx`, `investigation-example.tsx`, `saakshi-demo.tsx`

## Design system

- **Tokens** are defined in `src/app/globals.css` (`@theme`):
  - Canvas `#F7F8FA`, surface `#FFFFFF`, ink `#172033`, muted text `#526075`, lines `#DFE4EC`.
  - Cobalt accent `#315EFB` for Winfin and Saakshi. Use it for primary actions, active states and links.
  - Deep navy `#101827` for dark sections: the homepage workflow, the pilot enquiry panel and the footer.
  - Lavender `#6D5BD0` for Oppuna only.
  - Green, amber and red (`ok`, `warn`, `risk`) are reserved for statuses inside the Saakshi interface: clear or dismissed, awaiting review, and potential or confirmed issue.
- **Type:** Instrument Sans throughout. IBM Plex Mono only for timestamps, call IDs and interface metadata. Headlines are medium weight and in sentence case.
- **Contrast:** all text and accent pairings meet WCAG AA (4.5:1 or higher).
- **Dark mode:** follows the visitor's system setting by default.
  - The header toggle cycles System → Light → Dark. The choice is saved in `localStorage` and set as `data-theme` on `<html>` by a small `beforeInteractive` script in `layout.tsx`, so there is no flash on load.
  - The dark values live in `globals.css`, in the `prefers-color-scheme` block and the `[data-theme="dark"]` block. Keep the two in sync.
  - In dark mode, filled buttons use `text-on-accent` and `text-on-lavender`. Use these instead of `text-white` on accent or lavender backgrounds.
- **Components:** buttons and the page header in `src/components/ui.tsx`. Buttons are rounded rectangles; variants are `primary`, `secondary`, `ghost`, `dark` and `lavender`.

## Accessibility and motion

- Skip link, visible focus styles, `aria-current` navigation, labelled form fields with linked errors and a focusable error summary.
- The mobile menu traps focus, closes on Escape, on navigation and on resize to desktop.
- All animation is disabled under `prefers-reduced-motion: reduce`. Scroll reveals use CSS scroll-driven animations where supported. Other browsers show the content without animation.

## Content guardrails

- Saakshi is labelled **In development · Pilot enquiries welcome**. Capabilities are described as planned and tagged **Pilot scope** or **Planned**. When a capability is confirmed in production, update its tag and wording.
- AI findings are always described as potential issues for human review. Every interface example is labelled as illustrative, with fictional data.
- The site makes no claims of regulatory approval or guaranteed compliance. Add regulatory references only with verified official sources.
- No testimonials, customer names, metrics, certifications or founder biographies are included. Add them only once they are verified.
