import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { OppunaVisual } from "@/components/oppuna-visual";
import { ButtonLink, Container, Eyebrow, PageHeader } from "@/components/ui";
import type { Faq } from "@/lib/saakshi";
import { oppunaLinks } from "@/lib/site";
import { absoluteUrl, orgId, pageMetadata } from "@/lib/seo";

const description =
  "Oppuna is a private, offline AI wellness journal for Android, with on-device AI, mood tracking, guided reflection and breathing. Entries stay on your phone.";

export const metadata = pageMetadata({
  title: "Oppuna: Offline AI Wellness Journal & Private Mood Tracker",
  description,
  path: "/oppuna/",
  image: { path: "/og/oppuna.png", alt: "Oppuna: a private, offline AI wellness journal for Android." },
});

const oppunaFeatures = [
  {
    title: "AI-assisted conversations & guided reflection",
    body: "Talk through what’s on your mind with an on-device AI companion, and follow guided prompts that help you reflect.",
  },
  {
    title: "Mood tracking & private journaling",
    body: "Log how you feel and write freely. Over time, patterns become easier to notice.",
  },
  {
    title: "Voice interaction",
    body: "Speak instead of type when that feels more natural.",
  },
  {
    title: "Guided breathing & grounding",
    body: "Short, structured exercises for moments when you need to slow down.",
  },
  {
    title: "Local storage for personal content",
    body: "Journal entries and conversations are stored on your device.",
  },
];

const faqs: Faq[] = [
  {
    q: "Does Oppuna work offline?",
    a: "Yes. Oppuna’s AI runs on the phone, so conversations, reflection and journaling work without an internet connection. You need a connection only to log in and to download the app or its AI model.",
  },
  {
    q: "Where are my journal entries stored?",
    a: "Journal entries and conversations are stored locally on your device. See Oppuna’s privacy policy for full details.",
  },
  {
    q: "What can I do in Oppuna?",
    a: "Talk things through with an AI companion, follow guided reflection, journal privately, track your mood, use voice instead of typing, and follow guided breathing and grounding exercises.",
  },
  {
    q: "Is Oppuna a replacement for therapy or medical care?",
    a: "No. Oppuna supports everyday wellness and self-reflection. It does not provide diagnosis or treatment. If you need diagnosis, treatment or urgent help, please contact a qualified professional or your local emergency services.",
  },
  {
    q: "Where can I get Oppuna?",
    a: "Oppuna is available for Android on Google Play.",
  },
];

export default function OppunaPage() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "SoftwareApplication",
          "@id": `${absoluteUrl("/oppuna/")}#app`,
          name: "Oppuna",
          description,
          applicationCategory: "HealthApplication",
          operatingSystem: "Android",
          url: oppunaLinks.website,
          installUrl: oppunaLinks.play,
          creator: { "@id": orgId },
        }}
      />
      <PageHeader
        breadcrumbs={<Breadcrumbs items={[{ name: "Oppuna", path: "/oppuna/" }]} />}
        eyebrow="Oppuna · Available on Android"
        eyebrowClassName="text-lavender"
        title={
          <>
            Oppuna: an offline AI wellness journal{" "}
            that stays on your phone.
          </>
        }
        lede={
          <p>
            Oppuna is a privacy-first wellness companion from Winfin
            Technologies. Its on-device AI helps you reflect, journal and track
            your mood without sending your personal entries anywhere.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={oppunaLinks.play} variant="lavender">Get it on Google Play</ButtonLink>
          <ButtonLink href={oppunaLinks.website} variant="secondary">Visit oppuna.com</ButtonLink>
        </div>
      </PageHeader>

      {/* ======================= OPPUNA ======================= */}
      <section id="features" aria-labelledby="oppuna-heading" className="bg-canvas">
        <Container className="relative grid items-center gap-16 py-20 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-lavender-soft px-2 py-0.5 text-[0.8rem] font-medium text-lavender">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lavender" />
                Available on Android
              </span>
              <span className="text-sm text-subtle">Consumer · Wellbeing</span>
            </div>
            <h2 id="oppuna-heading" className="mt-5 text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
              Reflect, journal and track your mood,{" "}
              privately.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Oppuna’s core experience runs on on-device AI, so conversations and
              reflection work offline. An internet connection is needed only to
              log in and to download the app or its AI model.
            </p>

            <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {oppunaFeatures.map((f) => (
                <li key={f.title} className="border-t-2 border-lavender/30 pt-4">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{f.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={oppunaLinks.play}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-lavender px-6 font-medium text-on-lavender transition-colors hover:bg-lavender-hover"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor"><path d="M4 2.8v18.4c0 .5.5.8.9.6l15.6-9.2c.4-.2.4-.8 0-1L4.9 2.2C4.5 2 4 2.3 4 2.8z" /></svg>
                Get it on Google Play
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={oppunaLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface px-6 font-medium text-ink transition-colors hover:border-lavender hover:text-lavender"
              >
                Visit oppuna.com ↗<span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              <a href={oppunaLinks.privacy} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-lavender">
                Privacy policy<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={oppunaLinks.terms} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-lavender">
                Terms<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>

            <aside aria-label="About Oppuna’s purpose" className="mt-10 rounded-xl border border-lavender/20 bg-lavender-soft p-5 text-[0.95rem] leading-relaxed text-muted">
              <p>
                <strong className="font-semibold">Oppuna supports everyday wellness and self-reflection.</strong>{" "}
                It does not provide diagnosis or treatment. If you need
                diagnosis, treatment or urgent help,
                please contact a qualified professional or your local emergency
                services.
              </p>
            </aside>
          </div>

          <div className="[&_figcaption]:text-subtle">
            <OppunaVisual />
          </div>
        </Container>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="border-t border-line">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow className="text-lavender">FAQ</Eyebrow>
            <h2 id="faq-heading" className="mt-3 text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
              About Oppuna.
            </h2>
          </div>
          <FaqList items={faqs} />
        </Container>
      </section>
    </>
  );
}
