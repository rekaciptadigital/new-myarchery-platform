// Domain: Auth - Register Form Component
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/components/forms/register-form.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRegisterForm } from '../../hooks';
import { RegisterFormProps } from '../../types';
import { AUTH_ROUTES, AUTH_SUCCESS } from '../../constants';
import { PasswordStrength } from '../ui/password-strength';

/**
 * Register Form Component
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  userRole,
  showLoginLink = true,
  className = '',
}) => {
  const {
    form,
    onSubmit,
    isLoading,
    error,
    success,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    nameProps,
    emailProps,
    passwordProps,
    confirmPasswordProps,
  } = useRegisterForm(userRole);

  const currentPassword = form.watch('password');

  // Determine the appropriate login route based on user role
  const getLoginRoute = () => {
    if (userRole === 'admin') return AUTH_ROUTES.ADMIN_LOGIN;
    if (userRole === 'customer') return AUTH_ROUTES.CUSTOMER_LOGIN;
    if (userRole === 'organizer') return AUTH_ROUTES.ORGANIZER_LOGIN;
    return AUTH_ROUTES.LOGIN;
  };

  if (success) {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Registration Successful!</h3>
          <p className="text-green-700">{AUTH_SUCCESS.REGISTER_SUCCESS}</p>
        </div>
        
        <Link
          href={AUTH_ROUTES.LOGIN}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${className}`}>
      {/* Name Field */}
      <div className="space-y-2">
        <Input
          id="name"
          type="text"
          placeholder="Full Name"
          className="bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 h-12 px-4 rounded-md"
          {...nameProps}
        />
        {nameProps.error && (
          <p className="text-sm text-red-500">{nameProps.error}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Input
          id="email"
          type="email"
          placeholder="Enter username or email"
          className="bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 h-12 px-4 rounded-md"
          {...emailProps}
        />
        {emailProps.error && (
          <p className="text-sm text-red-500">{emailProps.error}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            id="password"
            placeholder="Password"
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 h-12 px-4 pr-12 rounded-md"
            {...passwordProps}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        <PasswordStrength password={currentPassword} />
        
        {passwordProps.error && (
          <p className="text-sm text-red-500">{passwordProps.error}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            id="confirmPassword"
            placeholder="Confirm Password"
            className="bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 h-12 px-4 pr-12 rounded-md"
            {...confirmPasswordProps}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showConfirmPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {confirmPasswordProps.error && (
          <p className="text-sm text-red-500">{confirmPasswordProps.error}</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-500 pt-1">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-12 rounded-full text-sm tracking-wide"
        disabled={isLoading}
      >
        {isLoading ? "MEMPROSES..." : "REGISTER"}
      </Button>

      {/* Login Link */}
      {showLoginLink && (
        <div className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href={getLoginRoute()} className="font-medium text-blue-600 hover:text-blue-800">
            Login here
          </Link>
        </div>
      )}
    </form>
  );
};
