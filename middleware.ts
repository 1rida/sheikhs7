import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token');
  const { pathname } = request.nextUrl;

  // Paths that should trigger unauthorized message if not logged in
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && pathname !== '/admin/signup' && !adminToken) {
    // Redirect to the unauthorized page instead of login
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // If already logged in and trying to access login/signup page, redirect to admin dashboard
  if ((pathname === '/admin/login' || pathname === '/admin/signup') && adminToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Configure the paths where the middleware should run
export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to all paths under /admin
};
