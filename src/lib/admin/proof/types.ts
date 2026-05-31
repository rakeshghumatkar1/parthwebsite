import type { ProofItem } from "@/db/schema/proof-items";
import type { FormState } from "@/lib/admin/shared/validation";

export type ProofFormValues = {
  title: string;
  slug: string;
  proofType: string;
  shortDescription: string;
  whatThisProves: string;
  fileUrl: string;
  externalUrl: string;
  eventDate: string;
  relatedProjectId: string;
  relatedMilestoneId: string;
  mediaId: string;
  displayOrder: string;
  featuredOnHome: boolean;
  featuredOnAbout: boolean;
  published: boolean;
  hidden: boolean;
};

export type ProofFormErrors = Partial<Record<keyof ProofFormValues, string>> & {
  form?: string;
};

export type ProofFormState = FormState<ProofFormValues, ProofFormErrors>;

export type ProofListFilters = {
  q?: string;
  proofType?: string;
  published?: string;
  hidden?: string;
  featuredOnHome?: string;
  featuredOnAbout?: string;
  relatedProjectId?: string;
};

export type { ProofItem };
