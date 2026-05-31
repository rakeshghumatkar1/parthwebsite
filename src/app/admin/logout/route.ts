import { redirect } from "next/navigation";
import { logoutCurrentSession } from "@/lib/admin/auth";

export async function GET() {
  await logoutCurrentSession();
  redirect("/admin/login");
}
