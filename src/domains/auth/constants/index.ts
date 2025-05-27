// Domain: Auth - Constants
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/constants/index.ts

/**
 * Environment Configuration
 */
export const AUTH_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  AUTH_COOKIE_NAME: process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ?? 'auth-token',
  REFRESH_TOKEN_COOKIE_NAME: process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME ?? 'refresh-token',
  ENABLE_REGISTRATION: process.env.NEXT_PUBLIC_ENABLE_REGISTRATION === 'true',
  ENABLE_EMAIL_VERIFICATION: process.env.NEXT_PUBLIC_ENABLE_EMAIL_VERIFICATION === 'true',
} as const;

/**
 * API Endpoints untuk Authentication
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
} as const;

/**
 * Routes untuk Authentication
 */
export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  // Role-based login routes
  ORGANIZER_LOGIN: '/organizer/login',
  CUSTOMER_LOGIN: '/customer/login',
  ADMIN_LOGIN: '/admin/login',
} as const;

/**
 * Redirect Routes setelah Authentication
 */
export const REDIRECT_ROUTES = {
  AFTER_LOGIN: '/dashboard',
  AFTER_ORGANIZER_LOGIN: '/dashboard',
  AFTER_CUSTOMER_LOGIN: '/customer/dashboard',
  AFTER_ADMIN_LOGIN: '/admin/dashboard',
  AFTER_LOGOUT: '/login',
  AFTER_REGISTER: '/login',
} as const;

/**
 * Error Messages
 */
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Email atau password tidak valid',
  ACCOUNT_LOCKED: 'Akun Anda telah dikunci. Silakan hubungi administrator',
  EMAIL_NOT_VERIFIED: 'Email belum diverifikasi. Silakan cek email Anda',
  PASSWORD_MISMATCH: 'Password tidak cocok',
  WEAK_PASSWORD: 'Password terlalu lemah. Gunakan minimal 8 karakter dengan kombinasi huruf, angka, dan simbol',
  EMAIL_ALREADY_EXISTS: 'Email sudah terdaftar',
  INVALID_EMAIL: 'Format email tidak valid',
  NETWORK_ERROR: 'Terjadi kesalahan jaringan. Silakan coba lagi',
  SESSION_EXPIRED: 'Sesi Anda telah berakhir. Silakan login kembali',
  UNAUTHORIZED: 'Anda tidak memiliki akses untuk melakukan tindakan ini',
  FORBIDDEN: 'Akses ditolak',
  RATE_LIMITED: 'Terlalu banyak percobaan. Silakan coba lagi dalam beberapa menit',
  SERVER_ERROR: 'Terjadi kesalahan server. Silakan coba lagi nanti',
} as const;

/**
 * Success Messages
 */
export const AUTH_SUCCESS = {
  LOGIN_SUCCESS: 'Login berhasil',
  REGISTER_SUCCESS: 'Registrasi berhasil. Silakan cek email untuk verifikasi',
  LOGOUT_SUCCESS: 'Logout berhasil',
  PASSWORD_RESET_SENT: 'Link reset password telah dikirim ke email Anda',
  PASSWORD_RESET_SUCCESS: 'Password berhasil direset',
  FORGOT_PASSWORD_SUCCESS: 'Link reset password telah dikirim ke email Anda',
  RESET_PASSWORD_SUCCESS: 'Password berhasil direset. Silakan login dengan password baru',
  EMAIL_VERIFIED: 'Email berhasil diverifikasi',
  PROFILE_UPDATED: 'Profil berhasil diperbarui',
  PASSWORD_CHANGED: 'Password berhasil diubah',
} as const;

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  EMAIL: {
    REQUIRED: 'Email wajib diisi',
    INVALID_FORMAT: 'Format email tidak valid',
    MAX_LENGTH: 255,
  },
  PASSWORD: {
    REQUIRED: 'Password wajib diisi',
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    PATTERN_MESSAGE: 'Password harus mengandung minimal 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 karakter khusus',
  },
  NAME: {
    REQUIRED: 'Nama wajib diisi',
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z\s]+$/,
    PATTERN_MESSAGE: 'Nama hanya boleh berisi huruf dan spasi',
  },
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'myarchery_access_token',
  REFRESH_TOKEN: 'myarchery_refresh_token',
  USER_DATA: 'myarchery_user_data',
  REMEMBER_ME: 'myarchery_remember_me',
  THEME: 'myarchery_theme',
  LANGUAGE: 'myarchery_language',
  CURRENT_ORG: 'myarchery_current_org',
} as const;

/**
 * Session Configuration
 */
export const SESSION_CONFIG = {
  ACCESS_TOKEN_EXPIRY: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  REMEMBER_ME_EXPIRY: 30 * 24 * 60 * 60 * 1000, // 30 days
  IDLE_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  REFRESH_THRESHOLD: 5 * 60 * 1000, // Refresh when 5 minutes left
} as const;

/**
 * Permission Constants
 */
export const PERMISSIONS = {
  // System Permissions
  SYSTEM_ADMIN: 'system:admin',
  
  // User Management
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_DELETE: 'user:delete',
  
  // Organization Management
  ORG_READ: 'organization:read',
  ORG_WRITE: 'organization:write',
  ORG_DELETE: 'organization:delete',
  ORG_MEMBERS: 'organization:members',
  
  // Scoring Domain
  SCORING_READ: 'scoring:read',
  SCORING_WRITE: 'scoring:write',
  SCORING_ADMIN: 'scoring:admin',
  
  // Events Domain
  EVENTS_READ: 'events:read',
  EVENTS_WRITE: 'events:write',
  EVENTS_ADMIN: 'events:admin',
  
  // Clubs Domain
  CLUBS_READ: 'clubs:read',
  CLUBS_WRITE: 'clubs:write',
  CLUBS_ADMIN: 'clubs:admin',
} as const;

/**
 * Role Definitions
 */
export const ROLES = {
  SYSTEM_ADMIN: {
    name: 'System Administrator',
    level: 100,
    permissions: [PERMISSIONS.SYSTEM_ADMIN],
  },
  ORGANIZER: {
    name: 'Event Organizer',
    level: 50,
    permissions: [
      PERMISSIONS.USER_READ,
      PERMISSIONS.ORG_READ,
      PERMISSIONS.ORG_WRITE,
      PERMISSIONS.EVENTS_READ,
      PERMISSIONS.EVENTS_WRITE,
      PERMISSIONS.SCORING_READ,
      PERMISSIONS.SCORING_WRITE,
    ],
  },
  MEMBER: {
    name: 'Member',
    level: 10,
    permissions: [
      PERMISSIONS.USER_READ,
      PERMISSIONS.ORG_READ,
      PERMISSIONS.EVENTS_READ,
      PERMISSIONS.SCORING_READ,
    ],
  },
} as const;
