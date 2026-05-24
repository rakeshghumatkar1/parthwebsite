import type { ProjectRecord, ProofRecord, UpdateRecord } from "@/types/cms";

/** Phase 1–2: no CMS data. Sections hide when arrays are empty. */
export const featuredProjects: ProjectRecord[] = [];
export const featuredProofItems: ProofRecord[] = [];
export const featuredUpdates: UpdateRecord[] = [];

export const proofSignals = [
  "10+ years of self-led technical building exposure",
  "GitHub repositories and project history",
  "YouTube demos from early hardware and automation projects",
  "2018 Nelkinda Tech Kids Meetup presentation",
  "Global Day of Coderetreat 2018 recognition",
  "Current full-project ownership across selected software builds",
] as const;

export const whatWeBuildItems = [
  {
    title: "Internal Tools",
    description:
      "Custom tools for handling business processes, forms, users, data, admin workflows, requests, and repeatable tasks.",
  },
  {
    title: "AI-Assisted Workflow Applications",
    description:
      "Applications where AI supports analysis, summarization, classification, reporting, content creation, research, or decision support inside a defined workflow.",
  },
  {
    title: "Automation Systems",
    description:
      "Workflows that connect APIs, databases, AI models, files, media tools, forms, dashboards, and business operations.",
  },
  {
    title: "Data and Reporting Platforms",
    description:
      "Systems that collect, structure, analyze, display, and publish data through dashboards, reports, static pages, or searchable interfaces.",
  },
  {
    title: "SaaS-Style Tools",
    description:
      "Product-style tools such as report generators, booking systems, lead-capture tools, user portals, and business utilities.",
  },
  {
    title: "Content and Media Automation",
    description:
      "Pipelines that help create, process, format, caption, render, or publish content using AI, APIs, templates, and media tools.",
  },
] as const;

export const founderCredibilityPoints = [
  "Self-built credibility",
  "Project-led learning",
  "GitHub and YouTube proof",
  "Public presentation and recognition",
  "Current full-project ownership",
  "Review and delivery structure through Think Big",
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Understand the workflow",
    description:
      "Clarify what the system needs to support, who will use it, and what manual work or confusion it should reduce.",
  },
  {
    step: "02",
    title: "Define the system",
    description:
      "Turn the idea into requirements, screens, flows, data needs, AI use cases, and technical structure.",
  },
  {
    step: "03",
    title: "Build the first version",
    description:
      "Create the working version with the required software, AI, API, database, automation, or interface layer.",
  },
  {
    step: "04",
    title: "Test and improve",
    description:
      "Debug, simplify, improve flows, and adjust the system based on actual use and technical behavior.",
  },
  {
    step: "05",
    title: "Review for serious delivery",
    description:
      "For client-critical systems, Think Big adds review, QA, documentation, security checks, deployment discipline, and delivery oversight.",
  },
] as const;

export const softwareFirstFlow = [
  "Problem",
  "Software structure",
  "Data flow",
  "AI layer",
  "Workflow output",
] as const;

export const footerLinkGroups = [
  {
    title: "Systems",
    links: [
      { label: "What We Build", href: "#what-we-build" },
      { label: "How the Work Happens", href: "#how-the-work-happens" },
    ],
  },
  {
    title: "Proof",
    links: [
      { label: "Proof Before Claims", href: "#proof-before-claims" },
      { label: "Technical Founder", href: "#technical-founder" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Think Big Digital Solutions", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
] as const;
