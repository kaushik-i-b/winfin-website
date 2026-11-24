import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "lavender";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-base font-medium transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent shadow-[0_1px_2px_rgba(16,24,39,0.12)] hover:bg-accent-hover",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent",
  ghost: "px-1 text-accent hover:text-accent-hover",
  dark: "border border-navy-line bg-navy text-white hover:bg-navy-2",
  lavender: "bg-lavender text-on-lavender hover:bg-lavender-hover",
};

export function Arrow({ external = false }: { external?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-200 ${
        external
          ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          : "group-hover:translate-x-0.5"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {external ? (
        <path d="M5 11L11 5M6 5h5v5" />
      ) : (
        <path d="M3 8h10M9 4l4 4-4 4" />
      )}
    </svg>
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
  arrow?: boolean;
} & Omit<ComponentProps<"a">, "href">;

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  external,
  arrow = true,
  ...rest
}: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const isMail = href.startsWith("mailto:");
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal || isMail) {
    return (
      <a
        href={href}
        className={cls}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
        {arrow && <Arrow external={isExternal} />}
        {isExternal && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-sm font-semibold ${className}`}>{children}</p>;
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Small, quiet tag. "dev" marks Saakshi's development status, "live" marks
 * proposed pilot scope, "planned" marks later roadmap items.
 */
export function StatusPill({
  tone,
  children,
}: {
  tone: "live" | "dev" | "planned" | "demo";
  children: ReactNode;
}) {
  const tones = {
    live: "border-accent/25 bg-accent-soft text-accent",
    dev: "border-accent/25 bg-accent-soft text-accent",
    planned: "border-line bg-canvas text-muted",
    demo: "border-line bg-canvas text-muted",
  } as const;
  const dot = {
    live: "bg-accent",
    dev: "bg-accent",
    planned: "bg-subtle",
    demo: "bg-subtle",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[0.8rem] font-medium ${tones[tone]}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot[tone]}`} />
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  eyebrowClassName = "text-accent",
  children,
}: {
  eyebrow: string;
  eyebrowClassName?: string;
  title: ReactNode;
  lede: ReactNode;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="pb-14 pt-8 sm:pb-20 sm:pt-10">
        {breadcrumbs && <div className="mb-10 sm:mb-12">{breadcrumbs}</div>}
        <Eyebrow className={`fade-up ${eyebrowClassName}`}>{eyebrow}</Eyebrow>
        <h1 className="fade-up-2 mt-4 max-w-3xl text-[2.25rem] font-medium leading-[1.12] tracking-[-0.02em] sm:text-5xl sm:leading-[1.08] lg:text-[3.5rem]">
          {title}
        </h1>
        <div className="fade-up-3 mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {lede}
        </div>
        {children && <div className="fade-up-3 mt-8">{children}</div>}
      </Container>
    </section>
  );
}
