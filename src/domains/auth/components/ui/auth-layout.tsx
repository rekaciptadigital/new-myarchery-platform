// Domain: Auth - Auth Layout Component
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/components/ui/auth-layout.tsx

import React from 'react';
import Image from 'next/image';
import { AuthLayoutProps } from '../../types';

/**
 * Layout komponen untuk halaman authentication
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showLogo = true,
  backgroundContent,
}) => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column: Form */}
      <div className="flex items-center justify-center p-8 md:p-12 bg-white order-2 md:order-1">
        <div className="w-full max-w-md">
          {showLogo && (
            <div className="flex justify-start mb-8">
              <Image 
                src="/logos/logo_myarchery.svg" 
                alt="MyArchery Logo" 
                width={180} 
                height={50} 
                priority
              />
            </div>
          )}
          
          <div className="space-y-1 mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-sm text-slate-600">{subtitle}</p>
            )}
          </div>

          {children}
        </div>
      </div>
      
      {/* Right Column: Background Content */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 p-12 relative overflow-hidden order-1 md:order-2">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/4 -translate-y-1/4 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 opacity-50"></div>
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 1px, transparent 1px, transparent 10px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Content */}
        <div className="text-white text-center z-10 max-w-md">
          {backgroundContent || (
            <>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Platform Manajemen <span className="text-yellow-400">Panahan</span> Terbaik
              </h1>
              <p className="text-lg lg:text-xl opacity-90">
                Kelola event, kompetisi, dan klub panahan Anda dengan mudah. Solusi all-in-one untuk komunitas panahan.
              </p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-50">Manajemen event dan kompetisi lengkap</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-50">Sistem scoring digital real-time</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-50">Administrasi dan pendaftaran online</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
