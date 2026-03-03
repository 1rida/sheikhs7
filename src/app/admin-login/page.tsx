'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  // Explicitly clear states on mount to ensure fields are blank when returning to /admin-login
  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token);
      } else {
        const data = await res.json();
        setError(data.message || 'Invalid credentials');
        // Optionally clear password on failed login
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Admin Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Dummy hidden inputs to confuse password managers and prevent autofill */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <input type="text" name="dummy-username" tabIndex={-1} autoComplete="off" />
          <input type="password" name="dummy-password" tabIndex={-1} autoComplete="off" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
              required
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&#39;t have an account? <Link href="/admin/signup" className="text-green-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
