import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { UserRole } from '@/features/auth/models/user';

// Helper function to determine the appropriate login path
function getLoginPath(path: string): string {
  if (path.startsWith('/admin')) return '/admin/login';
  if (path.startsWith('/organizer')) return '/organizer/login';
  if (path.startsWith('/customer')) return '/customer/login';
  return '/login';
}

// Helper function to validate user role against route
function isAuthorizedForRoute(path: string, userRole?: UserRole): boolean {
  if (path.startsWith('/admin') && userRole !== UserRole.ADMIN) return false;
  if (path.startsWith('/organizer') && userRole !== UserRole.ORGANIZER) return false;
  if (path.startsWith('/customer') && userRole !== UserRole.CUSTOMER) return false;
  return true;
}

export async function middleware(req: NextRequest) {
  // DEVELOPMENT MODE flag - set to true to bypass authentication
  const DEVELOPMENT_MODE = true;
  
  // Only execute authentication checks if not in development mode
  if (!DEVELOPMENT_MODE) {
    const path = req.nextUrl.pathname;
    
    // Skip auth check for login pages
    if (path.endsWith('/login')) {
      return NextResponse.next();
    }
    
    // Only check protected routes
    if (path.startsWith('/organizer') || path.startsWith('/admin') || path.startsWith('/customer')) {
      const supabase = createClient();
      
      // Handle the response more defensively for mock/development purposes
      const sessionResponse = await supabase.auth.getSession();
      const session = sessionResponse?.data?.session || null;
      
      // Redirect to login if no session
      if (!session) {
        const loginPath = getLoginPath(path);
        return NextResponse.redirect(new URL(loginPath, req.url));
      }
      
      // Check role-based access
      const userRole = session?.user?.user_metadata?.role as UserRole;
      if (!isAuthorizedForRoute(path, userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  }
  
  // Default: allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply this middleware to all routes that require auth
    '/organizer/:path*',
    '/admin/:path*',
    '/customer/:path*',
  ],
};
