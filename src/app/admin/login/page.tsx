'use client';

import { AuthLayout, LoginForm } from '@/domains/auth';

/**
 * Admin Login Page
 * Login khusus untuk System Administrators
 */
export default function AdminLoginPage() {
  return (
    <AuthLayout
      title="Administrator Access"
      subtitle="System Administration Portal"
      backgroundContent={
        <div className="text-white text-center z-10 max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Kelola Platform <span className="text-red-400">MyArchery</span>
          </h1>
          <p className="text-lg lg:text-xl opacity-90">
            Portal administrator untuk mengelola seluruh ekosistem platform MyArchery dengan kontrol penuh.
          </p>
          <div className="space-y-4 mt-8">
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-red-50">Kontrol penuh sistem</span>
            </div>
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-red-50">Manajemen user dan role</span>
            </div>
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-red-50">Monitoring dan analytics</span>
            </div>
          </div>
        </div>
      }
    >
      <LoginForm userRole="admin" />
      
      {/* Role Navigation */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600 mb-3">
          Login dengan role berbeda:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="/organizer/login"
            className="text-center py-2 px-4 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
          >
            Organizer
          </a>
          <a
            href="/customer/login"
            className="text-center py-2 px-4 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
          >
            Peserta
          </a>
        </div>
      </div>

      {/* Admin Note */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">
          Akses terbatas untuk administrator yang berwenang
        </p>
      </div>
    </AuthLayout>
  );
}
