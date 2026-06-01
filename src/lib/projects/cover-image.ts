export const PROJECT_COVER_FIT_VALUES = ["contain", "cover", "auto"] as const;
export type ProjectCoverFit = (typeof PROJECT_COVER_FIT_VALUES)[number];

export const PROJECT_COVER_POSITION_VALUES = [
  "center",
  "top",
  "bottom",
  "left",
  "right",
] as const;
export type ProjectCoverPosition = (typeof PROJECT_COVER_POSITION_VALUES)[number];

export const PROJECT_COVER_FIT_OPTIONS: Array<{
  value: ProjectCoverFit;
  label: string;
  helper: string;
}> = [
  {
    value: "contain",
    label: "Contain",
    helper: "Safest for screenshots and full photos.",
  },
  {
    value: "cover",
    label: "Cover",
    helper: "Fills the frame, may crop edges.",
  },
  {
    value: "auto",
    label: "Auto",
    helper: "Use the default project display behavior.",
  },
];

export const PROJECT_COVER_POSITION_OPTIONS: Array<{
  value: ProjectCoverPosition;
  label: string;
}> = [
  { value: "center", label: "Center" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

export function normalizeProjectCoverFit(
  value: string | null | undefined,
): ProjectCoverFit {
  if (value === "cover") return "cover";
  if (value === "auto") return "auto";
  return "contain";
}

export function normalizeProjectCoverPosition(
  value: string | null | undefined,
): ProjectCoverPosition {
  if (
    value === "top" ||
    value === "bottom" ||
    value === "left" ||
    value === "right"
  ) {
    return value;
  }
  return "center";
}

export function projectCoverObjectFitClass(
  fit: string | null | undefined,
): string {
  const normalized = normalizeProjectCoverFit(fit);
  return normalized === "cover" ? "object-cover" : "object-contain";
}

export function projectCoverObjectPosition(
  position: string | null | undefined,
): string {
  const normalized = normalizeProjectCoverPosition(position);
  switch (normalized) {
    case "top":
      return "top";
    case "bottom":
      return "bottom";
    case "left":
      return "left";
    case "right":
      return "right";
    default:
      return "center";
  }
}
