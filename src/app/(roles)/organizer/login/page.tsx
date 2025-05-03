import { OrganizerLoginUI } from "@/features/auth/variants/organizer/ui";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OrganizerLoginPage() {
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
            <OrganizerLoginUI />
          </div>
        </div>
        
        {/* Right column with blue background for organizer branding */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 md:p-12 flex items-center justify-center order-1 md:order-2">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Platform Manajemen <span className="text-yellow-300">Panahan</span> Terbaik
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Kelola event, kompetisi, dan klub panahan Anda dengan mudah. Solusi all-in-one untuk penyelenggara kompetisi panahan.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-400 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-50">Buat dan kelola event dengan mudah</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-400 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-50">Sistem scoring digital real-time</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-400 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-50">Kelola pendaftaran dan pembayaran otomatis</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
