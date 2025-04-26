import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect from old URL pattern to new URL pattern for login routes
  if (pathname === '/login/customer') {
    return NextResponse.redirect(new URL('/customer/login', req.url));
  }

  if (pathname === '/login/organizer') {
    return NextResponse.redirect(new URL('/organizer/login', req.url));
  }

  // Continue with existing middleware logic
  return NextResponse.next();
}

// Update the config to include the login routes in the matcher
export const config = {
  matcher: [
    // Apply this middleware to all routes that require auth
    '/admin/:path*',
    '/organizer/:path*',
    '/customer/:path*',
    // Add redirects for old routes
    '/login/customer',
    '/login/organizer',
    // Exclude auth routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
