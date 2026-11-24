"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  type FieldErrors,
  type Topic,
  isTopic,
  limits,
  topics,
  validateContact,
} from "@/lib/contact";
import { mailto } from "@/lib/site";

/**
 * Form submissions go straight from the browser to a form service (the site is
 * static, so there is no server of its own). Set NEXT_PUBLIC_CONTACT_ENDPOINT
 * at build time to any endpoint that accepts a JSON POST and returns 2xx on
 * success, e.g. a Formspree form URL. Without it, the form opens the
 * visitor's email app instead.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "not_configured" }
  | { kind: "error"; message: string };

const subjects: Record<Topic, string> = {
  general: "General enquiry — Winfin Technologies",
  project: "Software project enquiry — Winfin Technologies",
  saakshi: "Saakshi pilot enquiry",
  integration: "Saakshi integration enquiry",
  licensing: "Product licensing enquiry — Winfin Technologies",
};

export function ContactForm() {
  const params = useSearchParams();
  const paramTopic = params.get("topic");
  const initialTopic: Topic = isTopic(paramTopic) ? paramTopic : "general";

  const [values, setValues] = useState({
    name: "",
    email: "",
    organisation: "",
    topic: initialTopic as Topic,
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const configured = ENDPOINT !== "";

  // Keep topic in sync when the URL's ?topic= changes while on the page.
  const [lastParam, setLastParam] = useState(paramTopic);
  if (paramTopic !== lastParam) {
    setLastParam(paramTopic);
    if (isTopic(paramTopic)) setValues((v) => ({ ...v, topic: paramTopic }));
  }

  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (status.kind === "success") successRef.current?.focus();
  }, [status.kind]);

  const set =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setValues((v) => ({ ...v, [field]: value }));
      if (errors[field as keyof FieldErrors]) {
        setErrors((er) => ({ ...er, [field]: undefined }));
      }
    };

  const fallbackHref = mailto({
    subject: subjects[values.topic],
    body: [
      values.message,
      "",
      values.name ? `Name: ${values.name}` : "",
      values.organisation ? `Organisation: ${values.organisation}` : "",
    ]
      .join("\n")
      .trim(),
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const { data, errors: found } = validateContact(values);
    setErrors(found);
    if (!data) {
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    // Honeypot filled in: almost certainly a bot. Pretend it worked.
    if (values.website) {
      setStatus({ kind: "success" });
      return;
    }
    if (!configured) {
      setStatus({ kind: "not_configured" });
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subjects[data.topic],
          name: data.name,
          email: data.email,
          organisation: data.organisation,
          topic: topics[data.topic],
          message: data.message,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setStatus({ kind: "success" });
        return;
      }
      setStatus({ kind: "error", message: "Your message couldn’t be sent just now." });
    } catch {
      setStatus({ kind: "error", message: "We couldn’t reach the form service. Check your connection and try again." });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-accent/30 bg-accent-soft p-8 outline-none sm:p-10"
      >
        <p className="text-sm font-semibold text-accent">Message sent</p>
        <h3 className="mt-3 text-2xl font-semibold">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="mt-4 leading-relaxed text-muted">
          We’ve received your message about{" "}
          <span className="text-ink">{topics[values.topic].toLowerCase()}</span> and will reply to{" "}
          <span className="text-ink">{values.email}</span>.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues((v) => ({ ...v, message: "" }));
            setStatus({ kind: "idle" });
          }}
          className="mt-8 inline-flex min-h-11 items-center rounded-lg border border-line px-5 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof FieldErrors, string][];
  const submitting = status.kind === "submitting";
  const showUnavailable = !configured || status.kind === "not_configured";

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={submitting} className="space-y-6" aria-describedby={showUnavailable ? `${id}-unavailable` : undefined}>
      {showUnavailable && (
        <div id={`${id}-unavailable`} role="note" className="rounded-xl border border-warn/40 bg-warn-soft p-5 text-[0.95rem] leading-relaxed">
          <p className="font-medium text-warn">Online form delivery isn’t set up yet.</p>
          <p className="mt-1 text-muted">
            You can still fill in the form — the button below will open your
            email app with your message ready to send to us.
          </p>
        </div>
      )}

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-risk/40 bg-risk-soft p-5 outline-none">
          <p className="font-medium text-risk">Please fix {errorList.length === 1 ? "1 field" : `${errorList.length} fields`}:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink">
            {errorList.map(([field, msg]) => (
              <li key={field}>
                <a href={`#${id}-${field}`} className="underline underline-offset-4 hover:text-accent">{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Name" error={errors.name} required>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            maxLength={limits.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            required
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field id={`${id}-email`} label="Work email" error={errors.email} required>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            maxLength={limits.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            required
            className={inputCls(!!errors.email)}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${id}-organisation`} label="Organisation" hint="Optional" error={errors.organisation}>
          <input
            id={`${id}-organisation`}
            name="organisation"
            autoComplete="organization"
            value={values.organisation}
            onChange={set("organisation")}
            maxLength={limits.organisation}
            aria-invalid={!!errors.organisation}
            aria-describedby={errors.organisation ? `${id}-organisation-error` : undefined}
            className={inputCls(!!errors.organisation)}
          />
        </Field>
        <Field id={`${id}-topic`} label="Enquiry about" error={errors.topic} required>
          <div className="relative">
            <select
              id={`${id}-topic`}
              name="topic"
              value={values.topic}
              onChange={set("topic")}
              aria-invalid={!!errors.topic}
              aria-describedby={errors.topic ? `${id}-topic-error` : undefined}
              className={`${inputCls(!!errors.topic)} appearance-none pr-10`}
            >
              {(Object.keys(topics) as Topic[]).map((t) => (
                <option key={t} value={t} className="bg-canvas">
                  {topics[t]}
                </option>
              ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6l4 4 4-4" /></svg>
          </div>
        </Field>
      </div>

      <Field
        id={`${id}-message`}
        label="Message"
        error={errors.message}
        required
        hint={
          values.topic === "saakshi"
            ? "Your organisation type, approximate call volume, languages and calling system help us scope a pilot."
            : values.topic === "integration"
              ? "Your platform, how recordings are stored today and what you’d like to explore."
              : values.topic === "project"
              ? "What you want to build, your timeline, and how you’d like to work with us."
              : undefined
        }
      >
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          value={values.message}
          onChange={set("message")}
          maxLength={limits.message}
          aria-invalid={!!errors.message}
          aria-describedby={[errors.message && `${id}-message-error`, (values.topic === "saakshi" || values.topic === "integration" || values.topic === "project") && `${id}-message-hint`].filter(Boolean).join(" ") || undefined}
          required
          className={`${inputCls(!!errors.message)} min-h-40 resize-y py-3`}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={set("website")} />
        </label>
      </div>

      {status.kind === "error" && (
        <div role="alert" className="rounded-xl border border-risk/40 bg-risk-soft p-5 text-[0.95rem]">
          <p className="font-medium text-risk">{status.message}</p>
          <p className="mt-1 text-muted">
            Please try again, or{" "}
            <a href={fallbackHref} className="text-ink underline underline-offset-4 hover:text-accent">send it by email instead</a>.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {showUnavailable ? (
          <a
            href={fallbackHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-medium text-on-accent transition-colors hover:bg-accent-hover"
          >
            Open in my email app
          </a>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-medium text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" /></svg>
            )}
            {submitting ? "Sending…" : "Send message"}
          </button>
        )}
        <p className="text-sm text-subtle">
          We use your details only to reply to this enquiry.
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your message" : ""}
      </p>
    </form>
  );
}

function inputCls(invalid: boolean) {
  return `block w-full min-h-12 rounded-lg border bg-surface px-4 text-ink placeholder:text-subtle transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
    invalid ? "border-risk" : "border-line-strong hover:border-subtle focus:border-accent"
 }`;
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium">
        <span>
          {label}
          {required && <span aria-hidden="true" className="ml-1 text-accent">*</span>}
        </span>
        {hint && hint.length < 12 && <span className="font-normal text-subtle">{hint}</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && hint.length >= 12 && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-subtle">{hint}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-risk">
          {error}
        </p>
      )}
    </div>
  );
}
