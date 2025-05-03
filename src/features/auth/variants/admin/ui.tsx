"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { useAdminAuth } from "./useAdminAuth";

export function AdminLoginUI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { adminLogin, isLoading, error } = useAdminAuth();
  const [formError, setFormError] = useState("");

  // Combine errors from auth context and form validation
  const combinedError = error ?? formError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Form validation
    if (!email || !password) {
      setFormError("Email dan password harus diisi");
      return;
    }
    
    try {
      await adminLogin(email, password);
      // Navigation is handled in the hook
    } catch (err) {
      console.error("Login error:", err);
    }
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
          Login Administrator
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="Masukkan email atau username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (formError) setFormError("");
            }}
            required
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-purple-500 h-12 px-4 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formError) setFormError("");
            }}
            required
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-purple-500 h-12 px-4 rounded-md"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember-me" 
              className="border-slate-300" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <Label htmlFor="remember-me" className="font-normal text-slate-600">Ingat saya</Label>
          </div>
          <Link
            href="/forgot-password"
            className="font-medium text-purple-600 hover:text-purple-800 bg-transparent border-none cursor-pointer p-0"
          >
            Lupa password?
          </Link>
        </div>

        {combinedError && (
          <div className="text-sm text-red-500 pt-1">
            {combinedError}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full text-white bg-purple-600 hover:bg-purple-700 font-bold h-12 rounded-md text-sm"
          disabled={isLoading}
        >
          {isLoading ? "MEMPROSES..." : "MASUK"}
        </Button>
      </form>
    </div>
  );
}