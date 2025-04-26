import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Redirect old login path to home page
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  // Add other middleware logic as needed

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Add '/login' to your middleware matchers
    '/login',
    // Your other patterns
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
