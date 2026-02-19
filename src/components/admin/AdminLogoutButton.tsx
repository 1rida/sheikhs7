'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AdminLogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('admin_token'); // Clear the admin token cookie
    router.push('/admin/login'); // Redirect to the admin login page
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
