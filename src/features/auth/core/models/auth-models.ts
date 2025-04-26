import { User, Session } from "@supabase/supabase-js";

export enum UserRole {
  ADMIN = "admin",
  ORGANIZER = "organizer",
  CUSTOMER = "customer"
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole | string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}
