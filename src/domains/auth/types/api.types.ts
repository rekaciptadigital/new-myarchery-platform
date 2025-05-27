// Domain: Auth - API Types
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/types/api.types.ts

/**
 * Login Request Payload
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Register Request Payload
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Authentication Response
 */
export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  permissions: string[];
  organizations: Organization[];
}

/**
 * User Data Structure
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  emailVerified: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication Tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

/**
 * Organization Structure
 */
export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
  role: OrganizationRole;
  permissions: string[];
}

/**
 * User Roles in System
 */
export type UserRole = 'system_admin' | 'organizer' | 'member';

/**
 * Organization Types
 */
export type OrganizationType = 'club' | 'event_organizer' | 'federation';

/**
 * Organization Roles
 */
export type OrganizationRole = 'owner' | 'admin' | 'manager' | 'member';

/**
 * Password Reset Request
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Password Reset Response
 */
export interface ForgotPasswordResponse {
  message: string;
  resetToken?: string; // Only in development
}

/**
 * Reset Password Request
 */
export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Email Verification Request
 */
export interface VerifyEmailRequest {
  token: string;
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}
