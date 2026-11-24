import Link from "next/link";
import { SaakshiDemo } from "@/components/saakshi-demo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink, Container, Eyebrow, PageHeader, StatusPill } from "@/components/ui";
import { saakshiFaqs } from "@/lib/saakshi";
import { pilotHref } from "@/lib/site";
import { absoluteUrl, orgId, pageMetadata } from "@/lib/seo";

const title = "AI Recovery Call Monitoring for Lenders | Saakshi";
const description =
  "AI recovery-call monitoring for lenders, NBFCs and collection agencies. Saakshi is in development: see the planned workflow, human review process and FAQ.";

export const metadata = pageMetadata({ title, description, path: "/saakshi/" });

const h2 = "text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]";

const steps: { title: string; body: string; tags: { tone: "live" | "planned"; label: string }[] }[] = [
  {
    title: "Import recordings",
    body: "Recordings are uploaded in bulk from the calling or dialler system your teams already use. Integrations that bring recordings in automatically are planned.",
    tags: [
      { tone: "live", label: "Bulk upload: pilot" },
      { tone: "planned", label: "Integrations: planned" },
    ],
  },
  {
    title: "Transcribe",
    body: "Each call becomes a timestamped transcript. The proposed pilot covers Hindi, English and one regional language selected with the pilot customer.",
    tags: [{ tone: "live", label: "Pilot scope" }],
  },
  {
    title: "Mark potential issues",
    body: "Passages that may indicate threats, abusive language or disclosure to third parties are marked, along with calls placed outside configured hours.",
    tags: [{ tone: "live", label: "Pilot scope" }],
  },
  {
    title: "Show the evidence",
    body: "Every finding links to its timestamped passage, with the surrounding transcript and the original audio.",
    tags: [{ tone: "live", label: "Pilot scope" }],
  },
  {
    title: "Human review",
    body: "A reviewer confirms or dismisses each finding and adds a note. Saakshi suggests; people decide.",
    tags: [{ tone: "live", label: "Pilot scope" }],
  },
  {
    title: "Search and export",
    body: "Find calls by loan reference, agent or date, and export reviewed findings as reports.",
    tags: [{ tone: "live", label: "Pilot scope" }],
  },
  {
    title: "Scorecards and dashboards",
    body: "Agency-level scorecards and review dashboards for compliance and recovery operations teams.",
    tags: [{ tone: "planned", label: "Planned" }],
  },
];

const reviewSteps = [
  ["Saakshi marks a passage", "A potential issue is attached to the exact timestamp where it occurs, with the reason it was marked."],
  ["A reviewer checks the evidence", "They read the passage in context and play the original recording, because transcripts can be wrong."],
  ["The reviewer decides", "They confirm or dismiss the finding and add a note explaining why."],
  ["The decision is kept", "The finding, the decision, the note and the reviewer stay together, ready to export for internal review or a complaint file."],
];

