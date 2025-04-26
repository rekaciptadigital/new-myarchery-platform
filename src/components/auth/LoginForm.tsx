"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface LoginFormProps {
  isAdminLogin?: boolean;
  isCustomerLogin?: boolean;
}

export function LoginForm({ isAdminLogin = false, isCustomerLogin = false }: Readonly<LoginFormProps>) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Set button color based on login type
  const getButtonClass = () => {
    if (isAdminLogin) return "bg-purple-600 hover:bg-purple-700";
    if (isCustomerLogin) return "bg-green-600 hover:bg-green-700";
    return "bg-blue-600 hover:bg-blue-700"; // default for organizer
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulasi login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect berdasarkan tipe login
      if (isAdminLogin) {
        // Admin login akan diarahkan ke dashboard admin
        router.push("/admin/dashboard");
      } else if (isCustomerLogin) {
        // Customer login akan diarahkan ke dashboard customer
        router.push("/customer/dashboard");
      } else {
        // Organizer login akan diarahkan ke dashboard organizer
        router.push("/organizer/dashboard");
      }
    } catch {
      setError("Login gagal. Periksa email dan password Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get the appropriate login title
  const getLoginTitle = () => {
    if (isAdminLogin) return "Login Administrator";
    if (isCustomerLogin) return "Login Atlet & Peserta";
    return "Login Penyelenggara";
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="flex justify-start mb-8">
        <Image 
          src="/logos/logo_myarchery.svg" 
          alt="MyArchery Logo" 
          width={180} 
          height={50} 
          priority
        />
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-slate-600">Selamat datang kembali</p>
        <h1 className="text-2xl font-bold">
          {getLoginTitle()}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="Masukkan email atau username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 h-12 px-4 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 h-12 px-4 rounded-md"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" className="border-slate-300" />
            <Label htmlFor="remember-me" className="font-normal text-slate-600">Ingat saya</Label>
          </div>
          <button
            type="button"
            className="font-medium text-blue-600 hover:text-blue-800 bg-transparent border-none cursor-pointer p-0"
            onClick={() => window.alert("Fitur reset password akan segera tersedia")}
          >
            Lupa password?
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-500 pt-1">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className={`w-full text-white ${getButtonClass()} font-bold h-12 rounded-md text-sm`}
          disabled={isLoading}
        >
          {isLoading ? "MEMPROSES..." : "MASUK"}
        </Button>
      </form>
      
      {isCustomerLogin && (
        <div className="text-center text-sm text-slate-600">
          <p>Belum memiliki akun? <Link href="/register/customer" className="text-green-600 hover:text-green-800 font-medium">Daftar di sini</Link></p>
        </div>
      )}
    </div>
  );
}