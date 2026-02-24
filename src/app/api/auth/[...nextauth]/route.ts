import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import path from 'path';
import { promises as fs } from 'fs';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

// Helper function to read users from file
async function readUsers(): Promise<User[]> {
  try {
    const fileContents = await fs.readFile(usersFilePath, 'utf8');
    const parsed = JSON.parse(fileContents);
    // Ensure the structure is an array of users
    if (Array.isArray(parsed) && parsed.every(item => 'id' in item && 'email' in item && 'name' in item)) {
        return parsed as User[];
    }
    return [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // File does not exist, return an empty array
      return [];
    }
    console.error("Error reading users.json:", error);
    return [];
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const currentUsers: User[] = await readUsers();
        const user = currentUsers.find((u) => u.email === credentials.email);

        if (user && user.password && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
