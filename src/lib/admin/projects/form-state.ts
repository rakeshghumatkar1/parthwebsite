import type { ProjectFormErrors, ProjectFormState, ProjectFormValues } from "./types";

export const VALIDATION_SUMMARY =
  "Please fix the highlighted fields and try again.";

export function buildProjectFormFailureState(
  errors: ProjectFormErrors,
  values: ProjectFormValues,
): ProjectFormState {
  const fieldErrorKeys = Object.keys(errors).filter((key) => key !== "form");
  const normalizedErrors: ProjectFormErrors = { ...errors };

  if (fieldErrorKeys.length > 0 && !normalizedErrors.form) {
    normalizedErrors.form = VALIDATION_SUMMARY;
  }

  return {
    errors: normalizedErrors,
    values,
    resetKey: Date.now(),
  };
}
