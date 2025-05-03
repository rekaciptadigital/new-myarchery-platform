/**
 * Customer-specific auth hook
 * Provides authentication capabilities specific to the customer role
 */
import { useState } from 'react';
import { LoginCredentials } from '../../models/credentials';
import { CustomerAuthService } from './service';

export function useCustomerAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const customerLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const credentials: LoginCredentials = {
        email,
        password,
        // Role is enforced in the CustomerAuthService
      };
      
      return await CustomerAuthService.login(credentials);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Customer authentication failed';
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
    verifyCustomerAccess,
    getParticipatedEvents,
    isLoading,
    error,
    logout: CustomerAuthService.logout,
    getCurrentUser: CustomerAuthService.getCurrentUser,
  };
}