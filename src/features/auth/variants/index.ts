/**
 * Auth variants exports
 * Role-specific implementations of authentication
 */
import { UserRole } from '../models/user';

// Re-export all role variants
export * from './admin';
export * from './organizer';
export * from './customer';

// Factory function to get the right auth hook based on role
export function getAuthHook(role?: UserRole) {
  const importHook = async () => {
    switch(role) {
      case UserRole.ADMIN: {
        const { useAdminAuth } = await import('./admin');
        return useAdminAuth;
      }
      case UserRole.ORGANIZER: {
        const { useOrganizerAuth } = await import('./organizer');
        return useOrganizerAuth;
      }
      case UserRole.CUSTOMER: {
        const { useCustomerAuth } = await import('./customer');
        return useCustomerAuth;
      }
      default: {
        // Default to base auth hook
        const { useAuthService } = await import('../hooks');
        return useAuthService;
      }
    }
  };
  
  return importHook();
}