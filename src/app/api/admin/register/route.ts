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

    // Check if user already exists
    if (users.find((u: any) => u.username === username)) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user
    const newUser = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
    };

    users.push(newUser);

    // Save users back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
