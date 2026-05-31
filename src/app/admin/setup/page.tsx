import { redirect } from "next/navigation";
import { SetupAdminForm } from "@/components/admin/setup-admin-form";
import { SetupCompletedPanel } from "@/components/admin/setup-completed-panel";
import { getCurrentAdmin, isSetupAvailable } from "@/lib/admin/auth";

export const metadata = {
  title: "First admin setup | Parth Admin",
};

export default async function AdminSetupPage() {
  const admin = await getCurrentAdmin();
  if (admin) {
    redirect("/admin");
  }

  const setupAvailable = await isSetupAvailable();
  if (!setupAvailable) {
    return <SetupCompletedPanel />;
  }

  return <SetupAdminForm />;
}
