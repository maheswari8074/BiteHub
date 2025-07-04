import React from "react";
import { Package, Star } from 'lucide-react';

const RecentOrders = ({ orders }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!orders.length) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
        <Package size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">No recent orders found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="p-6 border rounded-2xl hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                  {order.restaurant.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{order.restaurant.name}</h4>
                  <p className="text-sm text-gray-600">{order.restaurant.cuisine}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
                <p className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
              </div>
            </div>
            <div className="flex justify-between text-gray-700 text-sm">
              <p>Total: {formatCurrency(order.total)}</p>
              <p>{order.items.length} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
