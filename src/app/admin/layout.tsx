import Link from 'next/link';
import React from 'react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <div className="text-2xl font-bold mb-6">Admin Panel</div>
        <nav>
          <ul className="space-y-3">
            <li>
              <Link href="/admin" className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                Products
              </Link>
            </li>
            {/* Add more admin links here */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
