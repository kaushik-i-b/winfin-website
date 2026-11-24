import Link from "next/link";
import { Arrow, Container } from "./ui";
import { mail, site } from "@/lib/site";

/** The pilot enquiry call to action. Its main button opens an email to support@oppuna.com. */
export function PilotEnquiry({ id, className = "pb-20 sm:pb-28" }: { id: string; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <Container>
        <div className="on-navy grid gap-10 rounded-xl border border-navy-line bg-navy p-8 text-white sm:p-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:p-14">
          <div>
            <p className="text-sm font-semibold text-accent-on-navy">Pilot enquiry</p>
            <h2 id={`${id}-heading`} className="mt-3 text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1] leading-tight sm:text-[2.5rem]">
              Shape Saakshi’s first pilots with us.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-navy">
              Tell us about your organisation, roughly how many calls you record
              each month, the languages your agents use and the calling system
              you’re on. We’ll reply to talk through whether a pilot makes sense.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={mail.saakshi}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-medium text-on-accent transition-colors hover:bg-accent-hover"
            >
              Discuss a Saakshi pilot
              <Arrow />
              <span className="sr-only">(opens your email app)</span>
            </a>
            <Link
              href="/contact/?topic=saakshi"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-navy-line px-6 font-medium text-white transition-colors hover:border-on-navy hover:bg-navy-2"
            >
              Use the enquiry form instead
            </Link>
            <p className="mt-1 text-center text-sm text-on-navy">
              or write to{" "}
              <a href={mail.saakshi} className="font-medium text-white underline decoration-on-navy/50 underline-offset-4 hover:decoration-white">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
