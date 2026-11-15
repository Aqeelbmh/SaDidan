import { redirect } from "next/navigation";
import AdminShell from "@/components/Admin/AdminShell";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
