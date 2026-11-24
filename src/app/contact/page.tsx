import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { Container, PageHeader } from "@/components/ui";
import { mail, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Winfin Technologies | Saakshi Pilots & Partnership Enquiries",
  description:
    "Contact Winfin Technologies about a Saakshi pilot, a platform integration, a custom software project, product licensing or partnerships.",
  path: "/contact/",
});

const routes = [
  {
    title: "Saakshi pilots",
    body: "For collection agencies, lenders and NBFCs interested in an early pilot. Platforms interested in integrations are welcome too.",
    href: mail.saakshi,
    cta: "Discuss a Saakshi pilot",
  },
  {
    title: "Software projects",
    body: "AI agents, knowledge assistants, document intelligence, apps and integrations.",
    href: mail.project,
    cta: "Email about a project",
  },
  {
    title: "General enquiries",
    body: "Questions about Winfin, Oppuna, or anything else.",
    href: mail.general,
    cta: "Email us",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={<Breadcrumbs items={[{ name: "Contact", path: "/contact/" }]} />}
        eyebrow="Contact"
        title={
          <>
            Let’s talk about what you’re{" "}
            building.
          </>
        }
        lede={
          <p>
            Write to us at{" "}
            <a href={mail.general} className="text-ink underline decoration-accent/40 underline-offset-4 hover:text-accent">
              {site.email}
            </a>{" "}
            or use the form below. Choose the option closest to your enquiry
            so it reaches the right people.
          </p>
        }
      />

      <section aria-labelledby="email-routes">
        <Container className="pt-16 sm:pt-20">
          <h2 id="email-routes" className="sr-only">Email us directly</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {routes.map((r) => (
              <li key={r.title}>
                <a
                  href={r.href}
                  className="group flex h-full flex-col rounded-xl border border-line bg-surface p-7 transition-colors hover:border-accent hover:bg-canvas"
                >
                  <span className="text-lg font-semibold">{r.title}</span>
                  <span className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{r.body}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    {r.cta}
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </span>
                  <span className="sr-only"> — opens your email app</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="form-heading">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <h2 id="form-heading" className="text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
              Send us a message
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              A few lines about what you’re working on is enough to start. For
              projects, it helps to know your timeline and how you’d like to
              work with us — project-based, ongoing partnership or licensing.
            </p>
            <dl className="mt-10 space-y-5 border-t border-line pt-8 text-[0.95rem]">
              <div>
                <dt className="text-sm text-subtle">Email</dt>
                <dd className="mt-1">
                  <a href={mail.general} className="hover:text-accent">{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-subtle">Based in</dt>
                <dd className="mt-1">{site.location}</dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <Suspense fallback={<div className="h-[560px] animate-pulse rounded-xl bg-surface" aria-hidden="true" />}>
              <ContactForm />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
