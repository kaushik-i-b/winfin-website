import { LogoMark } from "@/components/logo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Container, Eyebrow, PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "About Winfin Technologies | AI & Software Company in India",
  description:
    "Winfin Technologies is an AI and software company in India developing Saakshi, AI recovery-call review, and Oppuna, a private on-device wellness app.",
  path: "/about/",
});

const focus = [
  {
    title: "Useful AI",
    body: "We start from a real task and a real person doing it. If a simpler tool would do the job better, we say so. When AI is the right answer, we measure it against the work, not a benchmark.",
  },
  {
    title: "Thoughtful product design",
    body: "Products that are clear about what they do, what they don’t, and where your data goes. Good defaults, honest language and interfaces that respect people’s time and attention.",
  },
  {
    title: "Enterprise engineering",
    body: "Systems that integrate with existing infrastructure, handle failure gracefully and can be audited. We build for the second year of operation, not only the demo.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={<Breadcrumbs items={[{ name: "About", path: "/about/" }]} />}
        eyebrow="About Winfin"
        title={
          <>
            We build AI that people can{" "}
            rely on — and
            account for.
          </>
        }
        lede="Winfin Technologies is an AI and software company based in India. We are developing Saakshi and Oppuna, and engineer custom systems for organisations."
      />

      <section className="bg-canvas">
        <Container className="grid gap-16 py-20 sm:py-24 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow className="text-accent">The company</Eyebrow>
            <p className="mt-3 text-2xl font-medium leading-snug tracking-[-0.01em] sm:text-[1.75rem]">
              Winfin is the company developing Saakshi and Oppuna: two products
              with very different users and a shared standard. They should be
              worthy of the trust placed in them.
            </p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:pt-14">
            <p>
              <strong className="font-semibold text-ink">Saakshi</strong>, our
              flagship product, is in development. It is designed to help
              lenders, NBFCs and collection agencies review recorded recovery
              calls, surfacing potential conduct issues so human reviewers can
              document what happened.
            </p>
            <p>
              <strong className="font-semibold text-ink">Oppuna</strong> is a
              privacy-first mental-wellness companion on Android. Its core
              experience runs on the phone itself, so private reflections stay
              there.
            </p>
            <p>
              Alongside our products, we work with organisations on AI agents,
              knowledge assistants, document intelligence, custom applications
              and integrations.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="focus-heading">
        <Container className="py-20 sm:py-24">
          <Eyebrow className="text-accent">Our focus</Eyebrow>
          <h2 id="focus-heading" className="mt-3 max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
            Three things we hold ourselves to.
          </h2>
          <ol className="mt-12 grid gap-5 lg:grid-cols-3">
            {focus.map((f, i) => (
              <li key={f.title} className="reveal rounded-xl border border-line bg-surface p-7 sm:p-8">
                <span aria-hidden="true" className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-line bg-surface">
        <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[auto_1fr]">
          <LogoMark className="h-14 w-14" />
          <div>
            <p className="max-w-3xl text-2xl font-medium leading-snug tracking-[-0.01em]">
              Working on something where accuracy, privacy or accountability
              matter? That’s the kind of problem we want to hear about.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact/">Contact us</ButtonLink>
              <ButtonLink href="/saakshi/" variant="secondary">See Saakshi</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

    </>
  );
}
