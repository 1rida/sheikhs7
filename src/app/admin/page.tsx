import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

export default function AdminDashboardPage() {
    return (
      <div className="p-0 md:p-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Admin Dashboard</h1>
        <p className="text-gray-700 mb-6">Welcome to the admin panel. Use the sidebar to navigate.</p>
        <AnalyticsDashboard />
        <div className="mt-8">
          <AdminLogoutButton />
        </div>
      </div>
    );
  }
