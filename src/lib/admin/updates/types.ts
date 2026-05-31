import type { Update } from "@/db/schema/updates";
import type { FormState } from "@/lib/admin/shared/validation";

export type UpdateFormValues = {
  title: string;
  slug: string;
  updateType: string;
  shortSummary: string;
  body: string;
  relatedProjectId: string;
  relatedVideoId: string;
  relatedProofId: string;
  eventDate: string;
  displayOrder: string;
  featuredOnHome: boolean;
  published: boolean;
  hidden: boolean;
};

export type UpdateFormErrors = Partial<Record<keyof UpdateFormValues, string>> & { form?: string };
export type UpdateFormState = FormState<UpdateFormValues, UpdateFormErrors>;

export type UpdateListFilters = {
  q?: string;
  updateType?: string;
  published?: string;
  hidden?: string;
  featuredOnHome?: string;
  relatedProjectId?: string;
};

export type { Update };
