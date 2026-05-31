import type { Project } from "@/db/schema/projects";

export type ProjectFormValues = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  projectType: string;
  status: string;
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

export type ProjectFormErrors = Partial<Record<keyof ProjectFormValues, string>> & {
  form?: string;
};

export type ProjectFormState = {
  errors?: ProjectFormErrors;
  values?: ProjectFormValues;
  success?: boolean;
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
