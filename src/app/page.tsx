import Link from "next/link";
import { SaakshiPreview } from "@/components/saakshi-preview";
import { PilotEnquiry } from "@/components/pilot-enquiry";
import { InvestigationExample } from "@/components/investigation-example";
import { ButtonLink, Container, Eyebrow, StatusPill, Arrow } from "@/components/ui";
import { services } from "@/lib/content";
import { pilotScope, workflow } from "@/lib/saakshi";
import { mail, oppunaLinks, pilotHref, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Saakshi AI Recovery Call Review | Winfin Technologies",
  description:
    "Explore Saakshi, an AI recovery-call review product in development for lenders and collection agencies. Contact Winfin Technologies about a pilot.",
  path: "/",
});

const h2 = "text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]";

/* ------------------------------------------------------------------ */

const problems = [
  {
    title: "Recordings pile up faster than anyone can listen",
    body: "Every recovery call may be recorded, but listening is slow. When review depends on people playing audio end to end, most teams can only sample a small share of calls, and conduct issues in the rest go unheard.",
  },
  {
    title: "Complaints start a hunt for the right recording",
    body: "When a borrower complains, someone has to work out which agency placed the call, find the recording in that agency’s system, and listen through it to locate a few seconds of conversation.",
  },
  {
    title: "Reviews are hard to keep consistent",
    body: "Different reviewers, agencies and spreadsheets mean findings are recorded in different ways. Months later it can be difficult to show what was checked, what was found and who decided.",
  },
];

const audiences = [
  {
    tag: "Collection agencies",
    title: "Know what your agents say before a lender asks.",
    body: "For agency owners and quality leads who need to check their own teams’ conduct, coach with real examples and answer client queries quickly.",
    points: [
      "Review more calls without adding listeners",
      "Coach agents using the exact passage and audio",
      "Respond to complaints with the reviewed recording",
    ],
    cta: { label: "Discuss a pilot", href: pilotHref },
  },
  {
    tag: "Lenders & NBFCs",
    title: "Oversight across every agency you work with.",
    body: "For compliance teams and recovery operations leaders responsible for how partner agencies treat borrowers on the phone.",
    points: [
      "Investigate borrower complaints from a loan reference",
      "Apply one review process across agencies",
      "Keep a record of findings and decisions",
    ],
    cta: { label: "Discuss a pilot", href: pilotHref },
  },
  {
    tag: "Telephony & collections platforms",
    title: "Call review inside the tools teams already use.",
    body: "For dialler, telephony and collections-software providers interested in bringing recording review to their customers.",
    points: [
      "Explore integrations for recording import",
      "Discuss how findings could flow back to your platform",
      "Shape the integration roadmap with us",
    ],
    cta: { label: "Discuss an integration", href: mail.integration },
  },
];

