import type { ProjectRecord, ProofRecord, UpdateRecord } from "@/types/cms";

/** CMS featured records — empty until Proof/Projects/Updates CMS exists */
export const featuredProjects: ProjectRecord[] = [];
export const featuredProofItems: ProofRecord[] = [];
export const featuredUpdates: UpdateRecord[] = [];

/** Static launch projects (replace with Projects CMS later) */
export const launchProjects: ProjectRecord[] = [
  {
    id: "noctis",
    title: "Noctis",
    slug: "noctis",
    shortDescription: "Privacy-first local AI journaling app.",
    techStack: ["Python", "Ollama", "Local AI", "Desktop"],
  },
  {
    id: "nonprofit-platform",
    title: "Nonprofit Platform",
    slug: "nonprofit-platform",
    shortDescription: "IRS Form 990 data platform with SEO-ready pages.",
    techStack: ["Python", "PostgreSQL", "Astro", "Docker"],
  },
  {
    id: "instagram-ai-news",
    title: "Instagram AI News Generator",
    slug: "instagram-ai-news-generator",
    shortDescription:
      "AI news to Instagram posts with images and captions.",
    techStack: ["GPT-4o", "DALL-E 3", "Puppeteer", "APIs"],
  },
  {
    id: "youtube-shorts",
    title: "YouTube Shorts Generator",
    slug: "youtube-shorts-generator",
    shortDescription: "AI pipeline to create short videos automatically.",
    techStack: ["GPT-4", "ElevenLabs", "FFmpeg", "Whisper"],
  },
  {
    id: "seo-snapshot",
    title: "SEO Snapshot",
    slug: "seo-snapshot",
    shortDescription: "AI-powered SEO advisory reports for businesses.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
  },
];

export type ReviewTrailCard = {
  id: string;
  title: string;
  description: string;
};

/** Project evidence blocks — homepage, not Proof Library */
export const homeReviewTrailCards: ReviewTrailCard[] = [
  {
    id: "repository-trail",
    title: "Repository Trail",
    description:
      "Code repositories and software builds linked from project records where available.",
  },
  {
    id: "build-record",
    title: "Build Record",
    description:
      "Project walkthroughs and technical notes attached to individual project pages.",
  },
  {
    id: "build-documentation",
    title: "Build Documentation",
    description:
      "Readmes, architecture notes, and explanations published alongside each build.",
  },
  {
    id: "data-systems",
    title: "Data & Systems",
    description:
      "Dashboards, data platforms, and working applications shown as project outcomes.",
  },
];

export const homeCapabilityCards = [
  {
    title: "Internal Tools",
    description:
      "Custom tools for business processes, forms, users, data, admin workflows, product-style utilities, and repeated internal tasks.",
  },
  {
    title: "AI-Assisted Workflow Applications",
    description:
      "Applications where AI supports analysis, summarization, classification, reporting, research, content creation, media workflows, or decision support inside a defined workflow.",
  },
  {
    title: "Automation Systems",
    description:
      "Workflows that connect APIs, databases, AI models, files, forms, dashboards, and business operations — including content and media pipelines.",
  },
  {
    title: "Data and Reporting Platforms",
    description:
      "Systems that collect, structure, analyze, display, and publish data through dashboards, reports, SaaS-style interfaces, static pages, or searchable views.",
  },
] as const;

export type ProofCategoryCard = {
  id: string;
  title: string;
  description: string;
};

/** Proof Library category cards — not individual proof records */
export const launchProofCategories: ProofCategoryCard[] = [
  {
    id: "github",
    title: "GitHub Repositories",
    description:
      "Code repositories, tools, and software builds available for review.",
  },
  {
    id: "youtube",
    title: "YouTube Demos",
    description:
      "Video walkthroughs showing how selected projects were built or tested.",
  },
  {
    id: "screenshots",
    title: "Project Screenshots",
    description:
      "Interface and system captures that show how applications look in use.",
  },
  {
    id: "technical-notes",
    title: "Technical Notes",
    description:
      "Architecture references, build notes, and project explanations.",
  },
  {
    id: "downloads",
    title: "Downloads and PDFs",
    description:
      "Documents and downloadable material related to selected projects.",
  },
  {
    id: "recognition",
    title: "Recognition / Milestones",
    description:
      "Presentations, recognitions, and milestone material from the project trail.",
  },
];

export type FounderCredibilityPoint = {
  title: string;
  description: string;
};

export const founderCredibilityPoints: FounderCredibilityPoint[] = [
  {
    title: "Independent technical learning",
    description:
      "Self-led building across hardware, software, automation, and AI workflow experiments.",
  },
  {
    title: "Project-led development",
    description:
      "Learning through working builds, debugging, testing, documentation, and improvement.",
  },
  {
    title: "Public technical history",
    description:
      "GitHub repositories, demos, presentations, and documented build material.",
  },
  {
    title: "Current software ownership",
    description:
      "Full-project ownership across software, AI workflow, automation, and data-system builds.",
  },
];

export const founderDeliveryNote =
  "Review, QA, documentation, deployment discipline, and delivery oversight can be added through Think Big when needed.";

export const processSteps = [
  {
    step: "01",
    title: "Understand the workflow",
    description:
      "Clarify users, inputs, outputs, and current manual steps.",
  },
  {
    step: "02",
    title: "Define the system",
    description:
      "Map screens, data, logic, integrations, and technical structure.",
  },
  {
    step: "03",
    title: "Build the first version",
    description:
      "Create a working version with the required software, data, or automation layer.",
  },
  {
    step: "04",
    title: "Test and improve",
    description:
      "Debug, simplify, refine, and improve based on actual use.",
  },
  {
    step: "05",
    title: "Review for serious delivery",
    description:
      "Add review, documentation, security checks, and delivery oversight where needed.",
  },
] as const;

export const softwareFirstFlow = [
  "Problem",
  "Software Logic",
  "Data",
  "AI Layer",
  "Workflow Output",
] as const;

export type FooterLink = {
  label: string;
  href?: string;
};

export type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

/** Footer v2 — only href when route/anchor is safe */
export const launchFooterGroups: FooterLinkGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About Parth", href: "#technical-founder" },
      { label: "About Think Big" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Systems",
    links: [
      { label: "AI Systems", href: "#what-we-build" },
      { label: "Automation", href: "#what-we-build" },
      { label: "Data Platforms", href: "#what-we-build" },
      { label: "Internal Tools", href: "#what-we-build" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub Repositories" },
      { label: "YouTube Videos" },
      { label: "Downloads" },
      { label: "Proof Library", href: "#proof-library" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "All Projects", href: "#selected-project-builds" },
      { label: "Build Notes" },
      { label: "Demos" },
      { label: "Roadmap" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Discuss a Software Use Case", href: "#contact" },
      { label: "Email" },
      { label: "GitHub" },
      { label: "YouTube" },
    ],
  },
];
