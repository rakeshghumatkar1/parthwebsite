import type { Media } from "@/db/schema/media";
import type { FormState } from "@/lib/admin/shared/validation";

export type MediaFormValues = {
  fileUrl: string;
  fileName: string;
  fileType: string;
  mimeType: string;
  fileSizeBytes: string;
  altText: string;
  caption: string;
  imageRole: string;
  imageFocalPoint: string;
  imageDisplayMode: string;
  mobileFileUrl: string;
  ogImageUrl: string;
  relatedProjectId: string;
  relatedProofId: string;
  relatedVideoId: string;
  uploadedBy: string;
};

export type MediaFormErrors = Partial<Record<keyof MediaFormValues, string>> & { form?: string };
export type MediaFormState = FormState<MediaFormValues, MediaFormErrors>;

export type MediaListFilters = {
  q?: string;
  fileType?: string;
  imageRole?: string;
  imageDisplayMode?: string;
  relatedProjectId?: string;
};

export type { Media };
