"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column: Registration Form */}
      <div className="flex items-center justify-center p-8 md:p-12 bg-white">
        <RegisterForm />
      </div>

      {/* Right Column: Decoration */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/4 -translate-y-1/4 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 opacity-50"></div>
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 1px, transparent 1px, transparent 10px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
        <div className="text-white text-center z-10 max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Join MyArchery Platform</h1>
          <p className="text-lg lg:text-xl opacity-90">
            Manage your archery events, participants, and scores all in one place. Sign up now to get started!
          </p>
        </div>
      </div>
    </div>
  );
}