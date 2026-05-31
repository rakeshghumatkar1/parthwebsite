import { redirect } from "next/navigation";
import { logoutCurrentSession } from "@/lib/admin/auth";

/** Explicit logout only — never mutate session on GET (prefetch-safe). */
export async function POST() {
  await logoutCurrentSession();
  redirect("/admin/login");
}

/** Accidental GET (e.g. link prefetch) must not destroy the session. */
export async function GET() {
  redirect("/admin");
}
