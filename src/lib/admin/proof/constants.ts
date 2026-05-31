export const PROOF_TYPE_OPTIONS = [
  { value: "github", label: "GitHub" },
  { value: "youtube", label: "YouTube" },
  { value: "screenshot", label: "Screenshot" },
  { value: "pdf", label: "PDF" },
  { value: "recognition", label: "Recognition" },
  { value: "presentation", label: "Presentation" },
  { value: "technical_note", label: "Technical Note" },
  { value: "certificate", label: "Certificate" },
  { value: "milestone_proof", label: "Milestone Proof" },
  { value: "build_document", label: "Build Document" },
] as const;

export const PROOF_TYPE_VALUES = PROOF_TYPE_OPTIONS.map((o) => o.value);

export const PROOF_TYPE_LABELS = Object.fromEntries(
  PROOF_TYPE_OPTIONS.map((o) => [o.value, o.label]),
);
