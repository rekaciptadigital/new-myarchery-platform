"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Add Checkbox import
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

  // Removed Card wrapper to match the screenshot design
  return (
    <div className="w-full max-w-sm space-y-6"> {/* Adjusted max-width and added spacing */}
      <div className="flex justify-start mb-8"> {/* Align logo left and add margin */}
        <Image 
          src="/logos/logo_myarchery.svg" 
          alt="MyArchery Logo" 
          width={180} 
          height={50} 
          priority
        />
      </div>
      
      {/* Added Welcome back text */}
      <div className="space-y-1">
        <p className="text-sm text-slate-600">Welcome back</p>
        <h1 className="text-2xl font-bold">Sign In To Your Account</h1>
      </div>

      {/* Removed CardHeader, CardContent, CardFooter */}
      <form onSubmit={handleSubmit} className="space-y-5"> {/* Increased spacing */}
        <div className="space-y-2">
          {/* Removed Label, using placeholder as label */}
          <Input
            id="email"
            type="email"
            placeholder="Enter username or email" // Updated placeholder
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 h-12 px-4 rounded-md" // Added styling
          />
        </div>
        <div className="space-y-2">
          {/* Removed Label, using placeholder as label */}
          <Input
            id="password"
            type="password"
            placeholder="Password" // Updated placeholder
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 h-12 px-4 rounded-md" // Added styling
          />
        </div>

        {/* Added Remember Me checkbox and Forgot Password link */} 
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" className="border-slate-300" />
            <Label htmlFor="remember-me" className="font-normal text-slate-600">Remember Me</Label>
          </div>
          <button
            type="button"
            className="font-medium text-blue-600 hover:text-blue-800 bg-transparent border-none cursor-pointer p-0"
            onClick={() => window.alert("Fitur reset password akan segera tersedia")}
          >
            Forgot your password?
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-500 pt-1">
            {error}
          </div>
        )}

        {/* Updated Login Button Style */}
        <Button 
          type="submit" 
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-12 rounded-full text-sm tracking-wide" 
          disabled={isLoading}
        >
          {isLoading ? "MEMPROSES..." : "LOGIN"} {/* Uppercase text */}
        </Button>
      </form>
      
      {/* Removed Register link and Social Logins to match screenshot */}
      {/* {!isAdminLogin && ( ... )} */}
    </div>
  );
}