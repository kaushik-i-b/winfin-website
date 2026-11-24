"use client";

import { useState } from "react";

/**
 * Saakshi illustrative interface. Every value here is fictional and the panel
 * is labelled as a demonstration. Interactions only change local state.
 */

type Line = {
  t: string;
  sec: number;
  speaker: "Agent" | "Customer";
  text: string;
  translation?: string;
  flag?: string;
};

const DURATION = 402; // 06:42

const lines: Line[] = [
  { t: "00:04", sec: 4, speaker: "Agent", text: "Namaste, main Example Recovery Services se baat kar raha hoon." },
  { t: "00:41", sec: 41, speaker: "Customer", text: "Maine pichhle hafte bataya tha, salary 5 tareekh ko aayegi." },
  {
    t: "02:14",
    sec: 134,
    speaker: "Agent",
    text: "Agar aaj payment nahi hua, toh hum aapke office aakar sabko bata denge.",
    translation: "“If the payment isn’t made today, we’ll come to your office and tell everyone.”",
    flag: "Potential threat · third-party disclosure",
  },
  { t: "02:31", sec: 151, speaker: "Customer", text: "Please aisa mat kijiye. Main 5 tareekh tak kar doonga." },
  { t: "03:02", sec: 182, speaker: "Agent", text: "Theek hai, main 5 tareekh ka follow-up note kar raha hoon." },
];

// Deterministic pseudo-waveform
const bars = Array.from({ length: 72 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 1.7) * 0.6 + Math.sin(i * 0.37) * 0.4);
  return Math.round(18 + v * 70);
});

type Status = "pending" | "confirmed" | "dismissed";

export function SaakshiDemo() {
  const [active, setActive] = useState(2);
  const [status, setStatus] = useState<Status>("pending");
  const playhead = (lines[active].sec / DURATION) * 100;

  const statusMeta: Record<Status, { label: string; cls: string }> = {
    pending: { label: "Awaiting human review", cls: "bg-warn-soft text-warn ring-warn/30" },
    confirmed: { label: "Confirmed by reviewer", cls: "bg-risk-soft text-risk ring-risk/30" },
    dismissed: { label: "Dismissed by reviewer", cls: "bg-ok-soft text-ok ring-ok/30" },
  };

  return (
    <figure
      className="relative overflow-hidden rounded-xl border border-line bg-surface text-ink shadow-[0_1px_2px_rgba(16,24,39,0.05),0_24px_48px_-24px_rgba(16,24,39,0.25)]"
      aria-labelledby="saakshi-demo-caption"
    >
      {/* Demonstration banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-canvas px-5 py-2.5 text-xs">
        <span className="inline-flex items-center gap-2 font-semibold">
          <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded bg-accent text-[0.62rem] font-semibold text-on-accent">S</span>
          Saakshi · Call review
        </span>
        <span className="font-medium text-subtle">Illustrative product preview · fictional call and data</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_17rem]">
        <div className="min-w-0 p-5 sm:p-6">
          {/* Call meta */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
            {[
              ["Call", "DEMO-0417"],
              ["Loan ref.", "LN-DEMO-0000"],
              ["Languages", "Hindi · English"],
              ["Placed at", "21:47 local"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-medium text-xs text-subtle">{k}</dt>
                <dd className="mt-1 truncate">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Waveform */}
          <div className="relative mt-6 rounded-xl bg-canvas px-3 py-4" aria-hidden="true">
            <div className="flex h-16 items-center gap-[3px]">
              {bars.map((h, i) => {
                const pos = (i / bars.length) * 100;
                const inFlag = pos >= 32.5 && pos <= 37.5;
                return (
                  <span
                    key={i}
                    className={`flex-1 rounded-full ${inFlag ? "bg-risk" : pos < playhead ? "bg-accent" : "bg-line-strong"}`}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>
            <span
              className="absolute bottom-2 top-2 w-0.5 rounded bg-ink transition-[left] duration-300"
              style={{ left: `calc(0.75rem + (100% - 1.5rem) * ${playhead / 100})` }}
            />
            <div className="mt-2 flex justify-between font-mono text-[0.66rem] text-subtle">
              <span>00:00</span>
              <span>06:42</span>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            Audio position {lines[active].t} of 06:42
          </p>

          {/* Transcript */}
          <h3 className="mt-6 font-medium text-xs text-subtle">
            Transcript · select a line to jump the audio
          </h3>
          <ol className="mt-3 space-y-1.5">
            {lines.map((l, i) => {
              const isActive = i === active;
              return (
                <li key={l.t}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`grid w-full grid-cols-[3.4rem_1fr] gap-3 rounded-md px-3 py-2.5 text-left text-[0.9rem] leading-snug transition-colors ${
                      l.flag
                        ? "bg-risk-soft shadow-[inset_2px_0_0_var(--color-risk)]"
                        : isActive
                          ? "bg-accent-soft"
                          : "hover:bg-canvas"
                    }`}
                  >
                    <span className={`font-mono text-xs leading-6 ${l.flag ? "text-risk" : "text-subtle"}`}>{l.t}</span>
                    <span>
                      <span className="mr-2 font-medium text-xs text-subtle">{l.speaker}</span>
                      {l.text}
                      {l.translation && (
                        <span className="mt-1 block text-[0.85rem] text-muted">{l.translation}</span>
                      )}
                      {l.flag && (
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-risk/30 bg-surface px-2 py-0.5 text-xs font-medium text-risk">
                          ⚑ {l.flag}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Review panel */}
        <aside className="border-t border-line bg-canvas p-5 sm:p-6 lg:border-l lg:border-t-0" aria-label="Human review (demonstration)">
          <h3 className="font-medium text-xs text-subtle">Findings</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="rounded-lg border border-risk/30 p-3">
              <p className="text-risk">Potential threat / third-party disclosure</p>
              <p className="mt-1 font-mono text-xs text-subtle">at 02:14</p>
            </li>
            <li className="rounded-lg border border-warn/30 p-3">
              <p className="text-warn">Outside configured hours</p>
              <p className="mt-1 font-mono text-xs text-subtle">placed 21:47 · window 08:00–19:00</p>
            </li>
          </ul>

          <h3 className="mt-6 font-medium text-xs text-subtle">Review status</h3>
          <p
            role="status"
            className={`mt-3 inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-sm font-medium ring-1 ring-inset ${statusMeta[status].cls}`}
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
            {statusMeta[status].label}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setStatus("confirmed")}
              aria-pressed={status === "confirmed"}
              className="min-h-11 rounded-lg bg-accent px-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setStatus("dismissed")}
              aria-pressed={status === "dismissed"}
              className="min-h-11 rounded-lg border border-line-strong bg-surface px-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Dismiss
            </button>
          </div>
          {status !== "pending" && (
            <button
              type="button"
              onClick={() => setStatus("pending")}
              className="mt-3 text-sm text-muted underline decoration-line-strong underline-offset-4 hover:text-accent"
            >
              Reset demo
            </button>
          )}
          <p className="mt-5 text-xs leading-relaxed text-subtle">
            In Saakshi, flags are suggestions. A reviewer decides, and their
            decision is recorded with the evidence. Nothing in this demo is saved.
          </p>
        </aside>
      </div>
      <figcaption id="saakshi-demo-caption" className="sr-only">
        Demonstration of the Saakshi review interface using a fictional recovery
        call, with a highlighted transcript passage at 02:14 and its human-review
        status.
      </figcaption>
    </figure>
  );
}
