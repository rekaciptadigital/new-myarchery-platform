'use client';

import { AuthLayout, LoginForm } from '@/domains/auth';

/**
 * Organizer Login Page
 * Login khusus untuk Event Organizers
 */
export default function OrganizerLoginPage() {
  return (
    <AuthLayout
      title="Sign In To Your Organizer Account"
      subtitle="Welcome back, Event Organizer"
      backgroundContent={
        <div className="text-white text-center z-10 max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Kelola Event <span className="text-yellow-400">Panahan</span> Profesional
          </h1>
          <p className="text-lg lg:text-xl opacity-90">
            Platform lengkap untuk mengelola turnamen, kompetisi, dan event panahan dengan sistem scoring digital real-time.
          </p>
          <div className="space-y-4 mt-8">
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-blue-50">Sistem manajemen turnamen lengkap</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-blue-50">Analytics dan laporan mendalam</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-blue-50">Support prioritas 24/7</span>
            </div>
          </div>
        </div>
      }
    >
      <LoginForm userRole="organizer" />
      
      {/* Role Navigation */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600 mb-3">
          Login dengan role berbeda:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="/customer/login"
            className="text-center py-2 px-4 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
          >
            Peserta
          </a>
          <a
            href="/admin/login"
            className="text-center py-2 px-4 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
          >
            Admin
          </a>
        </div>
      </div>

      {/* Register Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-600">
          Belum punya akun organizer?{' '}
          <a 
            href="/organizer/register"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Daftar di sini
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
