// TEMPORARY: Mock Supabase client implementation
// Real implementation is disabled until Supabase integration is needed
export const createClient = () => {
  console.log('Using mock Supabase client - Supabase integration disabled');
  
  // Define mock response objects
  const mockQueryResult = {
    data: null,
    error: null,
    single: async () => null
  };
  
  // Create a flatter client structure
  return {
    // Mock auth methods
    auth: {
      onAuthStateChange: () => ({ 
        data: { subscription: { unsubscribe: () => {} } } 
      }),
      getSession: async () => null,
      // Add other auth methods as needed
    },
    // Mock database methods
    from: () => ({
      select: () => ({
        eq: () => mockQueryResult,
      }),
    }),
    // Add other Supabase client methods as needed
  };
};
