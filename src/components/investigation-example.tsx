"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

/**
 * A fictional complaint investigation, shown as four steps. Every name,
 * reference and line of dialogue is invented. Nothing is saved and there is
 * no real audio: playback is simulated.
 */

const steps = [
  { key: "find", label: "Find the call" },
  { key: "inspect", label: "Inspect the passage" },
  { key: "listen", label: "Listen to the audio" },
  { key: "decide", label: "Record a decision" },
] as const;

const calls = [
  { id: "DEMO-7734-03", when: "11 Mar · 19:12", agent: "Agent 14", dur: "05:48", findings: 1 },
  { id: "DEMO-7734-02", when: "08 Mar · 11:40", agent: "Agent 14", dur: "02:10", findings: 0 },
  { id: "DEMO-7734-01", when: "02 Mar · 10:05", agent: "Agent 09", dur: "03:26", findings: 0 },
];

const bars = Array.from({ length: 64 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.9) * 0.5 + Math.sin(i * 0.23 + 1) * 0.5);
  return Math.round(14 + v * 78);
});
// Flagged passage 03:05–03:25 in a 05:48 call
const TOTAL = 348;
const FROM = 185;
const TO = 205;

export function InvestigationExample() {
  const [step, setStep] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const go = (i: number, focus = false) => {
    const n = (i + steps.length) % steps.length;
    setStep(n);
    if (focus) tabRefs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(step + 1, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(step - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      go(steps.length - 1, true);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-10">
      {/* Complaint */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <article className="rounded-xl border border-line bg-surface p-6 sm:p-7" aria-labelledby={`${id}-complaint`}>
          <p className="font-medium text-xs text-subtle">
            Borrower complaint · fictional example
          </p>
          <h3 id={`${id}-complaint`} className="mt-3 text-xl font-medium leading-snug">
            “The agent threatened to call my employer and tell them about my loan.”
          </h3>
          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink/10 pt-5 text-sm">
            {[
              ["Received", "12 Mar"],
              ["Loan ref.", "LN-DEMO-7734"],
              ["Channel", "Lender helpline"],
              ["Assigned to", "Reviewer A"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-medium text-xs text-subtle">{k}</dt>
                <dd className="mt-0.5 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </article>
        <p className="mt-4 text-sm leading-relaxed text-subtle">
          Names, references and dialogue are invented. This shows how the
          review is being designed to work; it is not a record of a real case.
        </p>
      </div>

      {/* Steps */}
      <div className="min-w-0">
        <div role="tablist" aria-label="Investigation steps" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {steps.map((s, i) => {
            const selected = i === step;
            return (
              <button
                key={s.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${id}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={onKey}
                className={`flex min-h-14 flex-col items-start justify-center rounded-lg border px-3.5 py-2.5 text-left transition-colors ${
                  selected
                    ? "border-accent bg-accent text-on-accent"
                    : "border-line bg-surface text-ink hover:border-accent"
                }`}
              >
                <span className={`text-xs font-medium ${selected ? "text-on-accent/80" : "text-accent"}`}>
                  Step {i + 1}
                </span>
                <span className="text-[0.92rem] font-medium leading-tight">{s.label}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${step}`}
          tabIndex={0}
          className="mt-4 min-h-[23rem] rounded-xl border border-line bg-surface p-5 sm:p-7"
        >
          {step === 0 && <FindStep />}
          {step === 1 && <InspectStep />}
          {step === 2 && <ListenStep />}
          {step === 3 && <DecideStep />}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className="min-h-11 rounded-lg px-4 text-sm text-muted transition-colors hover:text-accent disabled:opacity-40 disabled:hover:text-muted"
          >
            ← Previous step
          </button>
          <button
            type="button"
            onClick={() => go(step + 1)}
            disabled={step === steps.length - 1}
            className="min-h-11 rounded-lg border border-line px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
          >
            Next step →
          </button>
        </div>
      </div>
    </div>
  );
}

function StepIntro({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-muted">{children}</p>
    </div>
  );
}

function FindStep() {
  return (
    <div>
      <StepIntro title="Search by loan reference">
        The reviewer enters the loan reference from the complaint and sees
        every recorded call on that account, across agencies, with any
        potential issues already marked.
      </StepIntro>
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-canvas px-4 py-3" aria-hidden="true">
        <svg viewBox="0 0 16 16" className="h-4 w-4 text-subtle" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" strokeLinecap="round" /></svg>
        <span className="font-mono text-sm">LN-DEMO-7734</span>
        <span className="ml-auto font-medium text-xs text-subtle">3 calls</span>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[34rem] whitespace-nowrap text-left text-sm">
          <caption className="sr-only">Calls found for loan reference LN-DEMO-7734 (fictional)</caption>
          <thead>
            <tr className="font-medium text-xs text-subtle">
              <th scope="col" className="px-3 py-2 font-normal">Call</th>
              <th scope="col" className="px-3 py-2 font-normal">Placed</th>
              <th scope="col" className="px-3 py-2 font-normal">Agent</th>
              <th scope="col" className="px-3 py-2 font-normal">Length</th>
              <th scope="col" className="px-3 py-2 font-normal">Findings</th>
            </tr>
          </thead>
          <tbody>
            {calls.map((c) => (
              <tr key={c.id} className={c.findings ? "bg-risk-soft" : "border-t border-line"}>
                <td className={`px-3 py-3 font-mono text-[0.8rem] ${c.findings ? "rounded-l-lg" : ""}`}>{c.id}</td>
                <td className="px-3 py-3">{c.when}</td>
                <td className="px-3 py-3">{c.agent}</td>
                <td className="px-3 py-3 font-mono text-[0.8rem]">{c.dur}</td>
                <td className={`px-3 py-3 ${c.findings ? "rounded-r-lg text-risk" : "text-subtle"}`}>
                  {c.findings ? "1 potential issue" : "None"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InspectStep() {
  return (
    <div>
      <StepIntro title="Read the exact words, in context">
        The marked passage opens at its timestamp, with the lines before and
        after it and an English rendering of the Hindi.
      </StepIntro>
      <ol className="mt-6 space-y-2" aria-label="Transcript excerpt from call DEMO-7734-03 (fictional)">
        <li className="grid grid-cols-[3rem_1fr] gap-3 rounded-md px-3 py-2.5 text-[0.92rem]">
          <span className="font-mono text-xs leading-6 text-subtle">02:51</span>
          <span><span className="mr-2 font-medium text-xs text-subtle">Customer</span>Is mahine thodi problem hai, agle hafte de doonga.</span>
        </li>
        <li className="grid grid-cols-[3rem_1fr] gap-3 rounded-md bg-risk-soft px-3 py-3 text-[0.92rem] shadow-[inset_2px_0_0_var(--color-risk)]">
          <span className="font-mono text-xs leading-6 text-risk">03:12</span>
          <span>
            <span className="mr-2 font-medium text-xs text-subtle">Agent</span>
            Agle hafte nahi. Main aapke employer ko phone karke sab bata doonga.
            <span className="mt-1 block text-[0.85rem] text-muted">
              “Not next week. I’ll phone your employer and tell them everything.”
            </span>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-risk/30 bg-surface px-2 py-0.5 text-xs font-medium text-risk">
              ⚑ Potential issue · threat to contact employer
            </span>
          </span>
        </li>
        <li className="grid grid-cols-[3rem_1fr] gap-3 rounded-md px-3 py-2.5 text-[0.92rem]">
          <span className="font-mono text-xs leading-6 text-subtle">03:24</span>
          <span><span className="mr-2 font-medium text-xs text-subtle">Customer</span>Aap aisa nahi kar sakte.</span>
        </li>
      </ol>
      <p className="mt-5 rounded-xl border border-line bg-canvas p-4 text-sm leading-relaxed text-muted">
        <span className="font-medium text-ink">Why it was marked:</span> the
        passage mentions contacting a third party about the borrower’s debt.
        A marker is a prompt to check, not a conclusion.
      </p>
    </div>
  );
}

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function ListenStep() {
  const [pos, setPos] = useState(FROM);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setPos((p) => {
        if (p >= TO) {
          setPlaying(false);
          return TO;
        }
        return p + 1;
      });
    }, 220);
    return () => window.clearInterval(timer);
  }, [playing]);

  const toggle = () => {
    if (playing) return setPlaying(false);
    // With reduced motion, jump straight to the end of the passage.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(pos >= TO ? FROM : TO);
      return;
    }
    if (pos >= TO) setPos(FROM);
    setPlaying(true);
  };

  const pct = (pos / TOTAL) * 100;
  return (
    <div>
      <StepIntro title="Hear it in the original recording">
        Transcripts can be wrong. The reviewer plays the passage from the
        original audio to check the words, the tone and what was said around it.
      </StepIntro>
      <div className="mt-6 rounded-xl bg-canvas p-4">
        <div className="relative flex h-20 items-center gap-[3px]" aria-hidden="true">
          <span
            className="absolute inset-y-[-6px] rounded-md bg-risk-soft ring-1 ring-inset ring-risk/30"
            style={{ left: `${(FROM / TOTAL) * 100}%`, width: `${((TO - FROM) / TOTAL) * 100}%` }}
          />
          {bars.map((h, i) => {
            const p = ((i + 0.5) / bars.length) * 100;
            const inFlag = p >= (FROM / TOTAL) * 100 && p <= (TO / TOTAL) * 100;
            return (
              <span
                key={i}
                className={`relative flex-1 rounded-full ${inFlag ? "bg-risk" : p < pct ? "bg-accent" : "bg-line-strong"}`}
                style={{ height: `${h}%` }}
              />
            );
          })}
          <span className="absolute inset-y-[-8px] w-0.5 rounded bg-ink" style={{ left: `${pct}%` }} />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[0.64rem] text-subtle">
          <span>00:00</span>
          <span className="text-risk">Passage 03:05–03:25</span>
          <span>05:48</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
          >
            {playing ? (
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="currentColor"><rect x="3.5" y="3" width="3" height="10" rx="1" /><rect x="9.5" y="3" width="3" height="10" rx="1" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="currentColor"><path d="M4 2.8v10.4c0 .5.5.8.9.5l8.2-5.2c.4-.2.4-.8 0-1L4.9 2.3c-.4-.3-.9 0-.9.5z" /></svg>
            )}
            {playing ? "Pause passage" : pos >= TO ? "Replay passage" : "Play passage"}
          </button>
          <p className="font-mono text-sm" aria-live="off">
            {fmt(pos)} <span className="text-subtle">/ 05:48</span>
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-subtle">
        Playback is simulated in this example. There is no audio on this page.
      </p>
    </div>
  );
}

type Decision = "pending" | "confirmed" | "dismissed";

function DecideStep() {
  const [decision, setDecision] = useState<Decision>("pending");
  const [note, setNote] = useState("Agent threatens to contact employer at 03:12. Confirmed on audio.");
  const noteId = useId();

  return (
    <div>
      <StepIntro title="Confirm or dismiss, with a reason">
        The reviewer makes the call. Their decision and note are kept with the
        passage and audio, so the complaint file shows what was found and who
        decided.
      </StepIntro>

      <div className="mt-6 grid gap-5 md:grid-cols-[1fr_15rem]">
        <div>
          <label htmlFor={noteId} className="font-medium text-xs text-subtle">
            Reviewer note
          </label>
          <textarea
            id={noteId}
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={decision !== "pending"}
            className="mt-2 w-full rounded-lg border border-line-strong bg-surface px-3.5 py-3 text-[0.92rem] leading-relaxed text-ink placeholder:text-subtle disabled:opacity-70"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {decision === "pending" ? (
              <>
                <button
                  type="button"
                  onClick={() => setDecision("confirmed")}
                  className="min-h-11 rounded-lg bg-accent px-5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
                >
                  Confirm finding
                </button>
                <button
                  type="button"
                  onClick={() => setDecision("dismissed")}
                  className="min-h-11 rounded-lg border border-line-strong bg-surface px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  Dismiss finding
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setDecision("pending")}
                className="min-h-11 rounded-lg border border-line-strong bg-surface px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Reset example
              </button>
            )}
          </div>
        </div>

        <div role="status" className="rounded-xl border border-line bg-canvas p-4 text-sm">
          <p className="font-medium text-xs text-subtle">Finding record</p>
          {decision === "pending" ? (
            <p className="mt-2 inline-flex items-center gap-2 text-warn">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-warn" />
              Awaiting human review
            </p>
          ) : (
            <>
              <p className={`mt-2 inline-flex items-center gap-2 ${decision === "confirmed" ? "text-risk" : "text-ok"}`}>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                {decision === "confirmed" ? "Confirmed" : "Dismissed"} by Reviewer A
              </p>
              <dl className="mt-3 space-y-1.5 text-[0.82rem] text-muted">
                <div className="flex justify-between gap-3"><dt>Call</dt><dd className="font-mono">DEMO-7734-03</dd></div>
                <div className="flex justify-between gap-3"><dt>Passage</dt><dd className="font-mono">03:12</dd></div>
                <div className="flex justify-between gap-3"><dt>Complaint</dt><dd className="font-mono">LN-DEMO-7734</dd></div>
              </dl>
              <p className="mt-3 text-[0.78rem] text-subtle">Example only · nothing is saved.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
