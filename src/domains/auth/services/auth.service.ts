// Domain: Auth - API Service
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/services/auth.service.ts

import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  VerifyEmailRequest,
  RefreshTokenRequest,
  User,
} from '../types';
import { AUTH_ENDPOINTS, AUTH_ERRORS, AUTH_CONFIG, STORAGE_KEYS } from '../constants';

/**
 * HTTP Client with error handling
 */
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = AUTH_CONFIG.API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(AUTH_ERRORS.NETWORK_ERROR);
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorMessage: string;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || 'Unknown error';
    } catch {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }

    // Map common HTTP status codes to user-friendly messages
    switch (response.status) {
      case 400:
        throw new Error(errorMessage || AUTH_ERRORS.INVALID_CREDENTIALS);
      case 401:
        throw new Error(AUTH_ERRORS.UNAUTHORIZED);
      case 403:
        throw new Error(AUTH_ERRORS.FORBIDDEN);
      case 404:
        throw new Error('Resource not found');
      case 422:
        throw new Error(errorMessage || 'Validation error');
      case 429:
        throw new Error(AUTH_ERRORS.RATE_LIMITED);
      case 500:
        throw new Error(AUTH_ERRORS.SERVER_ERROR);
      default:
        throw new Error(errorMessage || AUTH_ERRORS.NETWORK_ERROR);
    }
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

/**
 * Authentication Service
 */
export class AuthService {
  private api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  /**
   * Login user
   */
  async login(request: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>(
        AUTH_ENDPOINTS.LOGIN,
        request
      );
      
      // Store tokens securely
      this.storeAuthTokens(response.tokens, request.rememberMe);
      
      return response;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Register new user
   */
  async register(request: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>(
        AUTH_ENDPOINTS.REGISTER,
        request
      );
      
      return response;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await this.api.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearAuthTokens();
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error(AUTH_ERRORS.SESSION_EXPIRED);
    }

    try {
      const request: RefreshTokenRequest = { refreshToken };
      const response = await this.api.post<AuthResponse>(
        AUTH_ENDPOINTS.REFRESH,
        request
      );
      
      // Update stored tokens
      this.storeAuthTokens(response.tokens);
      
      return response;
    } catch (error) {
      // Clear tokens if refresh fails
      this.clearAuthTokens();
      throw this.handleAuthError(error);
    }
  }

  /**
   * Send forgot password email
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      return await this.api.post<ForgotPasswordResponse>(
        AUTH_ENDPOINTS.FORGOT_PASSWORD,
        request
      );
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(request: ResetPasswordRequest): Promise<void> {
    try {
      await this.api.post(AUTH_ENDPOINTS.RESET_PASSWORD, request);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Verify email with token
   */
  async verifyEmail(request: VerifyEmailRequest): Promise<void> {
    try {
      await this.api.post(AUTH_ENDPOINTS.VERIFY_EMAIL, request);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    try {
      return await this.api.get<User>(AUTH_ENDPOINTS.PROFILE);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      return await this.api.put<User>(AUTH_ENDPOINTS.PROFILE, data);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await this.api.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const payload = this.parseJwtPayload(token);
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  /**
   * Get access token from storage
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Get refresh token from storage
   */
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Store authentication tokens
   */
  private storeAuthTokens(tokens: any, rememberMe?: boolean): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
    } else {
      sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    }
  }

  /**
   * Clear authentication tokens
   */
  private clearAuthTokens(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ORG);
    
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Parse JWT payload
   */
  private parseJwtPayload(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  /**
   * Handle authentication errors
   */
  private handleAuthError(error: any): Error {
    if (error instanceof Error) {
      return error;
    }
    
    if (typeof error === 'string') {
      return new Error(error);
    }
    
    return new Error(AUTH_ERRORS.NETWORK_ERROR);
  }
}

// Export singleton instance
export const authService = new AuthService();
