import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Image 
            src="/logos/logo_myarchery.svg"
            alt="MyArchery Logo"
            width={180}
            height={50}
            priority
          />
        </div>
        
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-sm">
          <div className="rounded-full bg-red-100 p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 mb-6">Anda tidak memiliki izin untuk mengakses halaman ini. Silakan masuk dengan akun yang memiliki izin yang sesuai.</p>
          
          <div className="space-y-3 w-full">
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Link href="/">
                Kembali ke Halaman Utama
              </Link>
            </Button>
            
            <div className="flex space-x-2">
              <Button
                asChild
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                variant="secondary"
              >
                <Link href="/admin/login">
                  Admin Login
                </Link>
              </Button>
              
              <Button
                asChild
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                variant="secondary"
              >
                <Link href="/organizer/login">
                  Organizer Login
                </Link>
              </Button>
              
              <Button
                asChild
                className="flex-1 bg-green-600 hover:bg-green-700"
                variant="secondary"
              >
                <Link href="/customer/login">
                  Atlet Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}