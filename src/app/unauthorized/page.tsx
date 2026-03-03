'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">401 - Unauthorized</h1>
        <p className="text-gray-600 mb-8">
          You do not have permission to access the admin dashboard. 
          Please log in with an administrator account to continue.
        </p>
        <div className="space-y-4">
          <Link 
            href="/admin/login" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Go to Admin Login
          </Link>
          <Link 
            href="/" 
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
