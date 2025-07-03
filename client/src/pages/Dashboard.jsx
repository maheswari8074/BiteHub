import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("📦 Sending token:", token);
      

      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ Dashboard response:", res.data);
        setUserData(res.data.user);
      } catch (err) {
        console.error("❌ Dashboard fetch failed:", err);
        setError(err.response?.data?.error || "Unauthorized");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {error && <p className="text-red-600">{error}</p>}

      {userData && (
        <div className="bg-white p-4 rounded shadow">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
