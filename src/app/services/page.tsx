import { CtaBand } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Container, Eyebrow, PageHeader } from "@/components/ui";
import { engagements, services } from "@/lib/content";
import { mail } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Custom AI & Software Engineering Services | Winfin Technologies",
  description:
    "AI agents, workflow automation, RAG knowledge assistants, document intelligence, custom apps and integrations, built by Winfin Technologies in India.",
  path: "/services/",
});

const process = [
  ["Understand", "We start with the work, not the model: who does it today, what good looks like, and where errors are costly."],
  ["Prove", "A focused prototype on your real data, evaluated against cases you choose."],
  ["Build", "Production engineering — integration, security, monitoring and the human review steps the use case needs."],
  ["Operate", "Handover with documentation, or an ongoing partnership to run and improve what we built."],
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={<Breadcrumbs items={[{ name: "Services", path: "/services/" }]} />}
        eyebrow="Services"
        title={
          <>
            AI and software engineering for{" "}
            work that matters.
          </>
        }
        lede="We apply the same engineering we use on our own products to client systems — from a single integration to a long-running partnership."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact/?topic=project">Discuss a project</ButtonLink>
          <ButtonLink href="#engagements" variant="secondary" arrow={false}>Ways to work with us ↓</ButtonLink>
        </div>
      </PageHeader>

      <section aria-label="Service areas">
        <Container className="py-20 sm:py-28">
          <ul className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <li
                key={s.id}
                id={s.id}
                className="reveal group relative flex flex-col rounded-xl border border-line bg-surface p-8 transition-colors hover:border-accent/30 sm:p-10"
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-xl font-semibold">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
                <h3 className="mt-6 text-sm font-semibold text-ink">Typical work</h3>
                <ul className="mt-3 space-y-2">
                  {s.examples.map((e) => (
                    <li key={e} className="flex gap-3 text-[0.95rem] text-ink">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent" />
                      {e}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="bg-surface text-ink">
        <Container className="py-20 sm:py-24">
          <Eyebrow className="text-accent">How a project runs</Eyebrow>
          <h2 id="process-heading" className="mt-3 max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
            Small proofs before big builds.
          </h2>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([t, d], i) => (
              <li key={t} className="reveal border-t-2 border-accent pt-6">
                <span className="text-sm font-semibold text-accent">Step {i + 1}</span>
                <h3 className="mt-2 text-3xl">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="engagements" aria-labelledby="engagements-heading">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow className="text-accent">Engagements</Eyebrow>
              <h2 id="engagements-heading" className="mt-3 text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
                Three ways to work with us.
              </h2>
              <div className="mt-8 rounded-xl border border-accent/20 bg-accent-soft p-6">
                <h3 className="font-medium text-accent">Pricing</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  Every engagement is scoped to the problem, so we don’t publish
                  rate cards. Tell us what you need and we’ll come back with a
                  clear proposal.
                </p>
              </div>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {engagements.map((e) => (
                <li key={e.title} className="grid gap-3 py-8 sm:grid-cols-[1fr_1.3fr] sm:gap-10">
                  <h3 className="text-xl font-semibold">{e.title}</h3>
                  <p className="leading-relaxed text-muted">{e.body}</p>
                </li>
              ))}
              <li className="flex flex-col gap-3 py-8 sm:flex-row">
                <ButtonLink href="/contact/?topic=project">Discuss a project</ButtonLink>
                <ButtonLink href={mail.licensing} variant="secondary">Email about licensing</ButtonLink>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
