// Domain: Auth - Validation Schemas
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/validation/index.ts

import { z } from 'zod';
import { VALIDATION_RULES } from '../constants';

/**
 * Login Form Validation Schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_RULES.EMAIL.REQUIRED)
    .email(VALIDATION_RULES.EMAIL.INVALID_FORMAT)
    .max(VALIDATION_RULES.EMAIL.MAX_LENGTH, `Email maksimal ${VALIDATION_RULES.EMAIL.MAX_LENGTH} karakter`),
  
  password: z
    .string()
    .min(1, VALIDATION_RULES.PASSWORD.REQUIRED),
  
  rememberMe: z.boolean(),
});

/**
 * Register Form Validation Schema
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_RULES.NAME.REQUIRED)
    .min(VALIDATION_RULES.NAME.MIN_LENGTH, `Nama minimal ${VALIDATION_RULES.NAME.MIN_LENGTH} karakter`)
    .max(VALIDATION_RULES.NAME.MAX_LENGTH, `Nama maksimal ${VALIDATION_RULES.NAME.MAX_LENGTH} karakter`)
    .regex(VALIDATION_RULES.NAME.PATTERN, VALIDATION_RULES.NAME.PATTERN_MESSAGE),
  
  email: z
    .string()
    .min(1, VALIDATION_RULES.EMAIL.REQUIRED)
    .email(VALIDATION_RULES.EMAIL.INVALID_FORMAT)
    .max(VALIDATION_RULES.EMAIL.MAX_LENGTH, `Email maksimal ${VALIDATION_RULES.EMAIL.MAX_LENGTH} karakter`),
  
  password: z
    .string()
    .min(1, VALIDATION_RULES.PASSWORD.REQUIRED)
    .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, `Password minimal ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} karakter`)
    .max(VALIDATION_RULES.PASSWORD.MAX_LENGTH, `Password maksimal ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} karakter`)
    .regex(VALIDATION_RULES.PASSWORD.PATTERN, VALIDATION_RULES.PASSWORD.PATTERN_MESSAGE),
  
  confirmPassword: z
    .string()
    .min(1, 'Konfirmasi password wajib diisi'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
});

/**
 * Forgot Password Form Validation Schema
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_RULES.EMAIL.REQUIRED)
    .email(VALIDATION_RULES.EMAIL.INVALID_FORMAT)
    .max(VALIDATION_RULES.EMAIL.MAX_LENGTH, `Email maksimal ${VALIDATION_RULES.EMAIL.MAX_LENGTH} karakter`),
});

/**
 * Reset Password Form Validation Schema
 */
export const resetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, 'Token reset password wajib ada'),
  
  password: z
    .string()
    .min(1, VALIDATION_RULES.PASSWORD.REQUIRED)
    .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, `Password minimal ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} karakter`)
    .max(VALIDATION_RULES.PASSWORD.MAX_LENGTH, `Password maksimal ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} karakter`)
    .regex(VALIDATION_RULES.PASSWORD.PATTERN, VALIDATION_RULES.PASSWORD.PATTERN_MESSAGE),
  
  confirmPassword: z
    .string()
    .min(1, 'Konfirmasi password wajib diisi'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
});

/**
 * Change Password Form Validation Schema
 */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Password saat ini wajib diisi'),
  
  newPassword: z
    .string()
    .min(1, VALIDATION_RULES.PASSWORD.REQUIRED)
    .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, `Password minimal ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} karakter`)
    .max(VALIDATION_RULES.PASSWORD.MAX_LENGTH, `Password maksimal ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} karakter`)
    .regex(VALIDATION_RULES.PASSWORD.PATTERN, VALIDATION_RULES.PASSWORD.PATTERN_MESSAGE),
  
  confirmPassword: z
    .string()
    .min(1, 'Konfirmasi password wajib diisi'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'Password baru harus berbeda dengan password saat ini',
  path: ['newPassword'],
});

/**
 * Update Profile Form Validation Schema
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_RULES.NAME.REQUIRED)
    .min(VALIDATION_RULES.NAME.MIN_LENGTH, `Nama minimal ${VALIDATION_RULES.NAME.MIN_LENGTH} karakter`)
    .max(VALIDATION_RULES.NAME.MAX_LENGTH, `Nama maksimal ${VALIDATION_RULES.NAME.MAX_LENGTH} karakter`)
    .regex(VALIDATION_RULES.NAME.PATTERN, VALIDATION_RULES.NAME.PATTERN_MESSAGE),
  
  email: z
    .string()
    .min(1, VALIDATION_RULES.EMAIL.REQUIRED)
    .email(VALIDATION_RULES.EMAIL.INVALID_FORMAT)
    .max(VALIDATION_RULES.EMAIL.MAX_LENGTH, `Email maksimal ${VALIDATION_RULES.EMAIL.MAX_LENGTH} karakter`),
});

// Type inference dari schema
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

/**
 * Utility function untuk validasi email
 */
export const isValidEmail = (email: string): boolean => {
  try {
    forgotPasswordSchema.parse({ email });
    return true;
  } catch {
    return false;
  }
};

/**
 * Utility function untuk validasi password strength
 */
export const isStrongPassword = (password: string): boolean => {
  try {
    const schema = z.string().regex(VALIDATION_RULES.PASSWORD.PATTERN);
    schema.parse(password);
    return password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH;
  } catch {
    return false;
  }
};

/**
 * Password strength checker
 */
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 6) return 'weak';
  
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);
  
  const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  
  if (score < 3 || password.length < 8) return 'weak';
  if (score === 3 && password.length >= 8) return 'medium';
  return 'strong';
};