export default function SaakshiPage() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "WebPage",
          "@id": `${absoluteUrl("/saakshi/")}#webpage`,
          url: absoluteUrl("/saakshi/"),
          name: title,
          description,
          publisher: { "@id": orgId },
          about: {
            "@type": "Thing",
            name: "Saakshi",
            description:
              "An AI call-review product in development for lenders, NBFCs and collection agencies.",
          },
        }}
      />
      <PageHeader
        breadcrumbs={<Breadcrumbs items={[{ name: "Saakshi", path: "/saakshi/" }]} />}
        eyebrow="Saakshi · AI call review"
        title={
          <>
            AI recovery call monitoring for{" "}
            lenders and collection agencies.
          </>
        }
        lede={
          <p>
            Saakshi, meaning “witness”, is an AI call-review product being
            developed to bring quality assurance to collections. It is designed
            to transcribe recorded recovery calls, mark potential conduct issues
            and help your reviewers document what they find.
          </p>
        }
      >
        <div className="flex flex-col gap-5">
          <div>
            <StatusPill tone="dev">In development · Pilot enquiries welcome</StatusPill>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={pilotHref}>Discuss a pilot</ButtonLink>
            <ButtonLink href="/saakshi/pilot/" variant="secondary">See the pilot scope</ButtonLink>
          </div>
        </div>
      </PageHeader>

      {/* What it does */}
      <section aria-labelledby="what-heading" className="bg-surface text-ink">
        <Container className="py-20 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow className="text-accent">What Saakshi does</Eyebrow>
            <h2 id="what-heading" className={`mt-3 ${h2}`}>
              Quality assurance for collections,{" "}
              built around evidence.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Recovery calls are often recorded, but when review depends on
              listening, teams can only check a sample. Saakshi is being designed so that compliance and
              quality teams can search every recording, go straight to the
              passages that may need attention, and keep a clear record of each
              review.
            </p>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-3">
            {[
              ["Monitor recovery calls", "Transcripts of recorded calls, searchable by loan reference, agent, date or phrase."],
              ["Surface potential issues", "Passages that may need a closer look, marked against your own conduct policy and calling hours."],
              ["Document every review", "A reviewer’s decision and note kept with the passage and audio, ready to export."],
            ].map(([t, d]) => (
              <li key={t} className="bg-surface p-8">
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" aria-labelledby="how-heading" className="relative overflow-hidden bg-surface">
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow className="text-accent">How it works</Eyebrow>
            <h2 id="how-heading" className={`mt-3 ${h2}`}>
              From recording to a reviewed finding,{" "}
              in seven steps.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              The planned workflow is below. Steps marked <em>Pilot scope</em> are
              proposed for the first pilots; <em>Planned</em> steps come later.
              Try the illustrative interface first. It uses a fictional call.
            </p>
          </div>

          <div className="mt-14">
            <SaakshiDemo />
          </div>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col bg-surface p-7">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <StatusPill key={t.label} tone={t.tone}>{t.label}</StatusPill>
                  ))}
                </div>
              </li>
            ))}
            <li className="flex flex-col justify-between bg-accent-soft p-7">
              <p className="text-xl font-semibold leading-snug">See a complaint investigated, step by step.</p>
              <Link
                href="/#example"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 font-medium text-on-accent transition-colors hover:bg-accent-hover"
              >
                View the example investigation
              </Link>
            </li>
          </ol>
        </Container>
      </section>

      {/* Human review */}
      <section id="human-review" aria-labelledby="review-heading" className="border-t border-line">
        <Container className="grid gap-14 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow className="text-accent">Human review</Eyebrow>
            <h2 id="review-heading" className={`mt-3 ${h2}`}>
              AI marks the passage.{" "}
              A person decides.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Automated findings are potential issues, never conclusions.
              Saakshi is a review aid: it does not decide whether a call breached
              any rule, does not certify compliance with any regulation, and has
              not been approved or endorsed by any regulator.
            </p>
          </div>
          <ol className="space-y-4">
            {reviewSteps.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 rounded-xl border border-line bg-surface p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft font-mono text-sm text-accent ring-1 ring-inset ring-accent/25">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{t}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Who it's for */}
      <section aria-labelledby="for-heading" className="border-t border-line bg-surface">
        <Container className="py-20 sm:py-24">
          <Eyebrow className="text-accent">Who it’s for</Eyebrow>
          <h2 id="for-heading" className={`mt-3 max-w-3xl ${h2}`}>
            For the teams answerable for{" "}
            how borrowers are treated.
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Collection agencies", "Owners and quality leads checking their agents’ conduct, coaching with real passages and responding to client queries."],
              ["Lenders and NBFCs", "Compliance teams and recovery operations leaders overseeing partner agencies and investigating borrower complaints."],
              ["Telephony and collections platforms", "Dialler and collections-software providers interested in integrating recording review for their customers."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-xl border border-line bg-surface p-7">
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="bg-surface text-ink">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow className="text-accent">FAQ</Eyebrow>
            <h2 id="faq-heading" className={`mt-3 ${h2}`}>
              Questions buyers ask{" "}
              about Saakshi.
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              Planning a pilot? The{" "}
              <Link href="/saakshi/pilot/" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                Saakshi pilot page
              </Link>{" "}
              covers scope, setup and what we’ll need from you.
            </p>
          </div>
          <FaqList items={saakshiFaqs} tone="paper" />
        </Container>
      </section>

      {/* Next steps */}
      <section aria-labelledby="next-heading" className="border-t border-line">
        <Container className="grid items-end gap-10 py-20 sm:py-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 id="next-heading" className={h2}>
              Ready to see Saakshi on{" "}
              your own calls?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              We’re talking to lenders, NBFCs and collection agencies about early
              pilots on a sample of their recordings.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href={pilotHref}>Discuss a Saakshi pilot</ButtonLink>
            <ButtonLink href="/saakshi/pilot/" variant="secondary">Read about the pilot</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
