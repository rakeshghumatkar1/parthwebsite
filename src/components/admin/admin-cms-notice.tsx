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
      : "border-tb-blue/20 bg-tb-blue/5 text-tb-text";

  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${styles}`}
      role="note"
    >
      {children ?? (
        <>
          <p className="font-medium">Public website not connected yet</p>
          <p className="mt-1 text-sm opacity-90">
            You can explore forms and save drafts, but do not add final launch
            content until the Home page and public pages are connected.
          </p>
        </>
      )}
    </div>
  );
}
