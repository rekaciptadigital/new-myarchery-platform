// Domain: Auth - Forgot Password Form Component
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/components/forms/forgot-password-form.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForgotPasswordForm } from '../../hooks';
import { ForgotPasswordFormProps } from '../../types';
import { AUTH_ROUTES, AUTH_SUCCESS } from '../../constants';

/**
 * Forgot Password Form Component
 */
export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  showBackToLogin = true,
  className = '',
}) => {
  const {
    onSubmit,
    isLoading,
    error,
    success,
    emailProps,
  } = useForgotPasswordForm();

  // Show success message if email sent successfully
  if (success) {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Email Sent!</h3>
          <p className="text-green-700 mb-4">{AUTH_SUCCESS.FORGOT_PASSWORD_SUCCESS}</p>
          
          {showBackToLogin && (
            <Link 
              href={AUTH_ROUTES.LOGIN}
              className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
            >
              Back to Login
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${className}`}>
      {/* Email Field */}
      <div className="space-y-2">
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          className="bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 h-12 px-4 rounded-md"
          {...emailProps}
        />
        {emailProps.error && (
          <p className="text-sm text-red-500">{emailProps.error}</p>
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
        {isLoading ? "SENDING..." : "SEND RESET LINK"}
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
