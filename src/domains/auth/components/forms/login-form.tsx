// Domain: Auth - Login Form Component
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/components/forms/login-form.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLoginForm } from '../../hooks';
import { LoginFormProps } from '../../types';
import { AUTH_ROUTES } from '../../constants';

/**
 * Login Form Component
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  userRole,
  isAdminLogin = false,
  showRememberMe = true,
  showForgotPassword = true,
  className = '',
}) => {
  // Determine role for the hook - prioritize userRole, fallback to isAdminLogin
  const role = userRole ?? (isAdminLogin ? 'admin' : undefined);
  
  const {
    onSubmit,
    isLoading,
    error,
    showPassword,
    togglePasswordVisibility,
    emailProps,
    passwordProps,
    rememberMeProps,
  } = useLoginForm(role);

  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${className}`}>
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
        {passwordProps.error && (
          <p className="text-sm text-red-500">{passwordProps.error}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      {(showRememberMe || showForgotPassword) && (
        <div className="flex items-center justify-between text-sm">
          {showRememberMe && (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember-me" 
                className="border-slate-300"
                {...rememberMeProps}
              />
              <Label htmlFor="remember-me" className="font-normal text-slate-600">
                Remember Me
              </Label>
            </div>
          )}
          
          {showForgotPassword && (
            <Link
              href={AUTH_ROUTES.FORGOT_PASSWORD}
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Forgot your password?
            </Link>
          )}
        </div>
      )}

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
        {isLoading ? "MEMPROSES..." : "LOGIN"}
      </Button>

      {/* Register Link for non-admin login */}
      {role !== 'admin' && (
        <div className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href={AUTH_ROUTES.REGISTER} className="font-medium text-blue-600 hover:text-blue-800">
            Register here
          </Link>
        </div>
      )}
    </form>
  );
};
