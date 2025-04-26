// Type definitions for MyArchery Platform

declare module '@/features/auth/adapters/admin/AdminLoginAdapter' {
  export function AdminLoginAdapter(): JSX.Element;
}

declare module '@/lib/supabase/client' {
  import { SupabaseClient } from '@supabase/supabase-js';
  export function createClient(): SupabaseClient;
}
