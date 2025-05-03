/**
 * User model for authentication
 * Defines the core user entity and related role functionality
 */

export enum UserRole {
  ADMIN = "admin",
  ORGANIZER = "organizer",
  CUSTOMER = "customer"
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: UserRole;
  metadata?: Record<string, unknown>; // Changed from any to unknown for better type safety
  createdAt: string;
  updatedAt: string;
}

// Domain methods
export function isAdmin(user: User): boolean {
  return user.role === UserRole.ADMIN;
}

export function isOrganizer(user: User): boolean {
  return user.role === UserRole.ORGANIZER;
}

export function isCustomer(user: User): boolean {
  return user.role === UserRole.CUSTOMER;
}