'use client';

import Cookies from 'js-cookie';

interface AdminLogoutButtonProps {
  className?: string;
}

const AdminLogoutButton: React.FC<AdminLogoutButtonProps> = ({ className }) => {
  const handleLogout = async () => {
    try {
      // 1. Call the server-side logout API (critical for Vercel/HTTPS)
      await fetch('/api/admin/logout', { method: 'POST' });

      // 2. Client-side cookie cleanup (extra layer of safety)
      Cookies.remove('admin_token', { path: '/' });
      Cookies.remove('admin_token');
      Cookies.remove('next-auth.session-token', { path: '/' });
      Cookies.remove('__Secure-next-auth.session-token', { path: '/' });
      
      // 3. Clear all session and local storage
      window.localStorage.clear();
      window.sessionStorage.clear();

      // 4. Force a hard redirect to the home page
      // This will reset all React state and trigger middleware immediately
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, try to redirect
      window.location.href = '/';
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
