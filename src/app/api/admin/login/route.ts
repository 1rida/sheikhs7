import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    // Read existing users
    const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
    const users = JSON.parse(fileContent);

    interface User {
      username: string;
      password: string;
    }

    // Find the user
    const user = users.find((u: User) => u.username === username);

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Return success response
    return NextResponse.json({ message: 'Login successful', token: 'true' }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Error logging in' }, { status: 500 });
  }
}
