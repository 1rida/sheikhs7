import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token');
  const { pathname } = request.nextUrl;

  // If trying to access an admin route and not logged in, redirect to login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !adminToken) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If already logged in and trying to access login page, redirect to admin dashboard
  if (pathname === '/admin/login' && adminToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Configure the paths where the middleware should run
export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to all paths under /admin
};
