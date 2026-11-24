// Shared between the contact form (client) and the API route (server).

export const topics = {
  saakshi: "Saakshi pilot",
  integration: "Saakshi integration",
  general: "General enquiry",
  project: "Software project",
  licensing: "Product licensing",
} as const;

export type Topic = keyof typeof topics;

export type ContactPayload = {
  name: string;
  email: string;
  organisation: string;
  topic: Topic;
  message: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type FieldErrors = Partial<Record<"name" | "email" | "topic" | "message" | "organisation", string>>;

export const limits = { name: 120, email: 200, organisation: 160, message: 5000 };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isTopic(v: unknown): v is Topic {
  return typeof v === "string" && v in topics;
}

export function validateContact(input: Partial<Record<keyof ContactPayload, unknown>>): {
  data?: ContactPayload;
  errors: FieldErrors;
} {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(input.name);
  const email = str(input.email);
  const organisation = str(input.organisation);
  const message = str(input.message);
  const topic = input.topic;
  const errors: FieldErrors = {};

  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > limits.name) errors.name = "That name is too long.";

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > limits.email || !emailRe.test(email))
    errors.email = "Please enter a valid email address, like name@company.com.";

  if (organisation.length > limits.organisation) errors.organisation = "That organisation name is too long.";

  if (!isTopic(topic)) errors.topic = "Please choose what your enquiry is about.";

  if (!message) errors.message = "Please add a short message.";
  else if (message.length < 10) errors.message = "Please add a little more detail (at least 10 characters).";
  else if (message.length > limits.message) errors.message = `Please keep your message under ${limits.message} characters.`;

  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    data: { name, email, organisation, topic: topic as Topic, message, website: str(input.website) },
  };
}
