export const VIDEO_CATEGORY_OPTIONS = [
  { value: "demo", label: "Demo" },
  { value: "walkthrough", label: "Walkthrough" },
  { value: "presentation", label: "Presentation" },
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
  { value: "other", label: "Other" },
] as const;

export const VIDEO_CATEGORY_VALUES = VIDEO_CATEGORY_OPTIONS.map((o) => o.value);
export const VIDEO_CATEGORY_LABELS = Object.fromEntries(
  VIDEO_CATEGORY_OPTIONS.map((o) => [o.value, o.label]),
);
