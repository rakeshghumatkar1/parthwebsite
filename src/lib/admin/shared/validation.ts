const URL_PATTERN =
  /^(https?:\/\/)[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/i;

export function validateOptionalUrl(
  value: string,
  label: string,
): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (!["http:", "https:"].includes(url.protocol)) {
      return `${label} must start with http:// or https://.`;
    }
    if (!URL_PATTERN.test(trimmed)) {
      return `${label} is not a valid URL.`;
    }
    return null;
  } catch {
    return `${label} is not a valid URL.`;
  }
}

export function validateRequiredUrl(
  value: string,
  label: string,
): string | null {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required.`;
  return validateOptionalUrl(trimmed, label);
}

export function validateDisplayOrder(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!/^-?\d+$/.test(trimmed)) {
    return "Display order must be a whole number.";
  }
  return null;
}

export function validateOptionalDate(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return "Use a valid date (YYYY-MM-DD).";
  }
  const date = new Date(`${trimmed}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "Use a valid date (YYYY-MM-DD).";
  }
  return null;
}

export function validateOptionalPositiveInt(
  value: string,
  label: string,
): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!/^\d+$/.test(trimmed)) {
    return `${label} must be a whole number.`;
  }
  return null;
}

export function parseDisplayOrder(value: string, fallback = 100): number {
  const trimmed = value.trim();
  return trimmed ? Number(trimmed) : fallback;
}

export function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed || null;
}

export function emptyUuidToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed || null;
}

export function checkboxValue(formData: FormData, name: string): boolean {
  return formData.get(name) === "on";
}

export function formatAdminDate(value: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export function formatAdminDateLong(value: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(value);
}

export type FormState<TValues, TErrors extends Record<string, string | undefined>> = {
  errors?: TErrors & { form?: string };
  values?: TValues;
};
