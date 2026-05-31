export const PROJECT_TYPE_OPTIONS = [
  { value: "internal_tool", label: "Internal Tool" },
  { value: "ai_system", label: "AI System" },
  { value: "automation", label: "Automation" },
  { value: "data_platform", label: "Data Platform" },
  { value: "saas", label: "SaaS" },
  { value: "content_media", label: "Content / Media" },
  { value: "other", label: "Other" },
] as const;

export const PROJECT_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "experiment", label: "Experiment" },
  { value: "archived", label: "Archived" },
  { value: "concept", label: "Concept" },
] as const;

export const RESERVED_SLUGS = [
  "admin",
  "api",
  "projects",
  "proof",
  "videos",
  "updates",
  "contact",
] as const;

export const PROJECT_TYPE_VALUES = PROJECT_TYPE_OPTIONS.map((o) => o.value);
export const PROJECT_STATUS_VALUES = PROJECT_STATUS_OPTIONS.map((o) => o.value);
