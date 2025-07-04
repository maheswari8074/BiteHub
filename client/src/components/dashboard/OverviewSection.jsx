// components/dashboard/OverviewSection.jsx
import StatsCards from "./StatsCards";
import OrderTrendsChart from "./OrderTrendsChart";
import SpendingPieChart from "./SpendingPieChart";
import RecentOrders from "./RecentOrders";
import { ChefHat } from "lucide-react";

const OverviewSection = ({ userData, dashboardData }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 text-white opacity-10">
          <ChefHat size={200} />
        </div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              Welcome back, {userData?.name || "User"}! 🍽️
            </h2>
            <p className="text-orange-100 text-lg mb-4">
              Ready for your next delicious meal?
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  {userData?.tier} Member
                </span>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  {dashboardData.stats.loyaltyPoints} Points
                </span>
              </div>
            </div>
          </div>
          {userData?.avatar && (
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={userData.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <StatsCards stats={dashboardData.stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OrderTrendsChart trends={dashboardData.orderTrends} />
        <SpendingPieChart spending={dashboardData.spendingAnalytics} />
      </div>
      <RecentOrders orders={dashboardData.recentOrders} />
    </div>
  );
};

export default OverviewSection;
