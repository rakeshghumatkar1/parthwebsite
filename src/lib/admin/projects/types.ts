import type { Project } from "@/db/schema/projects";

export type ProjectFormValues = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  projectType: string;
  projectPhase: string;
  status: string;
  industry: string;
  domains: string[];
  techStack: string;
  problemSolved: string;
  whatItDoes: string;
  parthRole: string;
  githubUrl: string;
  demoUrl: string;
  videoUrl: string;
  pdfDownloadUrl: string;
  displayOrder: string;
  featuredOnHome: boolean;
  featuredOnAbout: boolean;
  published: boolean;
  hidden: boolean;
  archived: boolean;
};

export type ProjectFormErrors = Partial<
  Record<Exclude<keyof ProjectFormValues, "domains">, string>
> & {
  domains?: string;
  form?: string;
};

export type ProjectFormState = {
  errors?: ProjectFormErrors;
  values?: ProjectFormValues;
  success?: boolean;
  /** Bumps on failed save so defaultValue/defaultChecked fields remount with submitted values. */
  resetKey?: number;
};

export type ProjectListFilters = {
  q?: string;
  status?: string;
  projectType?: string;
  published?: string;
  hidden?: string;
  archived?: string;
  featuredOnHome?: string;
  featuredOnAbout?: string;
};

export type { Project };
