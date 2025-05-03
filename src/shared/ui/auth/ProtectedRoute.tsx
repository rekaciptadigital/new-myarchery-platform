'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/features/auth/models/user'; // Updated import path to use specific file

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserRole | UserRole[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * 
 * This component provides role-based access control for pages.
 * It will check if the user is authenticated and has the required role.
 * If not, it will redirect to the specified route.
 * 
 * @param children - The content to render if access is granted
 * @param roles - A single role or array of roles that can access this route
 * @param redirectTo - The path to redirect to if access is denied (defaults to login)
 * @param fallback - Optional fallback UI to show while checking auth status
 */
export function ProtectedRoute({
  children,
  roles,
  redirectTo,
  fallback = <AuthCheckingFallback />
}: Readonly<ProtectedRouteProps>) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Skip during SSR or while loading auth state
    if (typeof window === 'undefined' || isLoading) {
      return;
    }

    // If not authenticated, redirect to login page or specific path
    if (!isAuthenticated) {
      const loginPath = getRedirectPath(redirectTo, user?.role);
      router.push(loginPath);
      return;
    }

    // If roles are specified, check if user has required role
    if (roles && user) {
      const allowedRoles = Array.isArray(roles) ? roles : [roles];
      const hasRequiredRole = allowedRoles.includes(user.role);

      if (!hasRequiredRole) {
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, isLoading, roles, redirectTo, router, user]);

  // Show loading state while checking authentication
  if (isLoading) {
    return fallback;
  }

  // If authenticated with correct role, render children
  return isAuthenticated ? <>{children}</> : fallback;
}

// Helper function to get the appropriate redirect path based on user role
function getRedirectPath(customPath?: string, role?: UserRole): string {
  if (customPath) return customPath;
  
  switch (role) {
    case UserRole.ADMIN:
      return '/admin/login';
    case UserRole.ORGANIZER:
      return '/organizer/login';
    case UserRole.CUSTOMER:
      return '/customer/login';
    default:
      return '/login';
  }
}

// Simple loading component while checking auth status
function AuthCheckingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center p-6">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Memeriksa otentikasi...</p>
      </div>
    </div>
  );
}