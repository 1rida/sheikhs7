'use client';

import Cookies from 'js-cookie';

interface AdminLogoutButtonProps {
  className?: string;
}

const AdminLogoutButton: React.FC<AdminLogoutButtonProps> = ({ className }) => {
  const handleLogout = () => {
    // Clear the admin token cookie explicitly for the root path
    Cookies.remove('admin_token', { path: '/' }); 
    Cookies.remove('admin_token');
    
    // Also clear common next-auth cookies just in case
    Cookies.remove('next-auth.session-token', { path: '/' });
    Cookies.remove('__Secure-next-auth.session-token', { path: '/' });
    Cookies.remove('next-auth.csrf-token', { path: '/' });
    Cookies.remove('next-auth.callback-url', { path: '/' });

    // Force a hard redirect to the home page
    // This will clear all React state and trigger the middleware on the next request
    window.location.href = '/';
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
