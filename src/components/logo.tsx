import Link from "next/link";

/** Winfin mark: a cobalt tile with the W stroke. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none">
      <rect width="32" height="32" rx="7" fill="var(--color-accent)" />
      <path
        d="M7.5 11l4.2 10.5L16 13.2l4.3 8.3L24.5 11"
        stroke="var(--color-on-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 rounded-md ${tone === "dark" ? "text-white" : "text-ink"}`}
      aria-label="Winfin Technologies — home"
    >
      <LogoMark className="h-8 w-8" />
      <span className="text-[1.05rem] font-semibold tracking-[-0.01em]">
        Winfin
        <span className={`ml-1 font-normal ${tone === "dark" ? "text-on-navy" : "text-muted"}`}>Technologies</span>
      </span>
    </Link>
  );
}
