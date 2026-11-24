import { connection } from "next/server";
import { topics, validateContact } from "@/lib/contact";

/**
 * Contact form backend.
 *
 * Configure ONE of the following (see README):
 *   CONTACT_WEBHOOK_URL         — receives a JSON POST (Formspree, Make, Zapier, n8n, Slack workflow, your own API…)
 *   RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL) — sends an email via Resend
 *
 * With neither set, the endpoint reports `not_configured` and the form
 * directs visitors to email instead.
 */

type Backend = "webhook" | "resend" | null;

function backend(): Backend {
  if (process.env.CONTACT_WEBHOOK_URL) return "webhook";
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) return "resend";
  return null;
}

export async function GET() {
  await connection(); // evaluate env at request time, not build time
  return Response.json({ configured: backend() !== null });
}

export async function POST(request: Request) {
  await connection();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, code: "bad_request", message: "Invalid request body." }, { status: 400 });
  }

  const { data, errors } = validateContact(body);
  if (!data) {
    return Response.json({ ok: false, code: "validation", errors }, { status: 422 });
  }

  // Honeypot filled → pretend success, drop silently.
  if (data.website) return Response.json({ ok: true });

  const kind = backend();
  if (!kind) {
    return Response.json(
      { ok: false, code: "not_configured", message: "The contact form is not configured on this deployment." },
      { status: 503 }
    );
  }

  const topicLabel = topics[data.topic];
  const subject = `[Website] ${topicLabel} — ${data.name}${data.organisation ? ` (${data.organisation})` : ""}`;
  const text = [
    `Topic: ${topicLabel}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Organisation: ${data.organisation || "—"}`,
    "",
    data.message,
  ].join("\n");

  try {
    const res =
      kind === "webhook"
        ? await fetch(process.env.CONTACT_WEBHOOK_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              subject,
              name: data.name,
              email: data.email,
              organisation: data.organisation,
              topic: data.topic,
              topicLabel,
              message: data.message,
              text,
              submittedAt: new Date().toISOString(),
            }),
            signal: AbortSignal.timeout(10_000),
          })
        : await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: process.env.CONTACT_FROM_EMAIL ?? "Winfin Website <onboarding@resend.dev>",
              to: process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
              reply_to: data.email,
              subject,
              text,
            }),
            signal: AbortSignal.timeout(10_000),
          });

    if (!res.ok) {
      console.error(`[contact] ${kind} responded ${res.status}`);
      return Response.json(
        { ok: false, code: "delivery_failed", message: "We couldn’t deliver your message right now." },
        { status: 502 }
      );
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery error", err);
    return Response.json(
      { ok: false, code: "delivery_failed", message: "We couldn’t deliver your message right now." },
      { status: 502 }
    );
  }
}
