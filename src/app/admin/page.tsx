import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

export default function AdminDashboardPage() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-gray-700">Welcome to the admin panel. Use the sidebar to navigate.</p>
        <AnalyticsDashboard />
        <AdminLogoutButton />
      </div>
    );
  }
