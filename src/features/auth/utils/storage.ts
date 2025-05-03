/**
 * Storage utility for auth tokens
 * Provides secure storage for auth related data
 */

export const StorageKeys = {
  AUTH_TOKEN: 'myarchery_auth_token',
  USER_ROLE: 'myarchery_user_role'
};

export const SecureStorage = {
  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  },
  
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  
  removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  
  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    localStorage.removeItem(StorageKeys.USER_ROLE);
  }
};