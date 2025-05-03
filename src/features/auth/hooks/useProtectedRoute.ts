/**
 * Protected Route Hook
 * Provides client-side route protection based on authentication state and user role
 */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from './useSession';
import { UserRole } from '../models/user';

interface UseProtectedRouteOptions {
  role?: UserRole | UserRole[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function useProtectedRoute({
  role,
  redirectTo = '/login',
  fallback = null
}: UseProtectedRouteOptions = {}) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useSession();
  
  useEffect(() => {
    // Skip during SSR or while loading
    if (typeof window === 'undefined' || loading) {
      return;
    }
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }
    
    // If role is required, check if user has the required role
    if (role && user) {
      const requiredRoles = Array.isArray(role) ? role : [role];
      const hasRequiredRole = requiredRoles.includes(user.role);
      
      if (!hasRequiredRole) {
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, role, redirectTo, router, user, loading]);
  
  return {
    isAuthenticated,
    user,
    isLoading: loading,
    fallback,
  };
}