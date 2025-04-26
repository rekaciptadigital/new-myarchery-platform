import { AdminLoginAdapter } from "@/features/auth/adapters/admin/AdminLoginAdapter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | MyArchery Platform",
  description: "Login portal for MyArchery platform administrators",
};

export default function AdminLoginPage() {
  return <AdminLoginAdapter />;
}
