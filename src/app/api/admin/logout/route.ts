import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  );

  // Clear the admin_token cookie on the server side
  response.cookies.set('admin_token', '', {
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // Also try to clear common next-auth cookies
  response.cookies.set('next-auth.session-token', '', { path: '/', expires: new Date(0) });
  response.cookies.set('__Secure-next-auth.session-token', '', { path: '/', expires: new Date(0) });

  return response;
}
