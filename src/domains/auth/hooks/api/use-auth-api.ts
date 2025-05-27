'use client';

// Domain: Auth - API Hooks
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/hooks/api/use-auth-api.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services';
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  User,
} from '../../types';

/**
 * Query Keys for React Query
 */
export const AUTH_QUERY_KEYS = {
  profile: ['auth', 'profile'] as const,
  permissions: ['auth', 'permissions'] as const,
  organizations: ['auth', 'organizations'] as const,
} as const;

/**
 * Hook untuk login
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      // Cache user data
      queryClient.setQueryData(AUTH_QUERY_KEYS.profile, response.user);
      
      // Store user data in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('myarchery_user_data', JSON.stringify(response.user));
        localStorage.setItem('myarchery_current_org', JSON.stringify(response.organizations[0] ?? null));
      }
    },
    onError: (error: Error) => {
      console.error('Login error:', error);
    },
  });
};

/**
 * Hook untuk register
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onError: (error: Error) => {
      console.error('Register error:', error);
    },
  });
};

/**
 * Hook untuk logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('myarchery_user_data');
        localStorage.removeItem('myarchery_current_org');
      }
    },
    onError: (error: Error) => {
      console.error('Logout error:', error);
      // Clear cache even if logout fails
      queryClient.clear();
    },
  });
};

/**
 * Hook untuk refresh token
 */
export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: (response) => {
      // Update cached user data
      queryClient.setQueryData(AUTH_QUERY_KEYS.profile, response.user);
    },
    onError: (error: Error) => {
      console.error('Token refresh error:', error);
      // Clear cache if refresh fails
      queryClient.clear();
    },
  });
};

/**
 * Hook untuk forgot password
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authService.forgotPassword(data),
    onError: (error: Error) => {
      console.error('Forgot password error:', error);
    },
  });
};

/**
 * Hook untuk reset password
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onError: (error: Error) => {
      console.error('Reset password error:', error);
    },
  });
};

/**
 * Hook untuk verify email
 */
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => authService.verifyEmail(data),
    onError: (error: Error) => {
      console.error('Verify email error:', error);
    },
  });
};

/**
 * Hook untuk get user profile
 */
export const useProfile = (enabled: boolean = true) => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.profile,
    queryFn: () => authService.getProfile(),
    enabled: enabled && authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry if unauthorized
      if (error?.message?.includes('401') || error?.message?.includes('unauthorized')) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook untuk update profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<User>) => authService.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update cached user data
      queryClient.setQueryData(AUTH_QUERY_KEYS.profile, updatedUser);
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('myarchery_user_data', JSON.stringify(updatedUser));
      }
    },
    onError: (error: Error) => {
      console.error('Update profile error:', error);
    },
  });
};

/**
 * Hook untuk change password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(currentPassword, newPassword),
    onError: (error: Error) => {
      console.error('Change password error:', error);
    },
  });
};

/**
 * Hook untuk check authentication status
 */
export const useAuthStatus = () => {
  return {
    isAuthenticated: authService.isAuthenticated(),
    hasValidToken: !!authService.getAccessToken(),
  };
};
