import type { Milestone } from "@/db/schema/milestones";
import type { FormState } from "@/lib/admin/shared/validation";

export type MilestoneFormValues = {
  title: string;
  eventLabel: string;
  eventDate: string;
  shortDescription: string;
  category: string;
  relatedProjectId: string;
  relatedProofId: string;
  relatedVideoId: string;
  displayOrder: string;
  featuredOnAbout: boolean;
  featuredOnHome: boolean;
  published: boolean;
  hidden: boolean;
};

export type MilestoneFormErrors = Partial<Record<keyof MilestoneFormValues, string>> & { form?: string };
export type MilestoneFormState = FormState<MilestoneFormValues, MilestoneFormErrors>;

export type MilestoneListFilters = {
  q?: string;
  category?: string;
  published?: string;
  hidden?: string;
  featuredOnHome?: string;
  featuredOnAbout?: string;
  relatedProjectId?: string;
};

export type { Milestone };
