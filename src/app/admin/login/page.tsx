import { redirect } from "next/navigation";
import { LoginAdminForm } from "@/components/admin/login-admin-form";
import { getCurrentAdmin, isSetupAvailable } from "@/lib/admin/auth";

export const metadata = {
  title: "Admin login | Parth Admin",
};

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) {
    redirect("/admin");
  }

  const setupAvailable = await isSetupAvailable();

  return <LoginAdminForm setupAvailable={setupAvailable} />;
}
