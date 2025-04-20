"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginFormProps {
  isAdminLogin?: boolean;
}

export function LoginForm({ isAdminLogin = false }: Readonly<LoginFormProps>) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      } else {
        // Organizer login akan diarahkan ke dashboard organizer
        router.push("/dashboard");
      }
    } catch {
      setError("Login gagal. Periksa email dan password Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="flex justify-center pt-6">
        <Image 
          src="/logos/logo_myarchery.svg" 
          alt="MyArchery Logo" 
          width={180} 
          height={50} 
          priority
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">
          {isAdminLogin ? "Admin Login" : "Login"}
        </CardTitle>
        <CardDescription>
          {isAdminLogin 
            ? "Masuk sebagai administrator MyArchery" 
            : "Masuk ke akun organizer MyArchery Anda"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 bg-transparent border-none cursor-pointer p-0"
                onClick={() => window.alert("Fitur reset password akan segera tersedia")}
              >
                Lupa password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Login"}
          </Button>
        </form>
      </CardContent>
      {!isAdminLogin && (
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Belum punya akun?{" "}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 bg-transparent border-none cursor-pointer p-0"
              onClick={() => router.push("/register")}
            >
              Daftar sekarang
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Atau login dengan</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              Apple
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}