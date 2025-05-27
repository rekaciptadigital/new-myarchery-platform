'use client';

// Domain: Auth - Business Logic Hooks
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/hooks/business/use-auth-business.ts

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { 
  useLogin, 
  useLogout, 
  useRegister, 
  useForgotPassword, 
  useResetPassword,
  useProfile,
  useRefreshToken,
} from '../api/use-auth-api';
import { LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../../types';
import { AUTH_ROUTES, REDIRECT_ROUTES } from '../../constants';

/**
 * Hook untuk authentication business logic
 */
export const useAuthBusiness = () => {
  const router = useRouter();
  
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const forgotPasswordMutation = useForgotPassword();
  const resetPasswordMutation = useResetPassword();
  const refreshTokenMutation = useRefreshToken();

  /**
   * Handle user login
   */
  const handleLogin = useCallback(async (
    data: LoginRequest, 
    userRole?: 'organizer' | 'customer' | 'admin'
  ) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      
      // Redirect based on user role
      let redirectPath: string = REDIRECT_ROUTES.AFTER_LOGIN;
      
      if (userRole === 'admin') {
        redirectPath = REDIRECT_ROUTES.AFTER_ADMIN_LOGIN;
      } else if (userRole === 'customer') {
        redirectPath = REDIRECT_ROUTES.AFTER_CUSTOMER_LOGIN;
      } else if (userRole === 'organizer') {
        redirectPath = REDIRECT_ROUTES.AFTER_ORGANIZER_LOGIN;
      }
      
      router.push(redirectPath);
      
      return response;
    } catch (error) {
      throw error;
    }
  }, [loginMutation, router]);

  /**
   * Handle user registration
   */
  const handleRegister = useCallback(async (
    data: RegisterRequest, 
    userRole?: 'organizer' | 'customer' | 'admin'
  ) => {
    try {
      const response = await registerMutation.mutateAsync(data);
      
      // Redirect to appropriate login page with success message
      let loginRoute: string = AUTH_ROUTES.LOGIN;
      
      if (userRole === 'admin') {
        loginRoute = AUTH_ROUTES.ADMIN_LOGIN;
      } else if (userRole === 'customer') {
        loginRoute = AUTH_ROUTES.CUSTOMER_LOGIN;
      } else if (userRole === 'organizer') {
        loginRoute = AUTH_ROUTES.ORGANIZER_LOGIN;
      }
      
      router.push(loginRoute + '?registered=true');
      
      return response;
    } catch (error) {
      throw error;
    }
  }, [registerMutation, router]);

  /**
   * Handle user logout
   */
  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
      
      // Redirect to login page
      router.push(REDIRECT_ROUTES.AFTER_LOGOUT);
    } catch (error) {
      // Force redirect even if logout fails
      router.push(REDIRECT_ROUTES.AFTER_LOGOUT);
      throw error;
    }
  }, [logoutMutation, router]);

  /**
   * Handle forgot password
   */
  const handleForgotPassword = useCallback(async (data: ForgotPasswordRequest) => {
    try {
      const response = await forgotPasswordMutation.mutateAsync(data);
      return response;
    } catch (error) {
      throw error;
    }
  }, [forgotPasswordMutation]);

  /**
   * Handle reset password
   */
  const handleResetPassword = useCallback(async (data: ResetPasswordRequest) => {
    try {
      await resetPasswordMutation.mutateAsync(data);
      
      // Redirect to login page with success message
      router.push(AUTH_ROUTES.LOGIN + '?passwordReset=true');
    } catch (error) {
      throw error;
    }
  }, [resetPasswordMutation, router]);

  /**
   * Handle token refresh
   */
  const handleRefreshToken = useCallback(async () => {
    try {
      const response = await refreshTokenMutation.mutateAsync();
      return response;
    } catch (error) {
      // Redirect to login if refresh fails
      router.push(REDIRECT_ROUTES.AFTER_LOGOUT);
      throw error;
    }
  }, [refreshTokenMutation, router]);

  /**
   * Navigate to login page
   */
  const navigateToLogin = useCallback((isAdmin: boolean = false) => {
    const loginPath = isAdmin ? AUTH_ROUTES.ADMIN_LOGIN : AUTH_ROUTES.LOGIN;
    router.push(loginPath);
  }, [router]);

  /**
   * Navigate to register page
   */
  const navigateToRegister = useCallback(() => {
    router.push(AUTH_ROUTES.REGISTER);
  }, [router]);

  /**
   * Navigate to forgot password page
   */
  const navigateToForgotPassword = useCallback(() => {
    router.push(AUTH_ROUTES.FORGOT_PASSWORD);
  }, [router]);

  return {
    // Actions
    handleLogin,
    handleRegister,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
    handleRefreshToken,
    
    // Navigation
    navigateToLogin,
    navigateToRegister,
    navigateToForgotPassword,
    
    // States
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isSendingForgotPassword: forgotPasswordMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    isRefreshingToken: refreshTokenMutation.isPending,
    
    // Errors
    loginError: loginMutation.error?.message,
    registerError: registerMutation.error?.message,
    logoutError: logoutMutation.error?.message,
    forgotPasswordError: forgotPasswordMutation.error?.message,
    resetPasswordError: resetPasswordMutation.error?.message,
    refreshTokenError: refreshTokenMutation.error?.message,
    
    // Success states
    registerSuccess: registerMutation.isSuccess,
    forgotPasswordSuccess: forgotPasswordMutation.isSuccess,
    resetPasswordSuccess: resetPasswordMutation.isSuccess,
  };
};

/**
 * Hook untuk permission checking
 */
export const usePermissions = () => {
  const { data: user } = useProfile();

  const hasPermission = useCallback((permission: string, organizationId?: string): boolean => {
    if (!user) return false;

    // System admin has all permissions
    if (user.role === 'system_admin') return true;

    // TODO: Implement organization-specific permission checking
    // This is a simplified version
    console.log('Checking permission:', permission, 'for organization:', organizationId);
    return true;
  }, [user]);

  const hasRole = useCallback((role: string): boolean => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  const hasAnyRole = useCallback((roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  }, [user]);

  return {
    user,
    hasPermission,
    hasRole,
    hasAnyRole,
    isSystemAdmin: user?.role === 'system_admin',
    isOrganizer: user?.role === 'organizer',
    isMember: user?.role === 'member',
  };
};

/**
 * Hook untuk organization management
 */
export const useOrganizations = () => {
  // Get current organization from localStorage
  const getCurrentOrganization = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    try {
      const orgData = localStorage.getItem('myarchery_current_org');
      return orgData ? JSON.parse(orgData) : null;
    } catch {
      return null;
    }
  }, []);

  // Switch to different organization
  const switchOrganization = useCallback((organizationId: string) => {
    // TODO: Implement organization switching logic
    // This would typically involve API call and permission refresh
    console.log('Switching to organization:', organizationId);
  }, []);

  return {
    currentOrganization: getCurrentOrganization(),
    switchOrganization,
  };
};
