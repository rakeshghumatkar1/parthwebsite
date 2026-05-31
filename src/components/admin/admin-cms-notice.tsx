type AdminCmsNoticeProps = {
  variant?: "caution" | "info";
  children?: React.ReactNode;
};

export function AdminCmsNotice({
  variant = "caution",
  children,
}: AdminCmsNoticeProps) {
  const styles =
    variant === "caution"
      ? "border-amber-200 bg-amber-50 text-amber-950"
      : "border-blue-100 bg-blue-50/70 text-tb-text";

  return (
    <div
      className={`rounded-lg border px-3 py-2.5 text-sm leading-relaxed ${styles}`}
      role="note"
    >
      {children ?? (
        <>
          <p className="text-xs font-semibold uppercase tracking-wide">
            Before you publish
          </p>
          <p className="mt-1 text-xs opacity-90">
            Public pages are live. Use drafts until content is approved. Only
            publish records that are ready to appear on the website.
          </p>
        </>
      )}
    </div>
  );
}
