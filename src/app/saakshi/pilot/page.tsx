import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq";
import { PilotEnquiry } from "@/components/pilot-enquiry";
import { ButtonLink, Container, Eyebrow, PageHeader, StatusPill } from "@/components/ui";
import { pilotFaqs, pilotScope } from "@/lib/saakshi";
import { mail } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Recovery Call Review Pilot for Lenders & Collection Agencies | Saakshi",
  description:
    "Pilot Saakshi on your own recovery-call recordings: bulk upload, Hindi and English transcription, timestamped findings, human review and report export.",
  path: "/saakshi/pilot/",
});

const h2 = "text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]";

const stages = [
  ["Scoping conversation", "We learn about your call volumes, languages, calling system, conduct policy and calling-hour rules, and agree how recordings will be handled."],
  ["Set-up", "We agree a representative sample of recordings, the regional language to cover, who will review findings and how long the pilot will run."],
  ["Review period", "Your reviewers use Saakshi alongside your current process, confirming or dismissing findings and telling us what works and what doesn’t."],
  ["Wrap-up", "We go through the reviewed findings and exports together, and agree what a next phase could look like."],
];

export default function PilotPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Saakshi", path: "/saakshi/" },
              { name: "Pilot", path: "/saakshi/pilot/" },
            ]}
          />
        }
        eyebrow="Saakshi pilot"
        title={
          <>
            A recovery call review pilot for{" "}
            lenders and collection agencies.
          </>
        }
        lede={
          <p>
            Saakshi is in development, and we’re looking for a small number of
            lenders, NBFCs and collection agencies to pilot it on their own
            recordings. A pilot is a focused trial with your reviewers, in
            your languages, alongside the process you already run.
          </p>
        }
      >
        <div className="flex flex-col gap-5">
          <div>
            <StatusPill tone="dev">In development · Pilot enquiries welcome</StatusPill>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#enquiry">Discuss a pilot</ButtonLink>
            <ButtonLink href="/saakshi/" variant="secondary">How Saakshi works</ButtonLink>
          </div>
        </div>
      </PageHeader>

      {/* Scope */}
      <section id="scope" aria-labelledby="scope-heading" className="relative bg-surface">
        <Container className="grid gap-14 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow className="text-accent">Proposed scope</Eyebrow>
            <h2 id="scope-heading" className={`mt-3 ${h2}`}>
              What a first pilot includes.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              This is the proposed initial scope. Volumes, languages and
              timelines are agreed with each pilot customer. Capabilities not
              listed here, such as direct calling-system integrations and
              agency-level dashboards, are planned for later.
            </p>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-xl bg-line sm:grid-cols-2">
            {pilotScope.map(([t, d], i) => (
              <li key={t} className="flex flex-col bg-surface p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-on-accent">
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
                  </span>
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How it runs */}
      <section id="how-a-pilot-runs" aria-labelledby="stages-heading" className="bg-surface text-ink">
        <Container className="py-20 sm:py-24">
          <Eyebrow className="text-accent">How a pilot runs</Eyebrow>
          <h2 id="stages-heading" className={`mt-3 max-w-3xl ${h2}`}>
            Four stages, agreed with you.
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-2 lg:grid-cols-4">
            {stages.map(([t, d], i) => (
              <li key={t} className="bg-surface p-8">
                <span className="text-sm font-semibold text-accent">Stage {i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 border-t border-ink/10 pt-12 lg:grid-cols-3">
            {[
              ["Who it suits", "Collection agencies, lenders and NBFCs that record recovery calls and want a consistent way to review them and investigate complaints."],
              ["What we’ll need", "Representative recordings, your conduct policy and calling-hour rules, people to review findings, and regular feedback."],
              ["What you get", "A practical view of how Saakshi handles your calls and languages, and a direct say in what gets built next."],
            ].map(([t, d]) => (
              <div key={t}>
                <h3 className="font-semibold text-ink">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="border-t border-line">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow className="text-accent">Pilot FAQ</Eyebrow>
            <h2 id="faq-heading" className={`mt-3 ${h2}`}>
              Setting up a pilot.
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              Questions about importing recordings, languages or reviewing
              findings are answered on the{" "}
              <Link href="/saakshi/#faq" className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                Saakshi product FAQ
              </Link>
              . Platform providers can{" "}
              <a href={mail.integration} className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                email us about integrations
              </a>
              .
            </p>
          </div>
          <FaqList items={pilotFaqs} />
        </Container>
      </section>

      <PilotEnquiry id="enquiry" className="py-20 sm:py-24" />
    </>
  );
}
