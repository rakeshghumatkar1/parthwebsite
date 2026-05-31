import {
  PROJECT_STATUS_VALUES,
  PROJECT_TYPE_VALUES,
  RESERVED_SLUGS,
} from "./constants";
import { normalizeSlug } from "./slug";
import type { ProjectFormErrors, ProjectFormValues } from "./types";

const URL_PATTERN =
  /^(https?:\/\/)[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/i;

function validateOptionalUrl(value: string, field: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (!["http:", "https:"].includes(url.protocol)) {
      return `${field} must start with http:// or https://.`;
    }
    if (!URL_PATTERN.test(trimmed)) {
      return `${field} is not a valid URL.`;
    }
    return null;
  } catch {
    return `${field} is not a valid URL.`;
  }
}

export function parseTechStack(input: string): string[] {
  return input
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function techStackToInput(tags: string[] | null | undefined): string {
  return tags?.join(", ") ?? "";
}

export function formDataToValues(formData: FormData): ProjectFormValues {
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    fullDescription: String(formData.get("fullDescription") ?? ""),
    projectType: String(formData.get("projectType") ?? ""),
    status: String(formData.get("status") ?? ""),
    techStack: String(formData.get("techStack") ?? ""),
    problemSolved: String(formData.get("problemSolved") ?? ""),
    whatItDoes: String(formData.get("whatItDoes") ?? ""),
    parthRole: String(formData.get("parthRole") ?? ""),
    githubUrl: String(formData.get("githubUrl") ?? ""),
    demoUrl: String(formData.get("demoUrl") ?? ""),
    videoUrl: String(formData.get("videoUrl") ?? ""),
    pdfDownloadUrl: String(formData.get("pdfDownloadUrl") ?? ""),
    displayOrder: String(formData.get("displayOrder") ?? "100"),
    featuredOnHome: formData.get("featuredOnHome") === "on",
    featuredOnAbout: formData.get("featuredOnAbout") === "on",
    published: formData.get("published") === "on",
    hidden: formData.get("hidden") === "on",
    archived: formData.get("archived") === "on",
  };
}

export function projectToFormValues(project: {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string | null;
  projectType: string;
  status: string;
  techStack: string[] | null;
  problemSolved: string | null;
  whatItDoes: string | null;
  parthRole: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  videoUrl: string | null;
  pdfDownloadUrl: string | null;
  displayOrder: number;
  featuredOnHome: boolean;
  featuredOnAbout: boolean;
  published: boolean;
  hidden: boolean;
  archived: boolean;
}): ProjectFormValues {
  return {
    title: project.title,
    slug: project.slug,
    shortDescription: project.shortDescription,
    fullDescription: project.fullDescription ?? "",
    projectType: project.projectType,
    status: project.status,
    techStack: techStackToInput(project.techStack),
    problemSolved: project.problemSolved ?? "",
    whatItDoes: project.whatItDoes ?? "",
    parthRole: project.parthRole ?? "",
    githubUrl: project.githubUrl ?? "",
    demoUrl: project.demoUrl ?? "",
    videoUrl: project.videoUrl ?? "",
    pdfDownloadUrl: project.pdfDownloadUrl ?? "",
    displayOrder: String(project.displayOrder),
    featuredOnHome: project.featuredOnHome,
    featuredOnAbout: project.featuredOnAbout,
    published: project.published,
    hidden: project.hidden,
    archived: project.archived,
  };
}

export function validateProjectForm(
  values: ProjectFormValues,
): ProjectFormErrors {
  const errors: ProjectFormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required.";
  }

  const slug = normalizeSlug(values.slug);
  if (!slug) {
    errors.slug = "Slug is required.";
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.slug = "Use lowercase letters, numbers, and hyphens only.";
  } else if ((RESERVED_SLUGS as readonly string[]).includes(slug)) {
    errors.slug = `"${slug}" is reserved. Choose a different slug.`;
  }

  if (!values.shortDescription.trim()) {
    errors.shortDescription = "Short description is required.";
  }

  if (!values.projectType) {
    errors.projectType = "Project type is required.";
  } else if (!PROJECT_TYPE_VALUES.includes(values.projectType as never)) {
    errors.projectType = "Select a valid project type.";
  }

  if (!values.status) {
    errors.status = "Status is required.";
  } else if (!PROJECT_STATUS_VALUES.includes(values.status as never)) {
    errors.status = "Select a valid status.";
  }

  const displayOrder = values.displayOrder.trim();
  if (displayOrder && !/^-?\d+$/.test(displayOrder)) {
    errors.displayOrder = "Display order must be a whole number.";
  }

  const urlChecks: Array<[keyof ProjectFormValues, string]> = [
    ["githubUrl", "GitHub URL"],
    ["demoUrl", "Demo URL"],
    ["videoUrl", "Video URL"],
    ["pdfDownloadUrl", "PDF download URL"],
  ];

  for (const [field, label] of urlChecks) {
    const message = validateOptionalUrl(String(values[field]), label);
    if (message) {
      errors[field] = message;
    }
  }

  if (values.published) {
    if (!values.title.trim()) errors.title = "Title is required to publish.";
    if (!slug) errors.slug = "Slug is required to publish.";
    if (!values.shortDescription.trim()) {
      errors.shortDescription = "Short description is required to publish.";
    }
    if (!values.projectType) {
      errors.projectType = "Project type is required to publish.";
    }
    if (!values.status) errors.status = "Status is required to publish.";
  }

  return errors;
}

export function valuesToDbPayload(values: ProjectFormValues) {
  const slug = normalizeSlug(values.slug);
  const displayOrder = values.displayOrder.trim();
  const techStack = parseTechStack(values.techStack);

  return {
    title: values.title.trim(),
    slug,
    shortDescription: values.shortDescription.trim(),
    fullDescription: values.fullDescription.trim() || null,
    projectType: values.projectType as (typeof PROJECT_TYPE_VALUES)[number],
    status: values.status as (typeof PROJECT_STATUS_VALUES)[number],
    techStack: techStack.length > 0 ? techStack : null,
    problemSolved: values.problemSolved.trim() || null,
    whatItDoes: values.whatItDoes.trim() || null,
    parthRole: values.parthRole.trim() || null,
    githubUrl: values.githubUrl.trim() || null,
    demoUrl: values.demoUrl.trim() || null,
    videoUrl: values.videoUrl.trim() || null,
    pdfDownloadUrl: values.pdfDownloadUrl.trim() || null,
    displayOrder: displayOrder ? Number(displayOrder) : 100,
    featuredOnHome: values.featuredOnHome,
    featuredOnAbout: values.featuredOnAbout,
    published: values.published,
    hidden: values.hidden,
    archived: values.archived,
  };
}
