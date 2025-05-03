"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useCustomerAuth } from "./useCustomerAuth";

export function CustomerRegisterUI() {
  const { customerRegister, isLoading, error } = useCustomerAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  // Combine errors from auth context and form validation
  const combinedError = error ?? formError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (password !== confirmPassword) {
      setFormError("Password tidak cocok.");
      return;
    }
    
    try {
      await customerRegister({
        name,
        email, 
        password
      });
      // Navigation is handled in the hook
    } catch (err) {
      console.error("Registration error:", err);
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
        <h1 className="text-2xl font-bold">Buat Akun Anda</h1>
        <p className="text-sm text-slate-600">Isi data berikut untuk memulai.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Input
            id="name"
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-green-500 h-12 px-4 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-green-500 h-12 px-4 rounded-md"
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
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-green-500 h-12 px-4 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-green-500 h-12 px-4 rounded-md"
          />
        </div>

        {combinedError && (
          <div className="text-sm text-red-500 pt-1">
            {combinedError}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-md text-sm"
          disabled={isLoading}
        >
          {isLoading ? "MEMPROSES..." : "DAFTAR"}
        </Button>
      </form>

      <div className="text-center text-sm text-slate-600">
        Sudah memiliki akun?{" "}
        <Link href="/login/customer" className="font-medium text-green-600 hover:text-green-800">
          Login di sini
        </Link>
      </div>
    </div>
  );
}