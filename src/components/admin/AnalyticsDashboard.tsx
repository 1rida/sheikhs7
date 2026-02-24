'use client';

import React, { useEffect, useState } from 'react';

interface CartEvent {
  id: string;
  productId: string;
  quantity: number;
  type: 'add' | 'remove';
  userId: string;
  timestamp: string;
}

interface CheckoutEvent {
  id: string;
  cartItems: Array<{ productId: string; quantity: number }>;
  totalAmount: number;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  userId: string;
  timestamp: string;
  status: string;
}

interface AnalyticsData {
  cartEvents: CartEvent[];
  checkoutEvents: CheckoutEvent[];
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: AnalyticsData = await response.json();
        setAnalyticsData(data);
      } catch (e: unknown) {
        let message = 'An unknown error occurred.';
        if (e instanceof Error) {
          message = e.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading analytics data...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (!analyticsData) {
    return <div className="p-4 text-center">No analytics data available.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Analytics Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-3">Cart Events</h2>
        {analyticsData.cartEvents.length === 0 ? (
          <p className="p-2 bg-white shadow-sm rounded-md">No cart events recorded yet.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Product ID
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Quantity
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    User ID
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.cartEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                      {event.id.substring(0, 8)}...
                    </td>
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${event.type === 'add' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {event.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm hidden sm:table-cell">
                      {event.productId.substring(0, 8)}...
                    </td>
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
                      {event.quantity}
                    </td>
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm hidden lg:table-cell">
                      {event.userId.substring(0, 8)}...
                    </td>
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg md:text-xl font-semibold mb-3">Checkout Events</h2>
        {analyticsData.checkoutEvents.length === 0 ? (
          <p className="p-2 bg-white shadow-sm rounded-md">No checkout events recorded yet.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Customer Details
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Items & Total
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.checkoutEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                      {event.id.substring(0, 8)}...
                    </td>
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm hidden sm:table-cell">
                      <p className="text-gray-900 font-semibold">{event.customerDetails?.name}</p>
                      <p className="text-gray-600 text-xs">{event.customerDetails?.phone}</p>
                    </td>
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900">PKR. {event.totalAmount.toFixed(2)}</p>
                      <p className="text-gray-600 text-xs">
                        {event.cartItems.map(item => `${item.productId.substring(0,4)} (x${item.quantity})`).join(', ')}
                      </p>
                    </td>
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {event.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AnalyticsDashboard;
