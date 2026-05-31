import { adminCardClass } from "@/lib/admin/admin-ui";

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
    <div
      className={`border-dashed px-5 py-8 text-center ${adminCardClass}`}
    >
      <h2 className="text-base font-semibold text-tb-text">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-tb-text-muted">
        {description}
      </p>
      {waitNote ? (
        <p className="mx-auto mt-3 max-w-lg rounded-md bg-slate-50 px-3 py-2 text-xs text-tb-text-muted">
          {waitNote}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
