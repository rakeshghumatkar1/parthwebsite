type EarlyWorkArchiveSummaryProps = {
  totalCount: number;
};

export function EarlyWorkArchiveSummary({ totalCount }: EarlyWorkArchiveSummaryProps) {
  const label = totalCount === 1 ? "documented early project" : "documented early projects";

  return (
    <p className="text-sm font-medium text-tb-text">
      {totalCount} {label} · 2016–2018 · Ages 12–14
    </p>
  );
}
