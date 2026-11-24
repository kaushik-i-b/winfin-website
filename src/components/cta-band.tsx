import { ButtonLink, Container } from "./ui";
import { pilotHref } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <Container className="relative py-20 sm:py-24">
        <h2 className="reveal max-w-3xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
          Have a problem AI should be solving?{" "}
          Let’s talk it through.
        </h2>
        <p className="reveal mt-6 max-w-xl text-lg text-muted">
          Tell us what you are trying to do. We’ll tell you honestly whether AI
          is the right tool, and what it would take.
        </p>
        <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={pilotHref}>Discuss a Saakshi pilot</ButtonLink>
          <ButtonLink href="/contact/?topic=project" variant="secondary">Discuss a software project</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
