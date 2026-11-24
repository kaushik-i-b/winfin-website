import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { allowIndexing, site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, orgId, websiteId } from "@/lib/seo";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Saakshi AI Recovery Call Review | Winfin Technologies",
    template: "%s | Winfin Technologies",
  },
  description: site.description,
  applicationName: site.name,
  // Indexing is only allowed on the production domain (see ALLOW_INDEXING).
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b111d" },
  ],
  colorScheme: "light dark",
};

const themeScript =
  "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Apply a saved Light/Dark choice before the page renders (no flash). */}
        <Script id="theme-preference" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <JsonLd
          data={{
            "@graph": [
              {
                "@type": "Organization",
                "@id": orgId,
                name: site.name,
                url: absoluteUrl("/"),
                logo: absoluteUrl("/logo.png"),
                email: site.email,
                description: site.description,
                address: { "@type": "PostalAddress", addressCountry: "IN" },
              },
              {
                "@type": "WebSite",
                "@id": websiteId,
                name: site.name,
                url: absoluteUrl("/"),
                inLanguage: "en-IN",
                publisher: { "@id": orgId },
              },
            ],
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-5 focus:py-3 focus:font-medium focus:text-on-accent"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
