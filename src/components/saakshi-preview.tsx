"use client";

import { useState } from "react";

/**
 * Hero product preview for Saakshi. All data is fictional and the panel is
 * labelled as an illustrative product preview. Review buttons only change
 * local state; nothing is saved.
 */

type Decision = "pending" | "confirmed" | "dismissed";

const calls = [
  { id: "DEMO-0417", agent: "Agent 14", time: "21:47", findings: 2, active: true },
  { id: "DEMO-0412", agent: "Agent 09", time: "18:05", findings: 0 },
  { id: "DEMO-0409", agent: "Agent 14", time: "16:32", findings: 1 },
  { id: "DEMO-0398", agent: "Agent 21", time: "14:10", findings: 0 },
  { id: "DEMO-0391", agent: "Agent 09", time: "11:56", findings: 0 },
];

const transcript = [
  { t: "01:48", who: "Agent", text: "Aapki EMI 12 din se overdue hai. Aaj kitna payment ho payega?" },
  { t: "02:02", who: "Customer", text: "Salary 5 tareekh ko aayegi, tab tak ruk jaiye." },
  {
    t: "02:14",
    who: "Agent",
    text: "Aaj payment nahi hua toh hum aapke office aakar sabko bata denge.",
    en: "“If you don’t pay today, we’ll come to your office and tell everyone.”",
    flag: true,
  },
  { t: "02:31", who: "Customer", text: "Please aisa mat kijiye. Main 5 tareekh tak kar doonga." },
  { t: "02:44", who: "Agent", text: "Theek hai, main 5 tareekh ka follow-up note kar raha hoon." },
];

const bars = Array.from({ length: 72 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 1.3) * 0.55 + Math.sin(i * 0.41) * 0.45);
  return Math.round(18 + v * 74);
});
const FLAG_FROM = 23;
const FLAG_TO = 27;
const pct = (i: number) => `${(i / bars.length) * 100}%`;

const decisionMeta: Record<Decision, { label: string; cls: string }> = {
  pending: { label: "Awaiting review", cls: "border-warn/30 bg-warn-soft text-warn" },
  confirmed: { label: "Confirmed by reviewer", cls: "border-risk/30 bg-risk-soft text-risk" },
  dismissed: { label: "Dismissed by reviewer", cls: "border-ok/30 bg-ok-soft text-ok" },
};

