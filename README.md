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

Other scripts: `npm run build` (static site in `out/`) and `npm run lint`. `npm start` does not apply to a static export; serve `out/` with any static file server instead.

## Configuration

The site is a fully static export (`output: "export"`). `npm run build` writes it to `out/`, and it is hosted on **GitHub Pages**. Build-time settings:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL, defaults to `https://winfintechnologies.com`. Used for canonical URLs, Open Graph, structured data, `sitemap.xml` and `robots.txt`. |
| `ALLOW_INDEXING` | `true` only for the production build (the deploy workflow sets it). Without it every page is `noindex` and `robots.txt` lists no sitemap. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional. A form-service endpoint that accepts a JSON `POST` from the browser and returns 2xx, e.g. a [Formspree](https://formspree.io) form URL. In GitHub, set it as the repository variable `CONTACT_ENDPOINT`. |

### Contact form behaviour

- **No endpoint set:** the form shows a notice and its button opens the visitor's email app with their message pre-filled to `support@oppuna.com`. No submissions are lost silently.
- **Endpoint set:** client-side validation, a loading state, a success confirmation, and an email fallback if delivery fails. A hidden honeypot field filters basic spam. The JSON sent is `{ _subject, name, email, organisation, topic, message, submittedAt }`.

The email links on the Contact page (Saakshi pilot, software project, general) are plain `mailto:` links and need no setup.

## Deploy: GitHub Pages

Every push to `main` runs `.github/workflows/deploy.yml`: lint, static build with production settings, then deploy to GitHub Pages. `public/CNAME` sets the custom domain to `winfintechnologies.com`.

**One-time setup (needs the repository owner, and DNS access for the domain):**

1. GitHub → repository **Settings → Pages**: set **Source** to **GitHub Actions**. Pages on a private repository needs a paid GitHub plan; on a free plan the repository must be public.
2. In the same page, set **Custom domain** to `winfintechnologies.com` and, once DNS works, tick **Enforce HTTPS**.
3. At your DNS provider for `winfintechnologies.com`:
   - `A` records for the apex `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Optional `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` record: `www` → `kaushik-i-b.github.io`

   GitHub then redirects `www` to the apex and issues the HTTPS certificate. This can take up to 24 hours.
4. Recommended: verify the domain under your GitHub account's **Settings → Pages → Verified domains**, so no one else can claim it on GitHub.
5. Optional: add the repository variable `CONTACT_ENDPOINT` (**Settings → Secrets and variables → Actions → Variables**) and re-run the workflow to turn on online form delivery.

GitHub Pages also redirects `/saakshi` to `/saakshi/` and serves `404.html` for unknown URLs. Old URLs `/products/` and `/home/` are static pages that redirect immediately and are `noindex`.

To preview the static build locally: `npm run build && npx serve out` (or any static file server).

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

- **URLs:** trailing slashes everywhere; GitHub Pages redirects `/saakshi` to `/saakshi/`. Self-referencing absolute canonicals on the production domain. `www` redirects to the apex domain (GitHub Pages custom-domain handling). `/products/` and `/home/` are noindex pages that redirect immediately to `/saakshi/` and `/`.
- **Indexing:** see `ALLOW_INDEXING` above. `robots.txt` (`src/app/robots.ts`) and `sitemap.xml` (`src/app/sitemap.ts`) use the configured domain. Update `lastModified` in `sitemap.ts` when content changes meaningfully.
- **404:** unknown URLs return HTTP 404 with a `noindex` page linking to the main sections.
- **Social sharing:** Open Graph and Twitter tags on every page, with static 1200×630 images in `public/og/` (`saakshi.png`, `oppuna.png`).
- **Structured data (JSON-LD):**
  - `Organization` and `WebSite` on every page (`layout.tsx`), with the logo at `public/logo.png`.
  - `BreadcrumbList` on internal pages, matching the visible breadcrumbs.
  - `SoftwareApplication` for Oppuna.
  - `WebPage` for Saakshi.

  Saakshi has no software-application markup because it is not released. Add it, with offers and pricing, only once it is available. No ratings, prices or social profiles are included because none are verified. Add `sameAs` links to `Organization` once official profiles exist.
- **Performance:** no raster images in the page content (SVG and CSS only), fonts self-hosted via `next/font` with preloading, and minimal client JavaScript. Measured on the production build at 375px: layout shift 0.
- **Regulatory content:** none is published. If you add a regulatory article, cite current official sources and show a visible "Last reviewed" date on it.

### Checking a deployment

```bash
curl -sI https://winfintechnologies.com/saakshi | grep -i -E "^HTTP|location"     # 301 to /saakshi/
curl -s https://winfintechnologies.com/saakshi/ | grep -o '<link rel="canonical"[^>]*>'
curl -s https://winfintechnologies.com/robots.txt
curl -s https://winfintechnologies.com/sitemap.xml
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

Request indexing only after the GitHub Pages deploy is live on `https://winfintechnologies.com`. The workflow sets `ALLOW_INDEXING=true`.

## Project structure

```
src/
  app/
    page.tsx                 Home: Saakshi hero, problem, workflow, example
                             investigation, audiences, pilot scope, pilot
                             enquiry, Oppuna, company
    saakshi/page.tsx         Saakshi product page, demo, human review, FAQ
    saakshi/pilot/page.tsx   Pilot scope, stages, pilot FAQ, enquiry
    oppuna/page.tsx          Oppuna page and FAQ
    services/page.tsx        Services and engagement models
    about/page.tsx           Company
    contact/page.tsx         Email routes + contact form
    products/, home/         Redirect pages for old URLs
    sitemap.ts, robots.ts, icon.svg, not-found.tsx
  public/                    CNAME, .nojekyll, og/ social images, logo.png
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
