type AdminEmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function AdminEmptyState({
  title,
  description,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-tb-navy-border bg-tb-surface px-6 py-10 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-tb-text-muted">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
