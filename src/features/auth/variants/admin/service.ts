/**
 * Admin Auth Service
 * Implements admin-specific authentication business logic
 */
import { AuthService } from '../../services/auth-service';
import { LoginCredentials, AuthResponse } from '../../models/credentials';
import { UserRole } from '../../models/user';

export class AdminAuthService extends AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Force the role to be admin for this service
    const adminCredentials = {
      ...credentials,
      role: UserRole.ADMIN
    };
    
    // Call the parent login method with admin role enforcement
    return super.login(adminCredentials);
  }
  
  // Admin-specific methods can be added here
  static async verifyAdminAccess(userId: string): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return !!user && user.id === userId && user.role === UserRole.ADMIN;
    } catch (error) {
      console.error("Admin verification error:", error);
      return false;
    }
  }
}