// Domain: Auth - UI Types
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/types/ui.types.ts

/**
 * Login Form State
 */
export interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Register Form State
 */
export interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Forgot Password Form State
 */
export interface ForgotPasswordFormState {
  email: string;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

/**
 * Reset Password Form State
 */
export interface ResetPasswordFormState {
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Auth Layout Props
 */
export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  backgroundContent?: React.ReactNode;
}

/**
 * Auth Form Props Base
 */
export interface AuthFormProps {
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

/**
 * User Role Types
 */
export type UserRole = 'organizer' | 'customer' | 'admin';

/**
 * Login Form Props
 */
export interface LoginFormProps {
  userRole?: UserRole;
  isAdminLogin?: boolean;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  className?: string;
}

/**
 * Register Form Props
 */
export interface RegisterFormProps {
  userRole?: UserRole;
  showLoginLink?: boolean;
  className?: string;
}

/**
 * Forgot Password Form Props
 */
export interface ForgotPasswordFormProps {
  showBackToLogin?: boolean;
  className?: string;
}

/**
 * Reset Password Form Props
 */
export interface ResetPasswordFormProps {
  token: string;
  showBackToLogin?: boolean;
  className?: string;
}

/**
 * Auth Page Layout Options
 */
export interface AuthPageLayoutOptions {
  showBackgroundPattern?: boolean;
  backgroundGradient?: string;
  featuresContent?: React.ReactNode;
}
