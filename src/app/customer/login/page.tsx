'use client';

import { AuthLayout, LoginForm } from '@/domains/auth';

/**
 * Customer Login Page
 * Login khusus untuk Peserta/Athletes
 */
export default function CustomerLoginPage() {
  return (
    <AuthLayout
      title="Sign In To Your Customer Account"
      subtitle="Welcome back, Archer"
      backgroundContent={
        <div className="text-white text-center z-10 max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Berkompetisi di <span className="text-green-400">Turnamen</span> Panahan
          </h1>
          <p className="text-lg lg:text-xl opacity-90">
            Daftar turnamen, pantau skor real-time, dan tingkatkan skill panahan Anda bersama ribuan archer lainnya.
          </p>
          <div className="space-y-4 mt-8">
            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-50">Daftar turnamen dengan mudah</span>
            </div>
            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-50">Pantau skor secara real-time</span>
            </div>
            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-50">Progress tracking personal</span>
            </div>
          </div>
        </div>
      }
    >
      <LoginForm userRole="customer" />
      
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
          Belum punya akun peserta?{' '}
          <a 
            href="/customer/register"
            className="font-medium text-green-600 hover:text-green-500 transition-colors"
          >
            Daftar di sini
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
