// Domain: Auth - Hooks Export
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/hooks/index.ts

// API Hooks
export {
  useLogin,
  useRegister,
  useLogout,
  useRefreshToken,
  useForgotPassword,
  useResetPassword,
  useVerifyEmail,
  useProfile,
  useUpdateProfile,
  useChangePassword,
  useAuthStatus,
  AUTH_QUERY_KEYS,
} from './api/use-auth-api';

// Business Hooks
export {
  useAuthBusiness,
  usePermissions,
  useOrganizations,
} from './business/use-auth-business';

// UI Hooks
export {
  useLoginForm,
  useRegisterForm,
  useForgotPasswordForm,
  useResetPasswordForm,
  usePasswordStrength,
} from './ui/use-auth-forms';
