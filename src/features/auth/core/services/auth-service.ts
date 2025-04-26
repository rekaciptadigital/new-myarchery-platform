import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  error: Error | null;
}

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    return {
      user: data?.user ?? null,
      error: error ? new Error(error.message) : null,
    };
  },

  async logout(): Promise<{ error: Error | null }> {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    
    return {
      error: error ? new Error(error.message) : null,
    };
  },

  async getCurrentUser(): Promise<User | null> {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    return data?.user ?? null;
  }
};
