'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AdminLogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the admin token cookie explicitly for the root path
    Cookies.remove('admin_token', { path: '/' }); 
    
    // Also remove without path just in case
    Cookies.remove('admin_token');

    // Force a complete page refresh to clear state and trigger middleware
    window.location.href = '/admin/login';
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
};

export default AdminLogoutButton;
