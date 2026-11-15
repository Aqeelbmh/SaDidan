import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/Admin/LoginForm";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in — Content Studio",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return <LoginForm />;
}
