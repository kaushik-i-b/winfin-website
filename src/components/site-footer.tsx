import Link from "next/link";
import { LogoMark } from "./logo";
import { Container } from "./ui";
import { mail, oppunaLinks, pilotHref, site } from "@/lib/site";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function SiteFooter() {
  return (
    <footer className="on-navy border-t border-navy-line bg-navy text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <LogoMark className="h-8 w-8" />
              <span className="font-semibold">{site.name}</span>
            </div>
            <p className="mt-5 max-w-xs text-lg font-medium leading-snug text-white">
              Every recovery call. Evidence your team can review.
            </p>
            <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-on-navy">
              An AI and software company based in {site.location}, developing
              Saakshi and Oppuna.
            </p>
          </div>

          <FooterCol title="Saakshi">
            <FooterLink href="/saakshi/">AI recovery call monitoring</FooterLink>
            <FooterLink href="/saakshi/#how-it-works">How Saakshi works</FooterLink>
            <FooterLink href="/#example">Example investigation</FooterLink>
            <FooterLink href="/saakshi/pilot/">Pilot scope</FooterLink>
            <FooterLink href="/saakshi/#faq">Saakshi FAQ</FooterLink>
            <FooterLink href={pilotHref}>Discuss a pilot</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink href="/oppuna/">Oppuna wellness app</FooterLink>
            <FooterLink href="/services/">Custom software &amp; AI</FooterLink>
            <FooterLink href="/about/">About</FooterLink>
            <FooterLink href="/contact/">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Get in touch">
            <li>
              <a href={mail.general} className="break-all text-on-navy transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={mail.saakshi} className="text-on-navy transition-colors hover:text-white">
                Saakshi pilot enquiry
              </a>
            </li>
            <FooterLink href="/contact/?topic=project">Start a project</FooterLink>
            <li>
              <a href={mail.licensing} className="text-on-navy transition-colors hover:text-white">
                Licensing enquiries
              </a>
            </li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-navy-line pt-8 text-sm text-on-navy sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <span>Oppuna:</span>
            <a href={oppunaLinks.privacy} {...ext} className="hover:text-white">
              Privacy policy<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={oppunaLinks.terms} {...ext} className="hover:text-white">
              Terms<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-on-navy transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
