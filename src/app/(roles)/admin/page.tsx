import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // Redirect from /admin to /admin/login
  redirect("/admin/login");
}
