import {
  DOMAIN_VALUES,
  INDUSTRY_VALUES,
  PROJECT_PHASE_VALUES,
  PROJECT_STATUS_VALUES,
  PROJECT_TYPE_VALUES,
  RESERVED_SLUGS,
} from "./constants";
import {
  PROJECT_COVER_FIT_VALUES,
  PROJECT_COVER_POSITION_VALUES,
} from "@/lib/projects/cover-image";
import { normalizeSlug } from "./slug";
import type { ProjectFormErrors, ProjectFormValues } from "./types";

const URL_PATTERN =
  /^(https?:\/\/)[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/i;

function validateOptionalUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!/^https?:\/\//i.test(trimmed)) {
    return "Use the full URL, starting with https://";
  }
  try {
    const url = new URL(trimmed);
    if (!["http:", "https:"].includes(url.protocol)) {
      return "Use the full URL, starting with https://";
    }
    if (!URL_PATTERN.test(trimmed)) {
      return "Use the full URL, starting with https://";
    }
    return null;
  } catch {
    return "Use the full URL, starting with https://";
  }
}

function validateCoverImageUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("/")) return null;
  return validateOptionalUrl(trimmed);
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
    projectPhase: String(formData.get("projectPhase") ?? "current_work"),
    status: String(formData.get("status") ?? ""),
    industry: String(formData.get("industry") ?? "general_business"),
    domains: formData.getAll("domains").map(String).filter(Boolean),
    techStack: String(formData.get("techStack") ?? ""),
    problemSolved: String(formData.get("problemSolved") ?? ""),
    whatItDoes: String(formData.get("whatItDoes") ?? ""),
    parthRole: String(formData.get("parthRole") ?? ""),
    githubUrl: String(formData.get("githubUrl") ?? ""),
    demoUrl: String(formData.get("demoUrl") ?? ""),
    videoUrl: String(formData.get("videoUrl") ?? ""),
    pdfDownloadUrl: String(formData.get("pdfDownloadUrl") ?? ""),
    coverImageUrl: String(formData.get("coverImageUrl") ?? ""),
    coverImageAlt: String(formData.get("coverImageAlt") ?? ""),
    coverImageFit: String(formData.get("coverImageFit") ?? "contain"),
    coverImagePosition: String(formData.get("coverImagePosition") ?? "center"),
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
  projectPhase: string;
  status: string;
  industry: string;
  domains: string[];
  techStack: string[] | null;
  problemSolved: string | null;
  whatItDoes: string | null;
  parthRole: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  videoUrl: string | null;
  pdfDownloadUrl: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  coverImageFit: string;
  coverImagePosition: string;
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
    projectPhase: project.projectPhase,
    status: project.status,
    industry: project.industry,
    domains: project.domains ?? [],
    techStack: techStackToInput(project.techStack),
    problemSolved: project.problemSolved ?? "",
    whatItDoes: project.whatItDoes ?? "",
    parthRole: project.parthRole ?? "",
    githubUrl: project.githubUrl ?? "",
    demoUrl: project.demoUrl ?? "",
    videoUrl: project.videoUrl ?? "",
    pdfDownloadUrl: project.pdfDownloadUrl ?? "",
    coverImageUrl: project.coverImageUrl ?? "",
    coverImageAlt: project.coverImageAlt ?? "",
    coverImageFit: project.coverImageFit || "contain",
    coverImagePosition: project.coverImagePosition || "center",
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

  if (!values.projectPhase) {
    errors.projectPhase = "Project phase is required.";
  } else if (!PROJECT_PHASE_VALUES.includes(values.projectPhase as never)) {
    errors.projectPhase = "Select a valid project phase.";
  }

  if (!values.status) {
    errors.status = "Status is required.";
  } else if (!PROJECT_STATUS_VALUES.includes(values.status as never)) {
    errors.status = "Select a valid status.";
  }

  if (!values.industry) {
    errors.industry = "Industry is required.";
  } else if (!INDUSTRY_VALUES.includes(values.industry as never)) {
    errors.industry = "Select a valid industry.";
  }

  if (!values.domains.length) {
    errors.domains = "Select at least one domain.";
  } else {
    const invalidDomains = values.domains.filter(
      (domain) => !DOMAIN_VALUES.includes(domain as never),
    );
    if (invalidDomains.length > 0) {
      errors.domains = "Select valid domain options only.";
    }
  }

  const displayOrder = values.displayOrder.trim();
  if (displayOrder && !/^-?\d+$/.test(displayOrder)) {
    errors.displayOrder = "Display order must be a whole number.";
  }

  const urlFields: Array<keyof ProjectFormValues> = [
    "githubUrl",
    "demoUrl",
    "videoUrl",
    "pdfDownloadUrl",
  ];
  if (
    values.coverImageFit &&
    !PROJECT_COVER_FIT_VALUES.includes(values.coverImageFit as never)
  ) {
    errors.coverImageFit = "Select a valid image fit.";
  }

  if (
    values.coverImagePosition &&
    !PROJECT_COVER_POSITION_VALUES.includes(values.coverImagePosition as never)
  ) {
    errors.coverImagePosition = "Select a valid image position.";
  }


  for (const field of urlFields) {
    const message = validateOptionalUrl(String(values[field]));
    if (message) {
      errors[field] = message;
    }
  }

  const coverUrlError = validateCoverImageUrl(values.coverImageUrl);
  if (coverUrlError) {
    errors.coverImageUrl = coverUrlError;
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
    if (!values.projectPhase) {
      errors.projectPhase = "Project phase is required to publish.";
    }
    if (!values.status) errors.status = "Status is required to publish.";
    if (!values.industry) errors.industry = "Industry is required to publish.";
    if (!values.domains.length) {
      errors.domains = "Select at least one domain to publish.";
    }
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
    projectPhase: values.projectPhase as (typeof PROJECT_PHASE_VALUES)[number],
    status: values.status as (typeof PROJECT_STATUS_VALUES)[number],
    industry: values.industry as (typeof INDUSTRY_VALUES)[number],
    domains: values.domains as (typeof DOMAIN_VALUES)[number][],
    techStack: techStack.length > 0 ? techStack : null,
    problemSolved: values.problemSolved.trim() || null,
    whatItDoes: values.whatItDoes.trim() || null,
    parthRole: values.parthRole.trim() || null,
    githubUrl: values.githubUrl.trim() || null,
    demoUrl: values.demoUrl.trim() || null,
    videoUrl: values.videoUrl.trim() || null,
    pdfDownloadUrl: values.pdfDownloadUrl.trim() || null,
    coverImageUrl: values.coverImageUrl.trim() || null,
    coverImageAlt: values.coverImageAlt.trim() || null,
    coverImageFit: PROJECT_COVER_FIT_VALUES.includes(values.coverImageFit as never)
      ? values.coverImageFit
      : "contain",
    coverImagePosition: PROJECT_COVER_POSITION_VALUES.includes(
      values.coverImagePosition as never,
    )
      ? values.coverImagePosition
      : "center",
    displayOrder: displayOrder ? Number(displayOrder) : 100,
    featuredOnHome: values.featuredOnHome,
    featuredOnAbout: values.featuredOnAbout,
    published: values.published,
    hidden: values.hidden,
    archived: values.archived,
  };
}
