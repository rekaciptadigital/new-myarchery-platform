import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow grid md:grid-cols-2 items-stretch w-full">
        {/* Left column with login form */}
        <div className="flex items-center justify-center bg-white p-8 md:p-12 order-2 md:order-1">
          <div className="max-w-md w-full">
            <div className="mb-4">
              <Link href="/" className="text-slate-600 hover:text-slate-800 flex items-center text-sm font-medium">
                <ArrowLeft size={16} className="mr-1" />
                Kembali ke halaman utama
              </Link>
            </div>
            <LoginForm isAdminLogin={true} />
          </div>
        </div>
        
        {/* Right column with purple background for admin branding */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 md:p-12 flex items-center justify-center order-1 md:order-2">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Admin <span className="text-purple-300">Control</span> Panel
            </h1>
            <p className="text-lg text-purple-100 mb-8">
              Akses ke manajemen platform MyArchery secara keseluruhan dengan tools dan fitur khusus admin.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-purple-400 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-purple-50">Kelola seluruh data platform secara terpusat</span>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-400 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-purple-50">Monitor aktivitas pengguna dan event</span>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-400 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-purple-50">Verifikasi dan approval event dari organizer</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
