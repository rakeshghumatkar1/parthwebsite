type PublicEmptyStateProps = {
  message: string;
  className?: string;
};

export function PublicEmptyState({ message, className = "" }: PublicEmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-200 bg-tb-surface-muted px-6 py-16 text-center ${className}`}
    >
      <p className="text-base text-tb-text-muted sm:text-lg">{message}</p>
    </div>
  );
}
