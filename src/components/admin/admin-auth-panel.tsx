type AdminAuthPanelProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AdminAuthPanel({
  title,
  subtitle,
  children,
}: AdminAuthPanelProps) {
  return (
    <div className="admin-auth flex min-h-screen items-center justify-center bg-tb-surface-muted px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-tb-navy-border bg-tb-surface p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wide text-tb-text-muted">
            Parth Admin
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
};

export function AdminField({
  id,
  label,
  error,
  children,
  hint,
  required = false,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? (
          <span className="text-red-600" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p className="text-xs text-tb-text-muted">{hint}</p>
      ) : null}
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function AdminFormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
      role="alert"
    >
      {message}
    </div>
  );
}

export function adminInputClassName(hasError?: boolean) {
  return [
    "block w-full rounded-md border bg-tb-surface px-3 py-2 text-sm",
    "focus:outline-none focus:ring-2 focus:ring-tb-blue/30",
    hasError ? "border-red-400" : "border-tb-navy-border",
  ].join(" ");
}
