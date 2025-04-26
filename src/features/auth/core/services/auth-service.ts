import { AuthResponse } from "../models/auth-models";
import { UserRole } from "../models";
import { User, Session } from "@supabase/supabase-js";

// Export this interface so it can be imported in other files
export interface LoginCredentials {
  email: string;
  password: string;
  role?: UserRole;
}

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // MOCK IMPLEMENTATION: Skip Supabase authentication for now
    // Return mock user and session data
    const mockUser: User = {
      id: "mock-user-id",
      email: credentials.email,
      user_metadata: {
        role: credentials.role ?? "customer",
        name: "Mock User",
      },
      app_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as User;  // Type assertion since we're not providing all required User properties

    const mockSession: Session = {
      access_token: "mock-access-token",
      refresh_token: "mock-refresh-token",
      user: mockUser,
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    } as Session;  // Type assertion since we're not providing all required Session properties

    return {
      user: mockUser,
      session: mockSession,
    };

    /* ORIGINAL IMPLEMENTATION (commented out)
    const supabase = createClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Verify user role matches requested role if a role was specified
    if (credentials.role) {
      const userRole = data.user?.user_metadata?.role;
      
      if (userRole !== credentials.role) {
        // If roles don't match, sign out immediately and throw error
        await supabase.auth.signOut();
        throw new Error(`Akun ini tidak terdaftar sebagai ${credentials.role}. Silakan login dengan akun yang sesuai.`);
      }
    }
    
    return {
      user: data.user,
      session: data.session,
    };
    */
  },
  
  async logout(): Promise<void> {
    // MOCK IMPLEMENTATION: Just return without doing anything
    return Promise.resolve();

    /* ORIGINAL IMPLEMENTATION (commented out)
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }
    */
  },
  
  async getCurrentUser() {
    // MOCK IMPLEMENTATION: Return null to indicate no user is logged in initially
    return null;

    /* ORIGINAL IMPLEMENTATION (commented out)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
    */
  },
  
  async getSession() {
    // MOCK IMPLEMENTATION: Return null to indicate no session initially
    return null;

    /* ORIGINAL IMPLEMENTATION (commented out)
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
    */
  }
};
