/**
 * Customer Auth Service
 * Implements customer-specific authentication business logic
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

// Customer registration data
interface CustomerRegistrationData {
  name: string;
  email: string;
  password: string;
}

export class CustomerAuthService extends AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Force the role to be customer for this service
    const customerCredentials = {
      ...credentials,
      role: UserRole.CUSTOMER
    };
    
    // Call the parent login method with customer role enforcement
    return super.login(customerCredentials);
  }
  
  // Customer registration method
  static async register(data: CustomerRegistrationData): Promise<void> {
    try {
      // In a real implementation, this would call the repository to register the user
      // For now, this is a placeholder implementation
      console.log('Registering customer:', data.email);
      
      // Simulate backend delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, we would return the result from the repository
      return;
    } catch (error) {
      console.error('Customer registration error:', error);
      throw new Error('Registration failed. Please try again.');
    }
  }
  
  // Customer-specific methods
  static async verifyCustomerAccess(userId: string): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return !!user && user.id === userId && user.role === UserRole.CUSTOMER;
    } catch (error) {
      console.error("Customer verification error:", error);
      return false;
    }
  }
  
  // Additional customer-specific methods could be added here
  static async getParticipatedEvents(customerId: string): Promise<EventSummary[]> {
    // This would integrate with an events service to get events the customer has participated in
    // Implementation would depend on how events are stored and managed
    console.log(`Getting participated events for customer: ${customerId}`);
    return []; // Placeholder implementation
  }
}