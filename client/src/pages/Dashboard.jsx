import { useEffect, useState } from "react";
import OverviewSection from "../components/dashboard/OverviewSection";
import AnalyticsSection from "../components/dashboard/AnalyticsSection";
import { TrendingUp, BarChart } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5555/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch dashboard data");

      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await fetchDashboardData();
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-orange-600 font-medium">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            BiteHub Dashboard 🍽️
          </h1>
          <p className="text-gray-600 text-lg">
            Your personalized food delivery experience
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-3xl shadow-lg p-2">
            <nav className="flex space-x-2">
              {[
                {
                  key: "overview",
                  label: "📊 Overview",
                  icon: <TrendingUp size={20} />,
                },
                {
                  key: "analytics",
                  label: "📈 Analytics",
                  icon: <BarChart size={20} />,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-3 px-6 rounded-2xl font-medium text-sm transition-all ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Section */}
        {activeTab === "overview" && (
          <OverviewSection
            userData={dashboardData?.user}
            dashboardData={dashboardData}
          />
        )}
        {activeTab === "analytics" && (
          <AnalyticsSection dashboardData={dashboardData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
