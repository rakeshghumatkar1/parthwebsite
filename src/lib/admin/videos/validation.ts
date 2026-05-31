import { normalizeSlug, validateSlugField } from "@/lib/admin/shared/slug";
import { checkboxValue, emptyToNull, emptyUuidToNull, parseDisplayOrder, validateDisplayOrder, validateOptionalDate, validateRequiredUrl } from "@/lib/admin/shared/validation";
import { VIDEO_CATEGORY_VALUES } from "./constants";
import type { VideoFormErrors, VideoFormValues } from "./types";

export function formDataToVideoValues(formData: FormData): VideoFormValues {
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    youtubeUrl: String(formData.get("youtubeUrl") ?? ""),
    category: String(formData.get("category") ?? ""),
    eventDate: String(formData.get("eventDate") ?? ""),
    relatedProjectId: String(formData.get("relatedProjectId") ?? ""),
    thumbnailMediaId: String(formData.get("thumbnailMediaId") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    displayOrder: String(formData.get("displayOrder") ?? "100"),
    featuredOnHome: checkboxValue(formData, "featuredOnHome"),
    featuredOnAbout: checkboxValue(formData, "featuredOnAbout"),
    published: checkboxValue(formData, "published"),
    hidden: checkboxValue(formData, "hidden"),
  };
}

export function videoToFormValues(video: {
  title: string; slug: string; youtubeUrl: string; category: string | null; eventDate: string | null;
  relatedProjectId: string | null; thumbnailMediaId: string | null; shortDescription: string | null;
  displayOrder: number; featuredOnHome: boolean; featuredOnAbout: boolean; published: boolean; hidden: boolean;
}): VideoFormValues {
  return {
    title: video.title, slug: video.slug, youtubeUrl: video.youtubeUrl,
    category: video.category ?? "", eventDate: video.eventDate ?? "",
    relatedProjectId: video.relatedProjectId ?? "", thumbnailMediaId: video.thumbnailMediaId ?? "",
    shortDescription: video.shortDescription ?? "", displayOrder: String(video.displayOrder),
    featuredOnHome: video.featuredOnHome, featuredOnAbout: video.featuredOnAbout,
    published: video.published, hidden: video.hidden,
  };
}

export function validateVideoForm(values: VideoFormValues): VideoFormErrors {
  const errors: VideoFormErrors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  const slugError = validateSlugField(normalizeSlug(values.slug));
  if (slugError) errors.slug = slugError;
  const youtubeError = validateRequiredUrl(values.youtubeUrl, "YouTube URL");
  if (youtubeError) errors.youtubeUrl = youtubeError;
  if (values.category && !VIDEO_CATEGORY_VALUES.includes(values.category as never)) {
    errors.category = "Select a valid category.";
  }
  const displayOrderError = validateDisplayOrder(values.displayOrder);
  if (displayOrderError) errors.displayOrder = displayOrderError;
  const eventDateError = validateOptionalDate(values.eventDate);
  if (eventDateError) errors.eventDate = eventDateError;
  return errors;
}

export function videoValuesToDbPayload(values: VideoFormValues) {
  return {
    title: values.title.trim(),
    slug: normalizeSlug(values.slug),
    youtubeUrl: values.youtubeUrl.trim(),
    category: emptyToNull(values.category) as (typeof VIDEO_CATEGORY_VALUES)[number] | null,
    eventDate: emptyToNull(values.eventDate),
    relatedProjectId: emptyUuidToNull(values.relatedProjectId),
    thumbnailMediaId: emptyUuidToNull(values.thumbnailMediaId),
    shortDescription: emptyToNull(values.shortDescription),
    displayOrder: parseDisplayOrder(values.displayOrder),
    featuredOnHome: values.featuredOnHome,
    featuredOnAbout: values.featuredOnAbout,
    published: values.published,
    hidden: values.hidden,
  };
}
