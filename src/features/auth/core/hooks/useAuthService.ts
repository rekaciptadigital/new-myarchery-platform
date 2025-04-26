"use client";

import { useState } from "react";
import { AuthService, LoginCredentials } from "../services/auth-service";

export function useAuthService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.login(credentials);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat login. Silakan coba lagi.");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await AuthService.logout();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat logout. Silakan coba lagi.");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    logout,
    isLoading,
    error,
  };
}
