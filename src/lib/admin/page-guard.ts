import { redirect } from "next/navigation";
import type { AdminUser } from "@/db/schema/admin-auth";
import { getCurrentAdmin } from "./auth";

export async function requireAdminSession(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
}
