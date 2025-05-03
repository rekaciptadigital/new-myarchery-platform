/**
 * Token Service
 * Handles JWT token operations and validation
 */
import { Session } from '../models/credentials';

interface JwtPayload {
  exp?: number;
  user_metadata?: {
    role?: string;
  };
  // Using Record<string, unknown> instead of [key: string]: any
  // This maintains flexibility while avoiding the explicit 'any' type
  [key: string]: unknown;
}

export class TokenService {
  static getTokenInfo(token: string): JwtPayload | null {
    return parseJwt(token);
  }
  
  static isSessionValid(session: Session | null): boolean {
    if (!session?.access_token) return false;
    
    // Check if token is expired
    if (session.expires_at && session.expires_at < Date.now() / 1000) {
      return false;
    }
    
    return !isTokenExpired(session.access_token);
  }
  
  static getRoleFromToken(token: string): string | null {
    try {
      const payload = parseJwt(token);
      return payload?.user_metadata?.role ?? null;
    } catch (error) {
      console.error('Error retrieving role from token:', error);
      return null;
    }
  }
}

/**
 * Parse a JWT token and return the payload
 */
function parseJwt(token: string): JwtPayload | null {
  if (!token) return null;
  
  try {
    const parts = token.split('.');
    if (!parts || parts.length < 2) return null;
    
    const base64Url = parts[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}

/**
 * Check if a token is expired
 */
function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload?.exp) return true;
  
  const expiryDate = new Date(payload.exp * 1000); // Convert seconds to milliseconds
  return expiryDate <= new Date();
}