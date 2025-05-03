/**
 * Organizer-specific auth hook
 * Provides authentication capabilities specific to the organizer role
 */
import { useState } from 'react';
import { LoginCredentials } from '../../models/credentials';
import { OrganizerAuthService } from './service';
import { useRouter } from 'next/navigation';

export function useOrganizerAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const organizerLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const credentials: LoginCredentials = {
        email,
        password,
        // Role is enforced in the OrganizerAuthService
      };
      
      await OrganizerAuthService.login(credentials);
      // Redirect to organizer dashboard after successful login
      router.push('/organizer/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Organizer authentication failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyOrganizerAccess = async (userId: string) => {
    try {
      return await OrganizerAuthService.verifyOrganizerAccess(userId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify organizer access';
      setError(errorMessage);
      return false;
    }
  };
  
  const getOrganizerEvents = async (organizerId: string) => {
    try {
      return await OrganizerAuthService.getOrganizerEvents(organizerId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch organizer events';
      setError(errorMessage);
      return [];
    }
  };
  
  return {
    organizerLogin,
    verifyOrganizerAccess,
    getOrganizerEvents,
    isLoading,
    error,
    logout: OrganizerAuthService.logout,
    getCurrentUser: OrganizerAuthService.getCurrentUser,
  };
}