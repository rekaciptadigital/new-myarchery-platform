// Middleware for route protection and authentication
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/organizer/login',
  '/organizer/register',
  '/customer/login',
  '/customer/register',
  '/admin/login',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
];

// Role-specific routes
const adminRoutes = [
  '/admin/dashboard',
  '/admin',
];

const organizerRoutes = [
  '/organizer/dashboard',
  '/events/create',
  '/events/manage',
];

const customerRoutes = [
  '/customer/dashboard',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!token) {
    // Redirect to login with the current path as a return URL
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin routes
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (userRole !== 'system_admin' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Check organizer routes
  if (organizerRoutes.some(route => pathname.startsWith(route))) {
    if (userRole !== 'organizer' && userRole !== 'system_admin' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Check customer routes
  if (customerRoutes.some(route => pathname.startsWith(route))) {
    if (userRole !== 'customer' && userRole !== 'system_admin' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // For all other protected routes, just check authentication
  // The specific permission checks will be handled in the components
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, logos, etc.)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|logos).*)',
  ],
};
