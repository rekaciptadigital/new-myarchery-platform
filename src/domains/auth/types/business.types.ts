// Domain: Auth - Business Types
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/types/business.types.ts

import { User, Organization, AuthTokens } from './api.types';

/**
 * Authentication State
 */
export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  permissions: string[];
  organizations: Organization[];
  currentOrganization: Organization | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Authentication Actions
 */
export interface AuthActions {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  switchOrganization: (organizationId: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Auth Store Interface
 */
export interface AuthStore extends AuthState, AuthActions {}

/**
 * Permission Check Options
 */
export interface PermissionOptions {
  organizationId?: string;
  resource?: string;
  action?: string;
  strict?: boolean; // If true, requires exact permission match
}

/**
 * Role Hierarchy
 */
export interface RoleHierarchy {
  level: number;
  permissions: string[];
  inherits?: string[]; // Roles that this role inherits from
}

/**
 * Session Storage Keys
 */
export const SESSION_KEYS = {
  ACCESS_TOKEN: 'auth.access_token',
  REFRESH_TOKEN: 'auth.refresh_token',
  USER: 'auth.user',
  CURRENT_ORG: 'auth.current_organization',
  REMEMBER_ME: 'auth.remember_me',
} as const;

/**
 * Authentication Events
 */
export type AuthEvent = 
  | 'login'
  | 'logout'
  | 'token_refresh'
  | 'session_expired'
  | 'permission_denied'
  | 'organization_switched';

/**
 * Route Protection Types
 */
export interface RouteProtection {
  requireAuth: boolean;
  requiredPermissions?: string[];
  requiredRole?: string;
  organizationRequired?: boolean;
  redirectTo?: string;
}

/**
 * Multi-tenant Context
 */
export interface TenantContext {
  organizationId: string;
  organizationType: string;
  permissions: string[];
  settings: Record<string, any>;
}
