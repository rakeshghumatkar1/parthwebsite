import type { ReactNode } from "react";

type PublicListingFiltersShellProps = {
  children: ReactNode;
};

/** Compact wrapper for public listing filter forms when enough content exists. */
export function PublicListingFiltersShell({
  children,
}: PublicListingFiltersShellProps) {
  return (
    <div className="mt-8 space-y-3">
      <p className="text-sm font-medium text-tb-text">Refine results</p>
      {children}
    </div>
  );
}
