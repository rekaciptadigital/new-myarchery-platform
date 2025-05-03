/**
 * Public exports for auth services
 */
import { AuthService } from './auth-service';
import { UserRole } from '../models/user';

export * from './auth-service';
export * from './token-service';

/**
 * Factory pattern for getting the right auth service based on role
 */
export function getAuthServiceForRole(role: UserRole) {
  // Import dynamically only when needed to avoid circular dependencies
  const importService = async () => {
    switch(role) {
      case UserRole.ADMIN: {
        const { AdminAuthService } = await import('../variants/admin/service');
        return AdminAuthService;
      }
      case UserRole.ORGANIZER: {
        const { OrganizerAuthService } = await import('../variants/organizer/service');
        return OrganizerAuthService;
      }
      case UserRole.CUSTOMER: {
        const { CustomerAuthService } = await import('../variants/customer/service');
        return CustomerAuthService;
      }
      default:
        return AuthService;
    }
  };
  
  return importService();
}