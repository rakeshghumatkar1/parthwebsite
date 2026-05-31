import type { Video } from "@/db/schema/videos";
import type { FormState } from "@/lib/admin/shared/validation";

export type VideoFormValues = {
  title: string;
  slug: string;
  youtubeUrl: string;
  category: string;
  eventDate: string;
  relatedProjectId: string;
  thumbnailMediaId: string;
  shortDescription: string;
  displayOrder: string;
  featuredOnHome: boolean;
  featuredOnAbout: boolean;
  published: boolean;
  hidden: boolean;
};

export type VideoFormErrors = Partial<Record<keyof VideoFormValues, string>> & { form?: string };
export type VideoFormState = FormState<VideoFormValues, VideoFormErrors>;

export type VideoListFilters = {
  q?: string;
  category?: string;
  published?: string;
  hidden?: string;
  featuredOnHome?: string;
  featuredOnAbout?: string;
  relatedProjectId?: string;
};

export type { Video };
