import type { ProjectFormErrors } from "./types";

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function isSchemaOutOfDateError(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("project_phase") ||
    normalized.includes('type "project_phase"') ||
    normalized.includes('column "project_phase"') ||
    normalized.includes("invalid input value for enum project_phase")
  );
}

function isDuplicateSlugError(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    (normalized.includes("unique") || normalized.includes("duplicate key")) &&
    (normalized.includes("slug") || normalized.includes("projects_slug"))
  );
}

export function mapDatabaseErrorToFormErrors(error: unknown): ProjectFormErrors {
  const message = extractErrorMessage(error).toLowerCase();

  if (isSchemaOutOfDateError(message)) {
    return {
      form: "The project could not be saved because the database schema appears out of date. Apply the latest migration and try again.",
    };
  }

  if (isDuplicateSlugError(message)) {
    return {
      slug: "This slug is already used. Choose a different slug.",
    };
  }

  return {
    form: "The project could not be saved because of a database error. Please try again or check whether the latest database migration has been applied.",
  };
}
