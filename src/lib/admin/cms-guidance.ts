export const CMS_CONTENT_CAUTION =
  "Do not add final content until the Home page and public pages are connected. You can explore the admin and save drafts, but wait for approval before entering launch content.";

export const BLOB_PREFIX_RULE =
  "All future Parth uploads must use the parthwebsite/ prefix in the shared Blob store. Never edit or delete files from other websites in that store.";

export const WORKFLOW_STEPS = [
  { step: 1, label: "Projects", note: "Start here when content entry begins." },
  { step: 2, label: "Media Library", note: "Add approved file URLs only when files are ready." },
  { step: 3, label: "Proof Library", note: "Add evidence linked to projects." },
  { step: 4, label: "Videos", note: "Add approved YouTube or demo URLs." },
  { step: 5, label: "Timeline / Milestones", note: "Add story and progress markers." },
  { step: 6, label: "Updates / Build Notes", note: "Add progress notes." },
  { step: 7, label: "Home page connection", note: "Not built yet." },
  { step: 8, label: "Public pages", note: "Not built yet." },
  { step: 9, label: "Blob uploads", note: "Not built yet — URL-only for now." },
  { step: 10, label: "Final content entry", note: "Enter launch content after steps 7–9." },
] as const;

export type ModuleKey =
  | "projects"
  | "proof"
  | "videos"
  | "milestones"
  | "updates"
  | "media";

export type ModuleGuidance = {
  title: string;
  subtitle: string;
  status: "available" | "url-only";
  statusNote: string;
  listHelpTitle: string;
  listHelpBullets: string[];
  listNextAction: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyWaitNote: string;
  whereAppears: string[];
  formIntro: string;
};

export const MODULE_GUIDANCE: Record<ModuleKey, ModuleGuidance> = {
  projects: {
    title: "Projects",
    subtitle: "Portfolio projects for future Home, Projects, About, and detail pages.",
    status: "available",
    statusNote: "Public page not connected yet",
    listHelpTitle: "What projects are for",
    listHelpBullets: [
      "A project is a portfolio piece Parth built — software, automation, AI, or tools.",
      "Later appears on: Home, Projects page, Project detail page, About Parth.",
      "Required: title, slug, short description, project type, status.",
      "Published = ready for public. Hidden = excluded even if published. Archived = older work on file.",
      "Use only approved real links — do not invent GitHub, demo, or download URLs.",
    ],
    listNextAction: "Start with Projects when content entry begins. Drafts are fine for learning the form.",
    emptyTitle: "No projects yet",
    emptyDescription: "No project records exist yet.",
    emptyWaitNote: "Wait until public pages are connected unless practicing with drafts.",
    whereAppears: ["Home featured cards", "Projects page", "Project detail pages", "About Parth highlights"],
    formIntro: "Required fields must be filled to save. Use drafts until content is approved.",
  },
  proof: {
    title: "Proof Library",
    subtitle: "Evidence supporting project credibility.",
    status: "available",
    statusNote: "Public page not connected yet",
    listHelpTitle: "What proof items are for",
    listHelpBullets: [
      "Evidence: GitHub repos, screenshots, PDFs, recognitions, presentations, technical notes.",
      "Later appears on: Proof Library, Project details, Home, About.",
      "Required: title, slug, proof type. URLs optional for drafts.",
      "Related project = this proof belongs to that project. No file upload yet.",
    ],
    listNextAction: "Add proof after projects and approved links/files are ready.",
    emptyTitle: "No proof items yet",
    emptyDescription: "Proof supports credibility on future Proof and Project pages.",
    emptyWaitNote: "Add proof only after projects and approved proof links are ready.",
    whereAppears: ["Proof Library page", "Project detail pages", "Home proof section", "About credibility trail"],
    formIntro: "Choose the proof type that matches the evidence. Paste approved URLs only.",
  },
  videos: {
    title: "Videos",
    subtitle: "Approved YouTube or demo walkthrough URLs.",
    status: "available",
    statusNote: "Public page not connected yet",
    listHelpTitle: "What videos are for",
    listHelpBullets: [
      "Approved YouTube or demo links — not uploaded files.",
      "YouTube URL is required. Related project is recommended.",
      "Later appears on: Videos page, Project details, Home, About.",
      "Do not add fake YouTube links.",
    ],
    listNextAction: "Add videos when approved YouTube or demo URLs exist.",
    emptyTitle: "No videos yet",
    emptyDescription: "Videos will show demos on future public pages.",
    emptyWaitNote: "Add videos only when approved URLs are available.",
    whereAppears: ["Videos page", "Project detail pages", "Home optional section", "About demo trail"],
    formIntro: "Paste the full YouTube or demo URL.",
  },
  milestones: {
    title: "Timeline / Milestones",
    subtitle: "Story moments showing learning, building, and progress.",
    status: "available",
    statusNote: "Public page not connected yet",
    listHelpTitle: "What milestones are for",
    listHelpBullets: [
      "Timeline story: experiments, builds, recognitions, presentations.",
      "Later appears on: About Parth timeline, possibly Home.",
      "Required: title. Event label = free text like “2019”. Event date = optional YYYY-MM-DD.",
      "Related project/proof/video are optional cross-links.",
    ],
    listNextAction: "Add milestones when the timeline story is ready to document.",
    emptyTitle: "No milestones yet",
    emptyDescription: "Milestones build the About Parth timeline.",
    emptyWaitNote: "Add milestones when projects and story context are ready.",
    whereAppears: ["About Parth timeline", "Home optional highlights", "Cross-links from proof/videos"],
    formIntro: "Title is required. Other fields place the milestone in the story.",
  },
  updates: {
    title: "Updates / Build Notes",
    subtitle: "Notes about launches, improvements, and technical progress.",
    status: "available",
    statusNote: "Public page not connected yet",
    listHelpTitle: "What updates are for",
    listHelpBullets: [
      "Progress notes: new features, repos, videos, proof, status changes.",
      "Later appears on: Updates page, Home build notes, Project details.",
      "Required: title, slug, update type. Short summary = preview; body = full note.",
      "Do not add random blog posts.",
    ],
    listNextAction: "Add updates when real project progress exists.",
    emptyTitle: "No updates yet",
    emptyDescription: "Build notes will appear on future Updates and Home sections.",
    emptyWaitNote: "Add updates for real progress — not placeholder content.",
    whereAppears: ["Updates page", "Home build notes strip", "Project detail pages"],
    formIntro: "Short summary for previews; body for the full note.",
  },
  media: {
    title: "Media Library",
    subtitle: "URL metadata and Blob uploads for images, PDFs, thumbnails, and documents.",
    status: "available",
    statusNote: "URL + Blob upload under parthwebsite/",
    listHelpTitle: "What Media Library is for",
    listHelpBullets: [
      "Add media by pasting an approved public URL or uploading to Blob.",
      "Uploads go to the shared thinkbigdigital-blob store under parthwebsite/ only.",
      "Required for uploads: file + folder. Alt text helps accessibility for images.",
      "Image role = how the file is used. Display mode = visual treatment.",
      "Never upload private/sensitive files. PDFs are for public downloads/proof only.",
      "Other websites' Blob files are never listed or touched. Delete is not available yet.",
    ],
    listNextAction: "Add media URLs or upload public assets when approved.",
    emptyTitle: "No media records yet",
    emptyDescription: "Media holds URLs used across the CMS.",
    emptyWaitNote: "Use Add by URL or Upload to Blob when approved files are ready.",
    whereAppears: ["Project covers and galleries", "Proof attachments", "Video thumbnails", "Public pages when linked from CMS"],
    formIntro: "Paste an approved file URL or switch to Upload to Blob for parthwebsite/ storage.",
  },
};

