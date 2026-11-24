import type { ReactNode } from "react";

// Shared Saakshi content. Saakshi is in development: describe capabilities as
// planned or proposed until they are confirmed with pilot customers.

export type Stage = "pilot" | "planned";
export const workflow: { title: string; body: string; stage: Stage; note?: string; icon: ReactNode }[] = [
  {
    title: "Import recordings",
    body: "Bring in recordings from the calling systems your teams and agencies already use.",
    stage: "pilot",
    note: "Bulk upload in pilot · Direct integrations planned",
    icon: <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19h14" />,
  },
  {
    title: "Transcribe and search",
    body: "Turn each call into a timestamped transcript, searchable by loan reference, agent, date or phrase.",
    stage: "pilot",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="M15 15l4.5 4.5M8 9h5M8 12h3" />
      </>
    ),
  },
  {
    title: "Surface potential issues",
    body: "Mark passages that may need attention, such as threats, abusive language or disclosure to third parties, and calls outside agreed hours.",
    stage: "pilot",
    icon: <path d="M6 20V5M6 5h11l-2 3.5L17 12H6" />,
  },
  {
    title: "Review alongside the audio",
    body: "Open each marked passage at its timestamp, read it in context and play the original recording.",
    stage: "pilot",
    icon: <path d="M4 12h1.5M7.5 8v8M11 5v14M14.5 9v6M18 7v10M20.5 12H20" />,
  },
  {
    title: "Confirm or dismiss",
    body: "A reviewer decides on every finding and adds a note. Saakshi suggests; people decide.",
    stage: "pilot",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M8.5 12.2l2.4 2.3 4.6-4.9" />
      </>
    ),
  },
  {
    title: "Export and track",
    body: "Export reviewed findings as reports, and follow findings over time at agency level.",
    stage: "pilot",
    note: "Report export in pilot · Agency-level tracking planned",
    icon: <path d="M5 19V11M10 19V6M15 19v-9M20 19V4" />,
  },
];

export const pilotScope = [
  ["Bulk recording upload", "Upload a batch of recordings from your existing system. No integration work needed to start."],
  ["Hindi and English transcription", "Timestamped transcripts of calls in Hindi and English."],
  ["One regional language", "A third language selected with you, based on where your calls are made."],
  ["Timestamped findings", "Potential issues marked against the exact passage, for a reviewer to check."],
  ["Human review", "Your reviewers confirm or dismiss each finding, with notes, alongside the audio."],
  ["Report export", "Export reviewed findings for internal reporting and complaint files."],
];


export type Faq = { q: string; a: string };

/** Buyer questions shown on /saakshi/. Keep answers in line with what is actually built. */
export const saakshiFaqs: Faq[] = [
  {
    q: "How do recordings get into Saakshi?",
    a: "For a pilot, you upload recordings in bulk, exported from the calling or dialler system your teams already use. No integration work is needed to start. Direct integrations with calling systems are planned, and we will confirm your file formats and how recordings are named during pilot scoping.",
  },
  {
    q: "Which languages does Saakshi transcribe?",
    a: "The proposed pilot covers Hindi and English, plus one regional language selected with you based on where your calls are made. Transcripts are timestamped so every line can be matched to the original audio.",
  },
  {
    q: "What kinds of potential issues does Saakshi look for?",
    a: "Saakshi is being designed to mark passages that may indicate threats, abusive language or disclosure of a debt to third parties, and calls placed outside the calling hours you configure. What gets marked is guided by your own conduct policy, agreed during scoping.",
  },
  {
    q: "Does Saakshi decide whether a call broke the rules?",
    a: "No. Every finding is a potential issue for a person to check. A reviewer reads the passage, listens to the original audio and confirms or dismisses the finding with a note. Saakshi does not certify compliance with any regulation and has not been approved or endorsed by any regulator.",
  },
  {
    q: "How are findings reviewed and recorded?",
    a: "Each finding opens at its timestamp with the surrounding transcript and the audio. The reviewer's decision and note are stored with the finding, and reviewed findings can be exported as reports for internal review or a complaint file.",
  },
  {
    q: "Can we find the call behind a borrower complaint?",
    a: "Yes, that is a core workflow. Search by loan reference to see the recorded calls on that account, open any marked passages and review them alongside the audio.",
  },
  {
    q: "Is Saakshi available to buy today?",
    a: "Not yet. Saakshi is in development and we are talking to lenders, NBFCs and collection agencies about early pilots. There is no general availability or published pricing at this stage.",
  },
];

/** Questions about setting up a pilot, shown on /saakshi/pilot/. */
export const pilotFaqs: Faq[] = [
  {
    q: "Who is a pilot for?",
    a: "Collection agencies, lenders and NBFCs that record recovery calls and want a more consistent way to review them. Telephony and collections-software providers interested in integrations can also get in touch.",
  },
  {
    q: "How is a pilot set up?",
    a: "We start with a scoping conversation about your call volumes, languages, calling system and conduct policy. We then agree a sample of recordings, the languages to cover, who will review findings and how long the pilot will run.",
  },
  {
    q: "What do we need to provide?",
    a: "A representative sample of recordings, your conduct policy and calling-hour rules, one or more people to review findings, and regular feedback during the pilot.",
  },
  {
    q: "How is our data handled during a pilot?",
    a: "Data handling, storage and retention for recordings are discussed and agreed with you as part of scoping, before any recordings are shared.",
  },
  {
    q: "What does a pilot cost?",
    a: "Pilot terms are agreed individually with each pilot customer. Contact us to discuss your situation.",
  },
];
