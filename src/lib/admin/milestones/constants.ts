export const MILESTONE_CATEGORY_OPTIONS = [
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
  { value: "recognition", label: "Recognition" },
  { value: "presentation", label: "Presentation" },
  { value: "other", label: "Other" },
] as const;

export const MILESTONE_CATEGORY_VALUES = MILESTONE_CATEGORY_OPTIONS.map((o) => o.value);
export const MILESTONE_CATEGORY_LABELS = Object.fromEntries(
  MILESTONE_CATEGORY_OPTIONS.map((o) => [o.value, o.label]),
);
