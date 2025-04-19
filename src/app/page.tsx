import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">MyArchery</div>
          <Link 
            href="/register" 
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Register
          </Link>
        </div>
      </header>
      
      <main className="flex-grow grid md:grid-cols-2 items-center max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
            Platform Manajemen <span className="text-blue-600">Panahan</span> Terbaik
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Kelola event, kompetisi, dan klub panahan Anda dengan mudah. Solusi all-in-one untuk komunitas panahan.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Manajemen event dan kompetisi lengkap</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Sistem scoring digital real-time</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Administrasi dan pendaftaran online</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </main>
      
      <footer className="bg-slate-100 py-4 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2025 MyArchery. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-slate-700">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-slate-700">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-slate-700">Bantuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
