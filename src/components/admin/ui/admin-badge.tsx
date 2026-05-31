type AdminBadgeVariant = "success" | "warning" | "neutral" | "info" | "draft";

const variantClasses: Record<AdminBadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80",
  warning: "bg-amber-50 text-amber-800 ring-1 ring-amber-200/80",
  neutral: "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80",
  info: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/80",
  draft: "bg-slate-50 text-slate-500 ring-1 ring-slate-200/80",
};

type AdminBadgeProps = {
  children: React.ReactNode;
  variant?: AdminBadgeVariant;
};

export function AdminBadge({ children, variant = "neutral" }: AdminBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
