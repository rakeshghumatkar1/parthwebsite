import Link from "next/link";
import { AdminFieldHint } from "./admin-form-section";
import { FIELD_HINTS } from "@/lib/admin/cms-guidance";

function checkboxClassName() {
  return "h-4 w-4 rounded border-tb-navy-border text-tb-blue focus:ring-tb-blue/30";
}

type PublishingSidebarProps = {
  values: {
    published: boolean;
    hidden: boolean;
    featuredOnHome?: boolean;
    featuredOnAbout?: boolean;
    displayOrder: string;
  };
  errors?: { displayOrder?: string };
  updatedAt?: string;
  pending: boolean;
  submitLabel: string;
  backHref: string;
  showFeaturedAbout?: boolean;
  showFeaturedHome?: boolean;
  extraNote?: string;
};

export function PublishingSidebar({
  values,
  errors,
  updatedAt,
  pending,
  submitLabel,
  backHref,
  showFeaturedAbout = true,
  showFeaturedHome = true,
  extraNote,
}: PublishingSidebarProps) {
  return (
    <section className="space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-5">
      <div>
        <h2 className="text-base font-semibold">Publishing</h2>
        <p className="mt-1 text-sm text-tb-text-muted">
          Public pages are not connected yet. These settings prepare content for
          future launch.
        </p>
        {extraNote ? (
          <p className="mt-2 text-xs text-tb-text-muted">{extraNote}</p>
        ) : null}
      </div>

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={values.published} className={checkboxClassName()} />
        <span><span className="font-medium">Published</span><AdminFieldHint>{FIELD_HINTS.published}</AdminFieldHint></span>
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="hidden" defaultChecked={values.hidden} className={checkboxClassName()} />
        <span><span className="font-medium">Hidden</span><AdminFieldHint>{FIELD_HINTS.hidden}</AdminFieldHint></span>
      </label>

      {showFeaturedHome ? (
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="featuredOnHome" defaultChecked={values.featuredOnHome} className={checkboxClassName()} />
          <span>
            <span className="font-medium">Featured on Home</span>
            <AdminFieldHint>{FIELD_HINTS.featuredOnHome}</AdminFieldHint>
          </span>
        </label>
      ) : null}

      {showFeaturedAbout ? (
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="featuredOnAbout" defaultChecked={values.featuredOnAbout} className={checkboxClassName()} />
          <span>
            <span className="font-medium">Featured on About</span>
            <AdminFieldHint>{FIELD_HINTS.featuredOnAbout}</AdminFieldHint>
          </span>
        </label>
      ) : null}

      <div className="space-y-1.5">
        <label htmlFor="displayOrder" className="block text-sm font-medium">Display order</label>
        <input id="displayOrder" name="displayOrder" type="number" defaultValue={values.displayOrder} className={`block w-full rounded-md border bg-tb-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tb-blue/30 ${errors?.displayOrder ? "border-red-400" : "border-tb-navy-border"}`} />
        <AdminFieldHint>{FIELD_HINTS.displayOrder}</AdminFieldHint>
        {errors?.displayOrder ? <p className="text-sm text-red-600">{errors.displayOrder}</p> : null}
      </div>

      {updatedAt ? <p className="text-xs text-tb-text-muted">Last updated: {updatedAt}</p> : null}

      <button type="submit" disabled={pending} className="w-full rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-tb-blue-hover disabled:opacity-60">
        {pending ? "Saving…" : submitLabel}
      </button>
      <Link href={backHref} className="block text-center text-sm font-medium text-tb-blue hover:underline">Back to list</Link>
    </section>
  );
}

export { checkboxClassName };
