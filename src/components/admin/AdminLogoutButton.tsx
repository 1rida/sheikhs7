'use client';

import { useAuth } from '@/context/AuthContext';

interface AdminLogoutButtonProps {
  className?: string;
}

const AdminLogoutButton: React.FC<AdminLogoutButtonProps> = ({ className }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // 1. Call the server-side logout API
      await fetch('/api/admin/logout', { method: 'POST' });

      // 2. Client-side cleanup and redirect via AuthContext
      logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, clear local state
      logout();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={className || "mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full text-center font-bold"}
    >
      Logout
    </button>
  );
};

export default AdminLogoutButton;
