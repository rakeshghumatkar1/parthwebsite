export const UPDATE_TYPE_OPTIONS = [
  { value: "new_project", label: "New Project" },
  { value: "new_repo", label: "New Repo" },
  { value: "new_video", label: "New Video" },
  { value: "new_proof", label: "New Proof" },
  { value: "new_feature", label: "New Feature" },
  { value: "technical_note", label: "Technical Note" },
  { value: "status_change", label: "Status Change" },
] as const;

export const UPDATE_TYPE_VALUES = UPDATE_TYPE_OPTIONS.map((o) => o.value);
export const UPDATE_TYPE_LABELS = Object.fromEntries(
  UPDATE_TYPE_OPTIONS.map((o) => [o.value, o.label]),
);
