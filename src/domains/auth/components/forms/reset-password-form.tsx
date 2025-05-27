// Domain: Auth - Reset Password Form Component
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/components/forms/reset-password-form.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useResetPasswordForm } from '../../hooks';
import { ResetPasswordFormProps } from '../../types';
import { AUTH_ROUTES, AUTH_SUCCESS } from '../../constants';
import { PasswordStrength } from '../ui/password-strength';

/**
 * Reset Password Form Component
 */
export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token,
  showBackToLogin = true,
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
    passwordProps,
    confirmPasswordProps,
  } = useResetPasswordForm(token);

  const currentPassword = form.watch('password');

  // Show success message if password reset successfully
  if (success) {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Password Reset Successful!</h3>
          <p className="text-green-700 mb-4">{AUTH_SUCCESS.RESET_PASSWORD_SUCCESS}</p>
          
          <Link 
            href={AUTH_ROUTES.LOGIN}
            className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
          >
            Continue to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${className}`}>
      {/* Password Field */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            id="password"
            placeholder="New Password"
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
        {passwordProps.error && (
          <p className="text-sm text-red-500">{passwordProps.error}</p>
        )}
      </div>

      {/* Password Strength Indicator */}
      <PasswordStrength password={currentPassword} />

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            id="confirmPassword"
            placeholder="Confirm New Password"
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
        {isLoading ? "UPDATING..." : "RESET PASSWORD"}
      </Button>

      {/* Back to Login Link */}
      {showBackToLogin && (
        <div className="text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link href={AUTH_ROUTES.LOGIN} className="font-medium text-blue-600 hover:text-blue-800">
            Back to Login
          </Link>
        </div>
      )}
    </form>
  );
};
