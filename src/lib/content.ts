export type Service = {
  id: string;
  title: string;
  short: string;
  body: string;
  examples: string[];
};

export const services: Service[] = [
  {
    id: "ai-agents",
    title: "AI agents & workflow automation",
    short: "Agents that take multi-step work off your team's plate.",
    body:
      "We design agents that read, decide and act across your tools — with clear boundaries, approval steps where they matter, and logs of every action taken. The aim is fewer hand-offs and less copy-paste, not a black box.",
    examples: [
      "Intake triage that classifies, routes and drafts responses",
      "Back-office checks that gather data from several systems",
      "Approval flows with a human sign-off before any external action",
    ],
  },
  {
    id: "rag",
    title: "RAG & enterprise knowledge assistants",
    short: "Answers grounded in your documents, with sources attached.",
    body:
      "Retrieval-augmented assistants that search your policies, manuals and records before they answer, cite the passages they used, and respect who is allowed to see what. We evaluate them against your own questions before they go live.",
    examples: [
      "Internal policy and SOP assistants for operations teams",
      "Support assistants grounded in product documentation",
      "Permission-aware search across document stores",
    ],
  },
  {
    id: "document-intelligence",
    title: "Document intelligence, OCR & extraction",
    short: "Structured data out of scans, PDFs and forms.",
    body:
      "Pipelines that read scanned and digital documents, extract the fields you need, validate them against your rules and send low-confidence cases to a person. Built for the messy formats real organisations receive.",
    examples: [
      "Invoice, statement and application-form extraction",
      "Multilingual OCR with field-level validation",
      "Review queues for exceptions and low-confidence fields",
    ],
  },
  {
    id: "apps",
    title: "Custom web & mobile applications",
    short: "Production apps for customers, staff and partners.",
    body:
      "Web and mobile applications built with modern, maintainable stacks — from internal tools and customer portals to consumer apps, including on-device AI features like those we ship in Oppuna.",
    examples: [
      "Customer and partner portals",
      "Android and cross-platform mobile apps",
      "Internal dashboards and operations tools",
    ],
  },
  {
    id: "backend",
    title: "Backend systems & API integrations",
    short: "The plumbing that makes everything else reliable.",
    body:
      "APIs, data pipelines and integrations that connect AI features to the systems you already depend on — CRMs, ERPs, telephony, storage and identity — with authentication, monitoring and sensible failure handling.",
    examples: [
      "REST and event-driven APIs",
      "Integrations with CRMs, ERPs and calling systems",
      "Audio, document and data processing pipelines",
    ],
  },
  {
    id: "licensing",
    title: "Software licensing & product integrations",
    short: "Our products, inside your environment.",
    body:
      "License Winfin products or their components and have us integrate them with your platform, data and workflows. We scope deployment, configuration and support around how your organisation actually operates.",
    examples: [
      "Product licensing for enterprise use",
      "Integration with existing platforms and data",
      "Configuration, onboarding and support",
    ],
  },
];

export const engagements = [
  {
    title: "Project-based development",
    body:
      "A defined outcome, scope and timeline. Suited to a new product, a proof of concept or a specific integration.",
  },
  {
    title: "Ongoing engineering partnership",
    body:
      "A dedicated capacity that works alongside your team over months — building, improving and operating systems as priorities change.",
  },
  {
    title: "Product licensing",
    body:
      "Use a Winfin product or component within your organisation, with integration and support scoped to your needs.",
  },
];
