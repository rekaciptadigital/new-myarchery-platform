// Domain: Auth - Main Types Export
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/types/index.ts

// API Types
export type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  AuthTokens,
  Organization,
  UserRole,
  OrganizationType,
  OrganizationRole,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  VerifyEmailRequest,
  RefreshTokenRequest,
} from './api.types';

// UI Types
export type {
  LoginFormState,
  RegisterFormState,
  ForgotPasswordFormState,
  ResetPasswordFormState,
  AuthLayoutProps,
  AuthFormProps,
  LoginFormProps,
  RegisterFormProps,
  ForgotPasswordFormProps,
  ResetPasswordFormProps,
  AuthPageLayoutOptions,
} from './ui.types';

// Business Types
export type {
  AuthState,
  AuthActions,
  AuthStore,
  PermissionOptions,
  RoleHierarchy,
  AuthEvent,
  RouteProtection,
  TenantContext,
} from './business.types';

export { SESSION_KEYS } from './business.types';
