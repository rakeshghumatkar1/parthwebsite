type AdminEmptyStateProps = {
  title: string;
  description: string;
  waitNote?: string;
  action?: React.ReactNode;
};

export function AdminEmptyState({
  title,
  description,
  waitNote,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-tb-navy-border bg-tb-surface px-6 py-10 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-tb-text-muted">
        {description}
      </p>
      {waitNote ? (
        <p className="mx-auto mt-3 max-w-lg rounded-md bg-tb-surface-muted px-3 py-2 text-sm text-tb-text-muted">
          {waitNote}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
