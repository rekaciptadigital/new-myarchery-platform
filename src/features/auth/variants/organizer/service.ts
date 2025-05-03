/**
 * Organizer Auth Service
 * Implements organizer-specific authentication business logic
 */
import { AuthService } from '../../services/auth-service';
import { LoginCredentials, AuthResponse } from '../../models/credentials';
import { UserRole } from '../../models/user';

// Define a type for event data instead of using 'any'
interface EventSummary {
  id: string;
  name: string;
  date?: string;
  status?: string;
  category?: string;
  [key: string]: unknown; // Allow for additional properties with unknown type
}

export class OrganizerAuthService extends AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Force the role to be organizer for this service
    const organizerCredentials = {
      ...credentials,
      role: UserRole.ORGANIZER
    };
    
    // Call the parent login method with organizer role enforcement
    return super.login(organizerCredentials);
  }
  
  // Organizer-specific methods
  static async verifyOrganizerAccess(userId: string): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return !!user && user.id === userId && user.role === UserRole.ORGANIZER;
    } catch (error) {
      console.error("Organizer verification error:", error);
      return false;
    }
  }
  
  static async getOrganizerEvents(organizerId: string): Promise<EventSummary[]> {
    // This would integrate with an events service
    // Implementation would depend on how events are stored and managed
    console.log(`Getting events for organizer: ${organizerId}`);
    return []; // Placeholder implementation
  }
}