export const SHARED_RESERVED_SLUGS = [
  "admin",
  "api",
  "projects",
  "proof",
  "videos",
  "updates",
  "media",
  "contact",
  "about",
  "home",
] as const;

export function suggestSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateSlugField(
  slug: string,
  reserved: readonly string[] = SHARED_RESERVED_SLUGS,
): string | null {
  const normalized = normalizeSlug(slug);
  if (!normalized) return "Slug is required.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized)) {
    return "Use lowercase letters, numbers, and hyphens only.";
  }
  if (reserved.includes(normalized)) {
    return `"${normalized}" is reserved. Choose a different slug.`;
  }
  return null;
}
