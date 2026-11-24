import type { Faq } from "@/lib/saakshi";

/** Accessible FAQ list using native disclosure widgets. Answers are in the initial HTML. */
export function FaqList({ items, tone = "dark" }: { items: Faq[]; tone?: "dark" | "paper" }) {
  const paper = tone === "paper";
  return (
    <div className={`divide-y border-y ${paper ? "divide-line border-ink/12" : "divide-line border-line"}`}>
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            <h3 className="text-left">{f.q}</h3>
            <span
              aria-hidden="true"
              className={`mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-transform group-open:rotate-45 ${
 paper ? "border-ink/20 text-accent" : "border-line text-accent"
 }`}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 3v10M3 8h10" /></svg>
            </span>
          </summary>
          <p className={`max-w-3xl pb-7 pr-12 leading-relaxed ${paper ? "text-muted" : "text-muted"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
