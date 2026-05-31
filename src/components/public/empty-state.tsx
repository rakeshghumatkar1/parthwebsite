import Link from "next/link";

type PublicEmptyStateProps = {
  message: string;
  className?: string;
  clearHref?: string;
  clearLabel?: string;
};

export function PublicEmptyState({
  message,
  className = "",
  clearHref,
  clearLabel = "Clear filters",
}: PublicEmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-200 bg-tb-surface-muted px-6 py-16 text-center ${className}`}
    >
      <p className="text-base text-tb-text-muted sm:text-lg">{message}</p>
      {clearHref ? (
        <Link
          href={clearHref}
          className="mt-4 inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-tb-text transition hover:bg-tb-surface-muted"
        >
          {clearLabel}
        </Link>
      ) : null}
    </div>
  );
}

type PublicListingSummaryProps = {
  totalCount: number;
  noun: string;
};

/** Shown when filters are hidden but a small number of items are listed. */
export function PublicListingSummary({ totalCount, noun }: PublicListingSummaryProps) {
  const label = totalCount === 1 ? noun : `${noun}s`;
  return (
    <p className="mt-8 text-sm text-tb-text-muted">
      Showing all {totalCount} {label}
    </p>
  );
}