export function SaakshiPreview() {
  const [decision, setDecision] = useState<Decision>("pending");

  return (
    <figure
      aria-labelledby="saakshi-preview-caption"
      className="overflow-hidden rounded-xl border border-line bg-surface text-ink shadow-[0_1px_2px_rgba(16,24,39,0.05),0_24px_48px_-24px_rgba(16,24,39,0.28)]"
    >
      {/* App bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden="true" className="grid h-6 w-6 flex-none place-items-center rounded-md bg-accent text-[0.7rem] font-semibold text-on-accent">
            S
          </span>
          <span className="text-sm font-semibold">Saakshi</span>
          <span className="hidden text-sm text-subtle sm:inline">/ Review queue</span>
        </div>
        <span className="flex-none text-xs font-medium text-subtle">Illustrative product preview</span>
      </div>

      <div className="grid md:grid-cols-[13rem_1fr]">
        {/* Call list */}
        <div className="hidden border-r border-line bg-canvas md:block">
          <div className="border-b border-line px-3 py-2.5">
            <div className="flex items-center gap-2 rounded-md border border-line bg-surface px-2 py-1.5 text-xs text-subtle" aria-hidden="true">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" strokeLinecap="round" /></svg>
              Loan ref. or agent
            </div>
          </div>
          <p className="px-3 pb-1 pt-3 text-xs font-medium text-subtle">Today · 5 calls</p>
          <ul className="px-1.5 pb-2">
            {calls.map((c) => (
              <li
                key={c.id}
                className={`rounded-md px-2 py-2 ${c.active ? "bg-surface shadow-[0_0_0_1px_var(--color-accent)]" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.72rem] font-medium">{c.id}</span>
                  <span className="font-mono text-[0.68rem] text-subtle">{c.time}</span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2 text-[0.7rem]">
                  <span className="text-subtle">{c.agent}</span>
                  {c.findings ? (
                    <span className="inline-flex items-center gap-1 font-medium text-risk">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-risk" />
                      {c.findings} to review
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-ok">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
                      Clear
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          {/* Compact call list (small screens) */}
          <ul className="flex gap-2 overflow-x-auto border-b border-line bg-canvas px-4 py-2.5 md:hidden" aria-label="Calls (fictional)">
            {calls.slice(0, 4).map((c) => (
              <li
                key={c.id}
                className={`flex flex-none items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[0.7rem] ${
                  c.active ? "border-accent bg-surface font-medium" : "border-line bg-surface text-muted"
                }`}
              >
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${c.findings ? "bg-risk" : "bg-ok"}`} />
                {c.id}
              </li>
            ))}
          </ul>
          {/* Call header */}
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line px-4 py-3 sm:px-5">
            <div>
              <p className="font-mono text-sm font-medium">DEMO-0417</p>
              <p className="mt-0.5 text-xs text-subtle">Agent 14 · Example Recovery Partners (fictional)</p>
            </div>
            <dl className="flex gap-5 text-xs">
              {[
                ["Loan ref.", "LN-DEMO-2291"],
                ["Language", "Hindi · English"],
                ["Placed", "21:47"],
              ].map(([k, v]) => (
                <div key={k} className={k === "Loan ref." ? "hidden sm:block" : ""}>
                  <dt className="text-subtle">{k}</dt>
                  <dd className="mt-0.5 font-mono font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Waveform */}
          <div className="border-b border-line px-4 py-3.5 sm:px-5" aria-hidden="true">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-accent text-on-accent">
                <svg viewBox="0 0 16 16" className="ml-0.5 h-3.5 w-3.5" fill="currentColor"><path d="M4 2.8v10.4c0 .5.5.8.9.5l8.2-5.2c.4-.2.4-.8 0-1L4.9 2.3c-.4-.3-.9 0-.9.5z" /></svg>
              </span>
              <div className="relative flex h-10 flex-1 items-center gap-[2px]">
                <span
                  className="absolute -inset-y-1 rounded bg-risk-soft"
                  style={{ left: pct(FLAG_FROM), width: pct(FLAG_TO - FLAG_FROM + 1) }}
                />
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={`relative flex-1 rounded-full ${
                      i >= FLAG_FROM && i <= FLAG_TO ? "bg-risk" : i < FLAG_FROM ? "bg-accent" : "bg-line-strong"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
                <span className="absolute -inset-y-1.5 w-0.5 rounded bg-ink" style={{ left: pct(FLAG_FROM) }} />
              </div>
              <span className="flex-none font-mono text-xs text-subtle">02:14 / 06:42</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_16rem]">
            {/* Transcript */}
            <ol className="space-y-1 p-3 sm:p-4" aria-label="Transcript excerpt (fictional)">
              {transcript.map((l) => (
                <li
                  key={l.t}
                  className={`grid grid-cols-[2.75rem_1fr] gap-2 rounded-md px-2.5 py-2 text-[0.88rem] leading-snug ${
                    l.flag ? "bg-risk-soft shadow-[inset_2px_0_0_var(--color-risk)]" : ""
                  }`}
                >
                  <span className={`font-mono text-[0.72rem] leading-5 ${l.flag ? "font-medium text-risk" : "text-subtle"}`}>{l.t}</span>
                  <span>
                    <span className="mr-1.5 text-[0.72rem] font-semibold text-muted">{l.who}</span>
                    {l.text}
                    {l.en && <span className="mt-1 block text-[0.78rem] text-muted">{l.en}</span>}
                  </span>
                </li>
              ))}
            </ol>

            {/* Finding + reviewer decision */}
            <div className="border-t border-line bg-canvas p-4 lg:border-l lg:border-t-0">
              <p className="text-xs font-medium text-subtle">Potential issue</p>
              <p className="mt-1 text-sm font-semibold leading-snug">Possible threat of third-party disclosure</p>
              <p className="mt-1 font-mono text-xs text-subtle">at 02:14 · 1 of 2</p>
              <p
                role="status"
                className={`mt-3 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${decisionMeta[decision].cls}`}
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                {decisionMeta[decision].label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
                <button
                  type="button"
                  onClick={() => setDecision("confirmed")}
                  aria-pressed={decision === "confirmed"}
                  className="min-h-9 rounded-md bg-accent px-3 text-[0.82rem] font-medium text-on-accent transition-colors hover:bg-accent-hover"
                >
                  Confirm finding
                </button>
                <button
                  type="button"
                  onClick={() => setDecision("dismissed")}
                  aria-pressed={decision === "dismissed"}
                  className="min-h-9 rounded-md border border-line-strong bg-surface px-3 text-[0.82rem] font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  Dismiss
                </button>
              </div>
              {decision !== "pending" && (
                <div className="mt-3 border-t border-line pt-3 text-xs text-muted">
                  <p>Reviewer A · just now</p>
                  <button
                    type="button"
                    onClick={() => setDecision("pending")}
                    className="mt-1 min-h-6 font-medium text-accent hover:text-accent-hover"
                  >
                    Undo decision
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <figcaption
        id="saakshi-preview-caption"
        className="border-t border-line bg-canvas px-4 py-2 text-xs text-subtle"
      >
        Illustrative product preview. Fictional calls and data; nothing is saved.
      </figcaption>
    </figure>
  );
}
