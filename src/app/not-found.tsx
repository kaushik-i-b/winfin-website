import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Winfin Technologies" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-32 sm:py-40">
      <Eyebrow className="text-accent">404</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-[2.25rem] font-medium leading-[1.12] tracking-[-0.02em] sm:text-5xl">
        This page isn’t here.
      </h1>
      <p className="mt-6 max-w-lg text-lg text-muted">
        The link may be out of date, or the page may have moved. Try one of
        these instead.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/saakshi/" variant="secondary">About Saakshi</ButtonLink>
        <ButtonLink href="/saakshi/pilot/" variant="secondary">Saakshi pilots</ButtonLink>
      </div>
      <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-muted">
        <li><Link href="/oppuna/" className="underline decoration-line-strong underline-offset-4 hover:text-accent">Oppuna</Link></li>
        <li><Link href="/services/" className="underline decoration-line-strong underline-offset-4 hover:text-accent">Custom software &amp; AI</Link></li>
        <li><Link href="/about/" className="underline decoration-line-strong underline-offset-4 hover:text-accent">About Winfin</Link></li>
        <li><Link href="/contact/" className="underline decoration-line-strong underline-offset-4 hover:text-accent">Contact</Link></li>
      </ul>
    </Container>
  );
}
