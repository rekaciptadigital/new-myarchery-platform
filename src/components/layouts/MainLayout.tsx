import Sidebar from "@/components/navigation/Sidebar";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}