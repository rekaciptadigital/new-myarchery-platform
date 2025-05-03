"use client";

/**
 * Authentication Context
 * Provides global authentication state and actions for the application
 */
import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from "react";
import { AuthService } from "@/features/auth/services";
import { User, UserRole } from "@/features/auth/models/user";
import { Session } from "@/features/auth/models/credentials";
import { TokenService } from "@/features/auth/services/token-service";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const sessionData = await AuthService.getSession();
        setSession(sessionData);

        if (sessionData && TokenService.isSessionValid(sessionData)) {
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError("Failed to initialize authentication");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Set up auth state change listener
  useEffect(() => {
    console.log('Supabase auth listener disabled for UI development');
    
    return () => {
      // Cleanup function (empty during UI development)
    };
  }, []);

  const value = useMemo(() => {
    // Define login function inside useMemo
    const login = async (email: string, password: string, role?: UserRole) => {
      setIsLoading(true);
      clearError();

      try {
        const response = await AuthService.login({ email, password, role });
        setUser(response.user);
        setSession(response.session);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Authentication failed";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    // Define logout function inside useMemo
    const logout = async () => {
      setIsLoading(true);
      clearError();

      try {
        await AuthService.logout();
        setUser(null);
        setSession(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to log out";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    return {
      user,
      session,
      isLoading,
      isAuthenticated: !!session && !!user,
      error,
      login,
      logout,
      clearError,
    };
  }, [user, session, isLoading, error]); // Dependencies don't need to include login and logout anymore

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};