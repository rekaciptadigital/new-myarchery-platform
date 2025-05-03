/**
 * Authentication repository
 * MOCK VERSION - for UI development without Supabase integration
 */
import { LoginCredentials, AuthResponse, Session } from './models/credentials';
import { User, UserRole } from './models/user';

// Mock data
const MOCK_USER: User = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'demo@myarchery.id',
  displayName: 'Demo User',
  role: UserRole.ORGANIZER,
  metadata: {
    display_name: 'Demo User',
    role: 'organizer'
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const MOCK_SESSION: Session = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_at: Date.now() + 3600000, // 1 hour from now
  token_type: 'bearer'
};

export const AuthRepository = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('MOCK LOGIN:', credentials);
    
    // Simple validation to ensure fields aren't empty
    if (!credentials.email || !credentials.password) {
      throw new Error('Email dan password wajib diisi');
    }
    
    // DEVELOPMENT MODE: Accept any non-empty email/password combination
    // Remove the email validation check that was here before
    
    // Create a mock user with the role from credentials if provided
    const mockUser = {
      ...MOCK_USER,
      // Override role if provided in credentials
      role: credentials.role ?? MOCK_USER.role,
      // Use the provided email in credentials
      email: credentials.email,
    };

    // Return successful mock response after a slight delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      user: mockUser,
      session: MOCK_SESSION
    };
  },
  
  async logout(): Promise<void> {
    console.log('MOCK LOGOUT');
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
  },
  
  async getCurrentUser(): Promise<User | null> {
    console.log('MOCK GET CURRENT USER');
    // Return mock user data
    return MOCK_USER;
  },
  
  async getSession(): Promise<Session | null> {
    console.log('MOCK GET SESSION');
    // Return mock session data
    return MOCK_SESSION;
  }
};