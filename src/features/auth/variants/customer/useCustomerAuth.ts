/**
 * Customer-specific auth hook
 * Provides authentication capabilities specific to the customer role
 */
import { useState } from 'react';
import { LoginCredentials } from '../../models/credentials';
import { CustomerAuthService } from './service';
import { useRouter } from 'next/navigation';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export function useCustomerAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const customerLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const credentials: LoginCredentials = {
        email,
        password,
        // Role is enforced in the CustomerAuthService
      };
      
      await CustomerAuthService.login(credentials);
      // Redirect to customer dashboard
      router.push('/customer/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Customer authentication failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const customerRegister = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await CustomerAuthService.register(data);
      // Redirect to login after successful registration
      router.push('/customer/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyCustomerAccess = async (userId: string) => {
    try {
      return await CustomerAuthService.verifyCustomerAccess(userId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify customer access';
      setError(errorMessage);
      return false;
    }
  };
  
  const getParticipatedEvents = async (customerId: string) => {
    try {
      return await CustomerAuthService.getParticipatedEvents(customerId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch participated events';
      setError(errorMessage);
      return [];
    }
  };
  
  return {
    customerLogin,
    customerRegister,
    verifyCustomerAccess,
    getParticipatedEvents,
    isLoading,
    error,
    logout: CustomerAuthService.logout,
    getCurrentUser: CustomerAuthService.getCurrentUser,
  };
}