/**
 * Validation rules for authentication
 * Implements domain-level validation for credentials
 */
import { LoginCredentials } from './credentials';
import { UserRole } from './user';

export function validateCredentials(credentials: LoginCredentials): string[] {
  const errors: string[] = [];
  
  if (!credentials.email) {
    errors.push('Email is required');
  } else if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
    errors.push('Email format is invalid');
  }
  
  if (!credentials.password) {
    errors.push('Password is required');
  } else if (credentials.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  // Role validation is optional
  if (credentials.role && !Object.values(UserRole).includes(credentials.role)) {
    errors.push('Invalid role specified');
  }
  
  return errors;
}