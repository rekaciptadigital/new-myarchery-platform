"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserRole } from "../../core/models";
import { AuthLayout } from "./layouts/AuthLayout";
import { useAuthService } from "../../core/hooks/useAuthService";

export function AdminLoginAdapter() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuthService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const credentials = { 
        email, 
        password,
        role: UserRole.ADMIN 
      };
      
      await login(credentials);
      // Redirect to admin dashboard on successful login
      router.push("/admin/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat login. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Admin-specific benefits
  const adminBenefits = [
    "Kelola seluruh data platform secara terpusat",
    "Monitor aktivitas pengguna dan event",
    "Akses ke pengaturan dan konfigurasi sistem",
    "Verifikasi dan approval event dari organizer"
  ];

  const loginFormContent = (
    <div className="max-w-md w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h2>
        <p className="text-gray-600">Masuk ke akun admin untuk mengelola platform MyArchery</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Link href="/forgot-password" className="text-purple-600 hover:text-purple-800">
                Forgot your password?
              </Link>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Sign in as Admin"}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <Link href="/" className="text-purple-600 text-sm font-medium hover:text-purple-800">
              Kembali ke halaman utama
            </Link>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <AuthLayout
      title="Admin Control Panel"
      subtitle="Akses ke manajemen platform MyArchery secara keseluruhan dengan tools dan fitur khusus admin."
      benefits={adminBenefits}
      accentColor="purple"
    >
      {loginFormContent}
    </AuthLayout>
  );
}
