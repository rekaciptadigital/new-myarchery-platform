/**
 * Public exports for auth models
 */
export * from './user';
export * from './credentials';
export * from './validation';

export enum UserRole {
  ATHLETE = "athlete",
  ORGANIZER = "organizer",
  ADMIN = "admin"
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  // Add other user properties as needed
}