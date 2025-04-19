import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">MyArchery Admin</div>
          <Link 
            href="/" 
            className="text-slate-600 hover:text-slate-800 text-sm"
          >
            Kembali ke login organizer
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="max-w-md w-full">
          <LoginForm isAdminLogin={true} />
        </div>
      </main>
      
      <footer className="bg-slate-100 py-3 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2025 MyArchery. Admin Portal</p>
        </div>
      </footer>
    </div>
  );
}