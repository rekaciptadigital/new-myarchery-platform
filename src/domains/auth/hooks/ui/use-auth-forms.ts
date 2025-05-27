'use client';

// Domain: Auth - UI Hooks
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/hooks/ui/use-auth-forms.ts

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from '../../validation';
import { useAuthBusiness } from '../business/use-auth-business';

// Type aliases for union types (SonarLint compliance)
type PasswordStrength = 'weak' | 'medium' | 'strong';

/**
 * Hook untuk Login Form
 */
export const useLoginForm = (userRole?: 'organizer' | 'customer' | 'admin') => {
  const { handleLogin, isLoggingIn, loginError } = useAuthBusiness();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = useCallback(async (data: LoginFormData) => {
    try {
      await handleLogin(data, userRole);
    } catch (error) {
      // Error akan ditangani oleh business hook
      console.error('Login form error:', error);
    }
  }, [handleLogin, userRole]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: isLoggingIn,
    error: loginError,
    showPassword,
    togglePasswordVisibility,
    
    // Form field helpers
    emailProps: {
      ...form.register('email'),
      error: form.formState.errors.email?.message,
    },
    passwordProps: {
      ...form.register('password'),
      error: form.formState.errors.password?.message,
      type: showPassword ? 'text' : 'password',
    },
    rememberMeProps: {
      ...form.register('rememberMe'),
    },
  };
};

/**
 * Hook untuk Register Form
 */
export const useRegisterForm = (userRole?: 'organizer' | 'customer' | 'admin') => {
  const { handleRegister, isRegistering, registerError, registerSuccess } = useAuthBusiness();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = useCallback(async (data: RegisterFormData) => {
    try {
      await handleRegister(data, userRole);
    } catch (error) {
      console.error('Register form error:', error);
    }
  }, [handleRegister, userRole]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: isRegistering,
    error: registerError,
    success: registerSuccess,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    
    // Form field helpers
    nameProps: {
      ...form.register('name'),
      error: form.formState.errors.name?.message,
    },
    emailProps: {
      ...form.register('email'),
      error: form.formState.errors.email?.message,
    },
    passwordProps: {
      ...form.register('password'),
      error: form.formState.errors.password?.message,
      type: showPassword ? 'text' : 'password',
    },
    confirmPasswordProps: {
      ...form.register('confirmPassword'),
      error: form.formState.errors.confirmPassword?.message,
      type: showConfirmPassword ? 'text' : 'password',
    },
  };
};

/**
 * Hook untuk Forgot Password Form
 */
export const useForgotPasswordForm = () => {
  const { handleForgotPassword, isSendingForgotPassword, forgotPasswordError, forgotPasswordSuccess } = useAuthBusiness();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      await handleForgotPassword(data);
    } catch (error) {
      console.error('Forgot password form error:', error);
    }
  }, [handleForgotPassword]);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: isSendingForgotPassword,
    error: forgotPasswordError,
    success: forgotPasswordSuccess,
    
    // Form field helpers
    emailProps: {
      ...form.register('email'),
      error: form.formState.errors.email?.message,
    },
  };
};

/**
 * Hook untuk Reset Password Form
 */
export const useResetPasswordForm = (token: string) => {
  const { handleResetPassword, isResettingPassword, resetPasswordError, resetPasswordSuccess } = useAuthBusiness();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      await handleResetPassword(data);
    } catch (error) {
      console.error('Reset password form error:', error);
    }
  }, [handleResetPassword]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: isResettingPassword,
    error: resetPasswordError,
    success: resetPasswordSuccess,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    
    // Form field helpers
    passwordProps: {
      ...form.register('password'),
      error: form.formState.errors.password?.message,
      type: showPassword ? 'text' : 'password',
    },
    confirmPasswordProps: {
      ...form.register('confirmPassword'),
      error: form.formState.errors.confirmPassword?.message,
      type: showConfirmPassword ? 'text' : 'password',
    },
  };
};

/**
 * Hook untuk Password Strength Indicator
 */
export const usePasswordStrength = (password: string) => {
  const getStrength = useCallback((pwd: string): PasswordStrength => {
    if (pwd.length < 6) return 'weak';
    
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[@$!%*?&]/.test(pwd);
    
    const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (score < 3 || pwd.length < 8) return 'weak';
    if (score === 3 && pwd.length >= 8) return 'medium';
    return 'strong';
  }, []);

  const strength = getStrength(password);
  
  const getStrengthColor = useCallback((str: PasswordStrength) => {
    switch (str) {
      case 'weak': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'strong': return 'text-green-500';
      default: return 'text-gray-400';
    }
  }, []);

  const getStrengthPercentage = useCallback((str: PasswordStrength) => {
    switch (str) {
      case 'weak': return 25;
      case 'medium': return 60;
      case 'strong': return 100;
      default: return 0;
    }
  }, []);

  return {
    strength,
    strengthColor: getStrengthColor(strength),
    strengthPercentage: getStrengthPercentage(strength),
    isWeak: strength === 'weak',
    isMedium: strength === 'medium',
    isStrong: strength === 'strong',
  };
};
