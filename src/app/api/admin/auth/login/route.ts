import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Dummy credentials for now
  const DUMMY_ADMIN_EMAIL = 'admin@example.com';
  const DUMMY_ADMIN_PASSWORD = 'password';

  if (email === DUMMY_ADMIN_EMAIL && password === DUMMY_ADMIN_PASSWORD) {
    // In a real application, you would generate a JWT token or similar
    // For this task, simply return a success response
    return NextResponse.json({ message: 'Authentication successful' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Access Denied' }, { status: 401 });
  }
}
