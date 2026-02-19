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
    return <div className="p-4">Loading analytics data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!analyticsData) {
    return <div className="p-4">No analytics data available.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cart Events</h2>
        {analyticsData.cartEvents.length === 0 ? (
          <p>No cart events recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Product ID</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">User ID</th>
                  <th className="py-2 px-4 border-b">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.cartEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="py-2 px-4 border-b">{event.id}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${event.type === 'add' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {event.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">{event.productId}</td>
                    <td className="py-2 px-4 border-b">{event.quantity}</td>
                    <td className="py-2 px-4 border-b">{event.userId}</td>
                    <td className="py-2 px-4 border-b">{new Date(event.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Checkout Events</h2>
        {analyticsData.checkoutEvents.length === 0 ? (
          <p>No checkout events recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Customer Details</th>
                  <th className="py-2 px-4 border-b">Cart Items</th>
                  <th className="py-2 px-4 border-b">Total Amount</th>
                  <th className="py-2 px-4 border-b">Timestamp</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.checkoutEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="py-2 px-4 border-b">{event.id}</td>
                    <td className="py-2 px-4 border-b text-sm">
                      <p><strong>Name:</strong> {event.customerDetails?.name}</p>
                      <p><strong>Phone:</strong> {event.customerDetails?.phone}</p>
                      <p><strong>Addr:</strong> {event.customerDetails?.address}</p>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {event.cartItems.map(item => `${item.productId} (x${item.quantity})`).join(', ')}
                    </td>
                    <td className="py-2 px-4 border-b">PKR. {event.totalAmount.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{new Date(event.timestamp).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{event.status}</td>
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
