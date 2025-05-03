/**
 * Admin-specific auth hook
 * Provides authentication capabilities specific to the admin role
 */
import { useState } from 'react';
import { LoginCredentials } from '../../models/credentials';
import { AdminAuthService } from './service';
import { useRouter } from 'next/navigation';

export function useAdminAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const credentials: LoginCredentials = {
        email,
        password,
        // Role is enforced in the AdminAuthService
      };
      
      await AdminAuthService.login(credentials);
      // Redirect to admin dashboard after successful login
      router.push('/admin/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Admin authentication failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyAdminAccess = async (userId: string) => {
    try {
      return await AdminAuthService.verifyAdminAccess(userId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify admin access';
      setError(errorMessage);
      return false;
    }
  };
  
  return {
    adminLogin,
    verifyAdminAccess,
    isLoading,
    error,
    logout: AdminAuthService.logout,
    getCurrentUser: AdminAuthService.getCurrentUser,
  };
}