export const FIELD_HINTS = {
  title: "Name shown on cards and headings. Required.",
  slug: "URL-safe ID (lowercase, numbers, hyphens). Auto-filled from title. Must be unique.",
  shortDescription: "One or two sentences for cards. Required for projects.",
  fullDescription: "Optional longer text for detail pages.",
  projectType: "Category: internal tool, AI system, automation, data platform, SaaS, content/media, other.",
  status: "Lifecycle: active, experiment, archived, or concept.",
  proofType: "Evidence type: GitHub, screenshot, PDF, recognition, presentation, etc.",
  updateType: "What changed: new project, repo, video, proof, feature, technical note, status change.",
  category: "Groups similar items (demo, walkthrough, hardware, software, etc.).",
  published: "Ready for future public pages. Leave unchecked for drafts.",
  hidden: "Hides from public even if published.",
  archived: "Marks older project work without deleting.",
  featuredOnHome: "Prepares for future Home featured sections. Lower display order = first.",
  featuredOnAbout: "Prepares for future About Parth featured sections.",
  displayOrder: "List order — lower numbers appear first (e.g. 1 before 100).",
  techStack: "Comma-separated tags, e.g. Python, PostgreSQL, Next.js",
  relatedProjectId: "Links this record to a portfolio project.",
  relatedProofId: "Links to a proof library item.",
  relatedVideoId: "Links to a video record.",
  relatedMilestoneId: "Links to a timeline milestone.",
  fileUrl: "Direct file link (PDF, image). Approved public URL only. No upload yet.",
  externalUrl: "External page link (GitHub, YouTube, article). Approved URL only.",
  youtubeUrl: "Full YouTube or demo URL. Required for videos. No fake links.",
  eventDate: "Optional date YYYY-MM-DD for sorting.",
  eventLabel: "Optional label like “2019” or “Robotics phase”.",
  shortSummary: "Brief preview for update cards.",
  body: "Full update text for detail views.",
  whatThisProves: "What credibility this proof provides.",
  problemSolved: "What problem the project addresses.",
  whatItDoes: "Plain summary of what the project does.",
  parthRole: "Parth's role or ownership.",
  githubUrl: "Approved GitHub repo URL only.",
  demoUrl: "Approved live demo URL only.",
  videoUrl: "Optional related video link.",
  pdfDownloadUrl: "Approved PDF download URL only.",
  altText: "Image description for screen readers. Recommended for images.",
  caption: "Optional visible caption with the media.",
  imageRole: "Usage: thumbnail, gallery, proof document, hero, profile, etc.",
  imageDisplayMode: "Visual treatment: cover, contain, thumbnail, bleed, etc.",
  imageFocalPoint: "Optional crop focal point (center, top, face).",
  fileName: "Friendly name in admin lists.",
  fileType: "Type label: image, pdf, document, video.",
  mimeType: "MIME type, e.g. image/png.",
  fileSizeBytes: "Optional size in bytes.",
  mobileFileUrl: "Optional mobile-optimized URL.",
  ogImageUrl: "Optional social share image (1200×630).",
  uploadedBy: "Who added this record.",
  mediaId: "Link to Media Library instead of raw URL.",
  thumbnailMediaId: "Media Library item for video thumbnail.",
} as const;

export const DASHBOARD_MODULES = [
  { key: "projects" as const, href: "/admin/projects" },
  { key: "media" as const, href: "/admin/media" },
  { key: "proof" as const, href: "/admin/proof" },
  { key: "videos" as const, href: "/admin/videos" },
  { key: "milestones" as const, href: "/admin/milestones" },
  { key: "updates" as const, href: "/admin/updates" },
];

export function moduleStatusLabel(status: ModuleGuidance["status"]): string {
  return status === "url-only" ? "URL-only" : "Available";
}
