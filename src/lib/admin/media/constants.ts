export const MEDIA_ROLE_OPTIONS = [
  { value: "hero_atmospheric", label: "Hero / Atmospheric" },
  { value: "section_artwork", label: "Section Artwork" },
  { value: "card_thumbnail", label: "Card Thumbnail" },
  { value: "video_thumbnail", label: "Video Thumbnail" },
  { value: "proof_document", label: "Proof Document" },
  { value: "gallery_image", label: "Gallery Image" },
  { value: "detail_image", label: "Detail Image" },
  { value: "profile_photo", label: "Profile Photo" },
  { value: "lifestyle_photo", label: "Lifestyle Photo" },
  { value: "og_social", label: "OG / Social" },
] as const;

export const MEDIA_DISPLAY_MODE_OPTIONS = [
  { value: "bleed", label: "Bleed" },
  { value: "cover", label: "Cover" },
  { value: "contain", label: "Contain" },
  { value: "natural", label: "Natural" },
  { value: "thumbnail", label: "Thumbnail" },
  { value: "background_decorative", label: "Background Decorative" },
] as const;

export const MEDIA_ROLE_VALUES = MEDIA_ROLE_OPTIONS.map((o) => o.value);
export const MEDIA_DISPLAY_MODE_VALUES = MEDIA_DISPLAY_MODE_OPTIONS.map((o) => o.value);
