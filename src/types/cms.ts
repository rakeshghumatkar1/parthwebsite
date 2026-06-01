/** CMS record shapes for later phases — no data layer in Phase 1–2 */

export type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  techStack: string[];
  coverImageUrl?: string;
  coverImageAlt?: string;
  coverImageFit?: string;
  coverImagePosition?: string;
  githubUrl?: string;
  demoUrl?: string;
};

export type ProofRecord = {
  id: string;
  title: string;
  slug: string;
  proofType: string;
  shortDescription?: string;
  externalUrl?: string;
};

export type UpdateRecord = {
  id: string;
  title: string;
  slug: string;
  shortSummary: string;
  date: string;
};
