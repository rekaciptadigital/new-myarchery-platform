import AdminSidebar from "@/components/navigation/admin/AdminSidebar";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}