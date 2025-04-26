export interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

export enum UserRole {
  ADMIN = 'admin',
  ORGANIZER = 'organizer',
  CUSTOMER = 'customer',
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  avatarUrl?: string;
}