/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      {/* ======================= HERO ======================= */}
      <section aria-labelledby="hero-heading" className="border-b border-line">
        <Container className="pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <div className="fade-up flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-sm font-semibold text-accent">Saakshi by Winfin</span>
                <StatusPill tone="dev">In development · Pilot enquiries welcome</StatusPill>
              </div>
              <h1 id="hero-heading" className="fade-up-2 mt-5 max-w-[15ch] text-[2.4rem] font-medium leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                Every recovery call. Evidence your team can review.
              </h1>
            </div>
            <div className="fade-up-3">
              <p className="max-w-xl text-lg leading-relaxed text-muted">
                Saakshi is an AI call-review product being developed for lenders
                and collection agencies. It helps teams find potential conduct
                issues, review the exact words in a recording and document their
                findings.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={pilotHref}>Discuss a pilot</ButtonLink>
                <ButtonLink href="#how-it-works" variant="secondary" arrow={false}>
                  See the workflow
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="fade-up-3 mt-12 lg:mt-16">
            <SaakshiPreview />
          </div>
          <p className="mt-5 text-[0.95rem] text-muted">
            Saakshi means “witness.” Findings are potential issues for a person to
            review, never automatic conclusions.
          </p>
        </Container>
      </section>

      {/* ======================= 1. PROBLEM ======================= */}
      <section id="saakshi" aria-labelledby="problem-heading" className="bg-surface text-ink">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div className="reveal">
              <Eyebrow className="text-accent">The operational problem</Eyebrow>
              <h2 id="problem-heading" className={`mt-3 ${h2}`}>
                The recordings exist.{" "}
                The time to review them doesn’t.
              </h2>
            </div>
            <p className="reveal max-w-xl text-lg leading-relaxed text-muted">
              Recovery calls are where borrowers are most likely to experience
              pressure, and where a lender’s or agency’s conduct is hardest to
              see. The recordings usually exist. Finding and reviewing the right
              moments in them is the hard part.
            </p>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <ol className="grid gap-px overflow-hidden rounded-xl bg-line">
              {problems.map((p, i) => (
                <li key={p.title} className="reveal grid gap-4 bg-surface p-7 sm:grid-cols-[3rem_1fr] sm:p-8">
                  <span className="font-mono text-sm text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Sampling illustration */}
            <figure className="reveal flex flex-col rounded-xl border border-line bg-canvas p-7 sm:p-8" aria-labelledby="sampling-caption">
              <p className="text-sm text-subtle">Illustration, not data</p>
              <p className="mt-3 text-lg font-semibold">A day of recorded calls</p>
              <div aria-hidden="true" className="mt-6 grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1.5">
                {Array.from({ length: 160 }, (_, i) => {
                  const heard = i % 23 === 4;
                  const issue = i === 61 || i === 117;
                  return (
                    <span
                      key={i}
                      className={`aspect-square rounded-[3px] ${
 heard ? "bg-accent" : issue ? "bg-risk/60" : "bg-ink/10"
 }`}
                    />
                  );
                })}
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                <li className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-[3px] bg-accent" />Listened to</li>
                <li className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-[3px] bg-risk/60" />Conduct issue, unheard</li>
                <li className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-[3px] bg-ink/10" />Not reviewed</li>
              </ul>
              <figcaption id="sampling-caption" className="mt-auto pt-6 text-sm leading-relaxed text-subtle">
                When review means listening, teams sample. Issues in the calls
                nobody plays are found only if a borrower complains.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* ======================= 2. HOW IT WORKS ======================= */}
      <section id="how-it-works" aria-labelledby="workflow-heading" className="on-navy border-y border-navy-line bg-navy text-white">
        <Container className="py-20 sm:py-24">
          <div className="reveal grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <Eyebrow className="text-accent-on-navy">How Saakshi is being designed to help</Eyebrow>
              <h2 id="workflow-heading" className={`mt-3 ${h2}`}>
                From recording to a reviewed finding,{" "}
                in one place.
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-on-navy">
                This is the planned workflow. Saakshi is in development, and
                capabilities are described as planned until they are confirmed
                with pilot customers.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-on-navy">
                <span className="inline-flex items-center gap-2"><StatusPill tone="live">Pilot scope</StatusPill> proposed for first pilots</span>
                <span className="inline-flex items-center gap-2"><StatusPill tone="planned">Planned</StatusPill> later on the roadmap</span>
              </div>
            </div>
          </div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflow.map((s, i) => (
              <li key={s.title} className="reveal flex flex-col rounded-xl border border-navy-line bg-navy-2 p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-on-navy">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </span>
                  <span className="font-mono text-sm text-on-navy">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-on-navy">{s.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.note ? (
                    <>
                      <StatusPill tone="live">{s.note.split(" · ")[0]}</StatusPill>
                      <StatusPill tone="planned">{s.note.split(" · ")[1]}</StatusPill>
                    </>
                  ) : (
                    <StatusPill tone={s.stage === "pilot" ? "live" : "planned"}>
                      {s.stage === "pilot" ? "Pilot scope" : "Planned"}
                    </StatusPill>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <p className="reveal mt-10 max-w-3xl text-sm leading-relaxed text-on-navy">
            Saakshi is a review aid. It does not decide whether a call breached
            any rule, does not certify compliance with any regulation, and has
            not been approved or endorsed by any regulator.
          </p>
          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/saakshi/#how-it-works" variant="secondary">How Saakshi works in detail</ButtonLink>
            <Link href="/saakshi/#faq" className="inline-flex min-h-11 items-center px-1 font-medium text-accent-on-navy underline-offset-4 hover:underline">Read the Saakshi FAQ</Link>
          </div>
        </Container>
      </section>

      {/* ======================= 3. INVESTIGATION ======================= */}
      <section id="example" aria-labelledby="example-heading">
        <Container className="py-20 sm:py-24">
          <div className="reveal max-w-3xl">
            <Eyebrow className="text-accent">A complaint investigation · fictional example</Eyebrow>
            <h2 id="example-heading" className={`mt-3 ${h2}`}>
              From a borrower’s complaint to a{" "}
              documented decision.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              A borrower says an agent threatened to contact their employer.
              Step through how a reviewer would investigate it in Saakshi.
            </p>
          </div>
          <div className="mt-14">
            <InvestigationExample />
          </div>
        </Container>
      </section>

      {/* ======================= 4. WHO IT SERVES ======================= */}
      <section id="who-its-for" aria-labelledby="audience-heading" className="border-t border-line bg-surface">
        <Container className="py-20 sm:py-24">
          <div className="reveal max-w-3xl">
            <Eyebrow className="text-accent">Who it serves</Eyebrow>
            <h2 id="audience-heading" className={`mt-3 ${h2}`}>
              Built for the people{" "}
              accountable for the call.
            </h2>
          </div>
          <ul className="mt-14 grid gap-5 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <li
                key={a.tag}
                className="reveal flex flex-col rounded-xl border border-line bg-canvas p-7 sm:p-8"
              >
                <p className="text-sm font-semibold text-accent">{a.tag}</p>
                <h3 className="mt-3 text-xl font-semibold leading-snug">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{a.body}</p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-5 text-[0.95rem]">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 h-4 w-4 flex-none text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <ButtonLink href={a.cta.href} variant={i === 2 ? "secondary" : "primary"}>
                    {a.cta.label}
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ======================= 5. PILOT SCOPE ======================= */}
      <section id="pilot" aria-labelledby="pilot-heading" className="border-t border-line">
        <Container className="relative grid gap-14 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <StatusPill tone="dev">In development · Pilot enquiries welcome</StatusPill>
            <h2 id="pilot-heading" className={`mt-3 ${h2}`}>
              The proposed pilot scope.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              A first pilot is a focused trial on a sample of your own
              recordings, with your reviewers using Saakshi alongside your
              current process. Scope, volumes and timelines are agreed with each
              pilot customer.
            </p>
            <div className="mt-8">
              <ButtonLink href="/saakshi/pilot/" variant="secondary">Full pilot details</ButtonLink>
            </div>
            <dl className="mt-10 space-y-6 border-t border-line pt-8">
              <div>
                <dt className="font-semibold text-ink">What a pilot typically needs</dt>
                <dd className="mt-2 leading-relaxed text-muted">
                  Representative recordings, your conduct policy and calling-hour
                  rules, and regular feedback from the people who review calls.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">What you get from it</dt>
                <dd className="mt-2 leading-relaxed text-muted">
                  A practical view of how Saakshi handles your calls and
                  languages, and a direct say in what gets built next.
                </dd>
              </div>
            </dl>
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-xl bg-line sm:grid-cols-2">
            {pilotScope.map(([t, d], i) => (
              <li key={t} className="reveal flex flex-col bg-surface p-7">
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

      {/* ======================= 6. PILOT ENQUIRY ======================= */}
      <PilotEnquiry id="pilot-enquiry" />

      {/* ======================= MORE FROM WINFIN ======================= */}
      <section id="more-from-winfin" aria-labelledby="more-heading" className="border-y border-line bg-surface">
        <Container className="py-20 sm:py-24">
          <h2 id="more-heading" className="text-2xl font-semibold tracking-[-0.01em]">More from Winfin</h2>

          <article aria-labelledby="oppuna-heading" className="reveal mt-6 grid gap-8 rounded-xl border border-line bg-surface p-7 shadow-[inset_4px_0_0_var(--color-lavender)] sm:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-lg bg-lavender-soft text-sm font-semibold text-lavender">O</span>
                <h3 id="oppuna-heading" className="text-2xl font-semibold tracking-[-0.01em]">Oppuna</h3>
                <span className="rounded-md bg-lavender-soft px-2 py-0.5 text-[0.8rem] font-medium text-lavender">Available on Android</span>
              </div>
              <p className="mt-4 text-lg font-medium">Private, on-device AI for everyday wellness.</p>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">
                Oppuna is a wellness companion with AI conversations, private
                journaling and mood tracking. Its AI runs on the phone, so it
                works offline and personal entries stay on the device. It
                supports self-reflection and is not a substitute for
                professional care.
              </p>
              <Link href="/oppuna/" className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-medium text-lavender hover:underline hover:underline-offset-4">
                About Oppuna: private, offline AI journaling <Arrow />
              </Link>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={oppunaLinks.play}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg bg-lavender px-5 font-medium text-on-lavender transition-colors hover:bg-lavender-hover"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor"><path d="M4 2.8v18.4c0 .5.5.8.9.6l15.6-9.2c.4-.2.4-.8 0-1L4.9 2.2C4.5 2 4 2.3 4 2.8z" /></svg>
                Get it on Google Play
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={oppunaLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface px-5 font-medium text-ink transition-colors hover:border-lavender hover:text-lavender"
              >
                Visit oppuna.com ↗<span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </article>
        </Container>
      </section>

      {/* ======================= COMPANY ======================= */}
      <section id="company" aria-labelledby="company-heading">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal">
            <Eyebrow className="text-accent">About Winfin Technologies</Eyebrow>
            <h2 id="company-heading" className="mt-3 text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
              The company developing{" "}
              Saakshi and Oppuna.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted">
              {site.name} is an AI and software company based in {site.location}.
              Alongside our own products, we take on custom software and AI
              engineering for organisations, as projects, ongoing partnerships
              or licensing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services/" variant="secondary">Custom software &amp; AI</ButtonLink>
              <ButtonLink href="/about/" variant="ghost">About Winfin</ButtonLink>
            </div>
          </div>
          <ul className="reveal grid gap-px self-start overflow-hidden rounded-xl bg-line sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.id} className="bg-canvas">
                <Link href={`/services/#${s.id}`} className="group flex h-full items-start justify-between gap-4 p-5 transition-colors hover:bg-canvas">
                  <span>
                    <span className="block font-semibold transition-colors group-hover:text-accent">{s.title}</span>
                    <span className="mt-1 block text-sm text-subtle">{s.short}</span>
                  </span>
                  <span className="mt-1 text-subtle transition-colors group-hover:text-accent"><Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
