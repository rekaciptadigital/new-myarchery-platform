/**
 * useSession hook
 * React hook for managing authentication session
 */
import { useState, useEffect } from 'react';
import { Session } from '../models/credentials';
import { User } from '../models/user';
import { AuthService } from '../services/auth-service';
import { TokenService } from '../services/token-service';
import { createClient } from '@/lib/supabase/client';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchSessionAndUser = async () => {
      try {
        const sessionData = await AuthService.getSession();
        setSession(sessionData);
        
        if (sessionData && TokenService.isSessionValid(sessionData)) {
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSessionAndUser();
    
    // Set up a listener for auth state changes
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(newSession);
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
  return {
    session,
    user,
    loading,
    isAuthenticated: !!session && !!user,
  };
}