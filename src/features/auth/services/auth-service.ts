/**
 * Auth Service
 * Core business logic for authentication
 */
import { LoginCredentials, AuthResponse } from '../models/credentials';
import { validateCredentials } from '../models/validation';
import { AuthRepository } from '../repository';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Domain validation
    const errors = validateCredentials(credentials);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    const response = await AuthRepository.login(credentials);
    
    // Role verification if specified
    if (credentials.role && response.user?.role !== credentials.role) {
      throw new Error(`Unauthorized: User does not have ${credentials.role} role`);
    }
    
    return response;
  }
  
  static async logout(): Promise<void> {
    return AuthRepository.logout();
  }
  
  static async getCurrentUser() {
    return AuthRepository.getCurrentUser();
  }
  
  static async getSession() {
    return AuthRepository.getSession();
  }
}