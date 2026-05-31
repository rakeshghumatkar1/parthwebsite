/** Minimum public records before showing full search/filter panels on listing pages. */
export const PUBLIC_FILTER_MIN_ITEMS = 6;

export function hasActivePublicFilters(
  params: Record<string, string | undefined>,
  keys: readonly string[],
): boolean {
  return keys.some((key) => {
    const value = params[key];
    return typeof value === "string" && value.trim().length > 0;
  });
}

export function shouldShowPublicFilters(
  totalCount: number,
  hasActiveFilters: boolean,
): boolean {
  return totalCount >= PUBLIC_FILTER_MIN_ITEMS || hasActiveFilters;
}
