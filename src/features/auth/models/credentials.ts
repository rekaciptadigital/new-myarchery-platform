/**
 * Credentials model for authentication
 * Defines login credentials and authentication response structures
 */
import { User, UserRole } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
  role?: UserRole;
}

export interface Session {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  token_type: string; // Add this property to match the implementation
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error?: string;
}