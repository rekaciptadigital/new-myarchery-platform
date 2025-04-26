import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const isOrganizerRoute = req.nextUrl.pathname.startsWith('/organizer');
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isCustomerRoute = req.nextUrl.pathname.startsWith('/customer');
  
  // For now, allow all access to the organizer dashboard for development purposes
  // In a production environment, you would check authentication and roles here
  
  if (isOrganizerRoute || isAdminRoute || isCustomerRoute) {
    // This is a placeholder for real auth check - for dev we just let it through
    // When implementing real auth, uncomment the below code:
    /*
    // Check if user is authenticated
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    
    // Check role (simplified example - actual implementation would decode and validate the token)
    const userRole = getUserRoleFromToken(token);
    
    // Validate role-based access
    if (isOrganizerRoute && userRole !== 'organizer') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    */
  }
  
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
