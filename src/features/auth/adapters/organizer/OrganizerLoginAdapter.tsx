"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthService, LoginCredentials } from "../../core/services/auth-service";

export function OrganizerLoginAdapter() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const credentials: LoginCredentials = { email, password };
      const response = await AuthService.login(credentials);
      
      if (response.error) {
        setError(response.error.message);
      } else {
        // Check if user has organizer role
        const userRole = response.user?.user_metadata?.role;
        if (userRole !== 'organizer') {
          setError("Access denied. This login is for organizers only.");
          await AuthService.logout();
        } else {
          // Redirect to organizer dashboard
          router.push("/organizer/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow grid md:grid-cols-2 items-stretch w-full">
        {/* Left column with login form */}
        <div className="flex items-center justify-center bg-white p-8 md:p-12 order-2 md:order-1">
          <div className="max-w-md w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Organizer Login</h2>
              <p className="text-gray-600">Enter your credentials to access your organizer account</p>
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                  >
                    {isLoading ? "Logging in..." : "Sign in as Organizer"}
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <span className="text-gray-600 text-sm">Need to register as an organizer? </span>
                  <Link href="/organizer/register" className="text-blue-600 text-sm font-medium hover:text-blue-800">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right column with blue background and content */}
        <div className="bg-blue-600 text-white p-8 md:p-12 flex items-center justify-center order-1 md:order-2">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Platform Manajemen <span className="text-yellow-400">Panahan</span> Terbaik
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Kelola event, kompetisi, dan klub panahan Anda dengan mudah. Solusi all-in-one untuk penyelenggara kompetisi panahan.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-blue-50">Buat dan kelola event dengan mudah</span>
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
                <span className="text-blue-50">Kelola pendaftaran dan pembayaran otomatis</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
