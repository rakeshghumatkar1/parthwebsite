import { adminCardClass } from "@/lib/admin/admin-ui";

type AdminFormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminFormSection({
  title,
  description,
  children,
}: AdminFormSectionProps) {
  return (
    <section className={`space-y-3 p-4 ${adminCardClass}`}>
      <div>
        <h2 className="text-sm font-semibold text-tb-text">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-xs leading-relaxed text-tb-text-muted">
            {description}
          </p>
        ) : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function AdminFieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs leading-relaxed text-tb-text-muted">{children}</p>;
}

export function AdminRequiredFieldsNote() {
  return (
    <p className="text-sm text-tb-text-muted">
      Fields marked <span className="text-red-600">*</span> are required.
    </p>
  );
}

export function AdminOptionalFieldsNote() {
  return (
    <p className="text-sm text-tb-text-muted">
      You only need the required fields to create a project. Add details, tech
      stack, links, and videos when available.
    </p>
  );
}

type AdminCollapsibleFormSectionProps = {
  id: string;
  title: string;
  description?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export function AdminCollapsibleFormSection({
  id,
  title,
  description,
  open,
  onToggle,
  children,
}: AdminCollapsibleFormSectionProps) {
  return (
    <section className={`overflow-hidden ${adminCardClass}`}>
      <button
        type="button"
        id={`${id}-toggle`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 p-4 text-left transition hover:bg-slate-50/80"
      >
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-tb-text">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-xs leading-relaxed text-tb-text-muted">
              {description}
            </p>
          ) : null}
        </div>
        <span
          aria-hidden
          className={`mt-0.5 shrink-0 text-sm text-tb-text-muted transition-transform ${open ? "rotate-90" : ""}`}
        >
          ▸
        </span>
      </button>
      {open ? (
        <div
          id={`${id}-panel`}
          role="region"
          aria-labelledby={`${id}-toggle`}
          className="space-y-3 border-t border-slate-200 px-4 pb-4 pt-3"
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
