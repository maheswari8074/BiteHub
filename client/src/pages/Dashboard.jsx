import { useEffect, useState } from "react";
import { TrendingUp, BarChart } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5555/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-amber-400 font-semibold">
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-20">
          <h1 className="text-4xl font-semibold tracking-wide">
            Welcome, <span className="text-amber-400">{data?.user?.name}</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Here's your order insights & performance overview 🍽️
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-10">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "overview"
                ? "bg-orange-600 text-white"
                : "bg-black/40 text-gray-300 hover:bg-black/60"
            }`}
          >
            <TrendingUp size={18} />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "analytics"
                ? "bg-orange-600 text-white"
                : "bg-black/40 text-gray-300 hover:bg-black/60"
            }`}
          >
            <BarChart size={18} />
            Analytics
          </button>
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-3 gap-6">
            {data?.stats.map((stat) => (
              <div
                key={stat.title}
                className={`p-6 rounded-xl ${stat.color} bg-opacity-10 backdrop-blur-md`}
              >
                <h3 className="text-lg font-medium text-white mb-2">
                  {stat.title}
                </h3>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-amber-400 mb-2">
                Recent Orders
              </h2>
              {data?.recentOrders.length === 0 ? (
                <p className="text-gray-500">No recent orders found.</p>
              ) : (
                <ul className="space-y-3">
                  {data?.recentOrders.map((order, i) => (
                    <li
                      key={i}
                      className="bg-gray-800 p-4 rounded-lg flex justify-between"
                    >
                      <div>
                        <p className="text-white font-medium">{order.item}</p>
                        <p className="text-sm text-gray-400">
                          ₹{order.amount} • {order.status}
                        </p>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-amber-400 mb-2">
                Spending by Cuisine
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data?.spending.map((cuisine, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-800 rounded-lg p-4 text-center"
                  >
                    <p className="text-white font-medium">{cuisine.cuisine}</p>
                    <p className="text-amber-400 text-sm">₹{cuisine.amount}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
