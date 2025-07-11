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
      <div className="min-h-screen flex items-center justify-center text-xl text-amber-400 font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-20">
          <h1 className="text-5xl font-light tracking-wide inline-block relative">
            <span className="italic text-amber-400">Your</span> Dashboard 🍽️
            <span className="block h-[2px] w-16 bg-amber-400 mx-auto mt-3 rounded-full"></span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Manage & monitor your BiteHub journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-10">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-3xl p-3 shadow-inner">
            <nav className="flex justify-center gap-4">
              {[
                {
                  key: "overview",
                  label: "📊 Overview",
                  icon: <TrendingUp size={18} />,
                },
                {
                  key: "analytics",
                  label: "📈 Analytics",
                  icon: <BarChart size={18} />,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 text-sm ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                      : "bg-black/30 text-gray-300 hover:bg-black/50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Active Section */}
        <div className="mt-8">
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
    </div>
  );
};

export default Dashboard;
