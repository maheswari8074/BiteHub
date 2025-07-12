import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newType, setNewType] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newDefault, setNewDefault] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:5555/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      const result = await res.json();

      setUser(result.user);
      setOrders(result.orders || []);
      setFavorites(result.favorites || []);
      setAddresses(result.addresses || []);
      setEditedName(result.user.name);
      setEditedPhone(result.user.phone || "");
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchDashboardData();
    }
  }, [navigate]);

  const handleEditProfile = async () => {
    try {
      const res = await fetch("http://localhost:5555/api/profile/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editedName, phone: editedPhone }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      setUser((prev) => ({
        ...prev,
        name: editedName,
        phone: editedPhone,
      }));
      setEditMode(false);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  const handleChangePassword = async () => {
    try {
      const res = await fetch(
        "http://localhost:5555/api/profile/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      if (!res.ok) throw new Error("Password change failed");
      setOldPassword("");
      setNewPassword("");
      setShowPasswordModal(false);
      alert("Password changed successfully!");
    } catch (err) {
      console.error("Change password error:", err);
      alert("Password change failed. Please try again.");
    }
  };

  const handleCheckout = async (item) => {
    try {
      const res = await fetch("http://localhost:5555/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [item],
          amount: item.price,
          restaurant: item.restaurant,
        }),
      });
      if (res.ok) {
        alert("✅ Order placed!");
        fetchDashboardData();
      } else throw new Error("Order failed");
    } catch (e) {
      console.error(e);
      alert("❌ Checkout error");
    }
  };

  const handleFavorite = async (item) => {
    try {
      const res = await fetch("http://localhost:5555/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: item.name,
          price: item.price,
          image: item.image,
          rating: item.rating,
          restaurant: item.restaurant, // ✅ this was missing before
        }),
      });
      const data = await res.json();
      alert(data.message || "❤️ Added to favorites");
      fetchDashboardData();
    } catch (e) {
      console.error(e);
      alert("❌ Favorite error");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleAddAddress = async () => {
    try {
      const res = await fetch("http://localhost:5555/api/profile/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: newType,
          fullAddress: newAddress,
          city: newCity,
          default: newDefault,
        }),
      });

      if (!res.ok) throw new Error("Address add failed");

      alert("📍 Address added!");
      setNewType("");
      setNewAddress("");
      setNewCity("");
      setNewDefault(false);
      setShowAddForm(false);
      fetchDashboardData();
    } catch (e) {
      console.error(e);
      alert("❌ Failed to add address");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "orders", label: "My Orders", icon: "🛍️" },
    { id: "favorites", label: "Favorites", icon: "❤️" },
    { id: "addresses", label: "Addresses", icon: "📍" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  if (loading) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto"></div>
            <p className="text-white mt-4 text-lg">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl text-white">
            Welcome, <span className="text-amber-400">{user?.name}</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage your account here</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-amber-600 text-white"
                  : "bg-gray-800 text-white/70 hover:bg-gray-700"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="bg-gray-800 p-6 rounded-xl text-white">
            <h2 className="text-2xl mb-4">Overview</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-amber-600 p-4 rounded-lg">
                <h3 className="text-xl">Total Orders</h3>
                <p className="text-3xl font-bold">{user?.totalOrders || 0}</p>
              </div>
              <div className="bg-green-600 p-4 rounded-lg">
                <h3 className="text-xl">Total Spent</h3>
                <p className="text-3xl font-bold">${user?.totalSpent || 0}</p>
              </div>
              <div className="bg-purple-600 p-4 rounded-lg">
                <h3 className="text-xl">Loyalty Points</h3>
                <p className="text-3xl font-bold">{user?.loyaltyPoints || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-gray-800 p-6 rounded-xl text-white">
            <h2 className="text-2xl mb-4">My Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-400">No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-700 p-4 rounded-lg mb-3"
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.amount}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div className="bg-gray-800 p-6 rounded-xl text-white">
            <h2 className="text-2xl mb-4">Favorites</h2>
            {favorites.length === 0 ? (
              <p className="text-gray-400">No favorites yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((item) => (
                  <div key={item._id} className="bg-gray-700 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-full object-cover rounded mb-3"
                    />
                    <h3 className="text-xl">{item.name}</h3>
                    <p className="text-gray-400">{item.restaurant}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-amber-400 font-bold">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => handleCheckout(item)}
                        className="bg-amber-600 px-3 py-1 rounded-lg text-sm"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div className="bg-gray-800 p-6 rounded-xl text-white">
            <h2 className="text-2xl mb-4">Addresses</h2>

            {addresses.length === 0 ? (
              <p className="text-gray-400">No addresses saved.</p>
            ) : (
              <ul className="space-y-3 mb-4">
                {addresses.map((addr, idx) => (
                  <li key={idx} className="bg-gray-700 p-4 rounded-lg">
                    <p>
                      <strong>{addr.type || "Address"}:</strong>{" "}
                      {addr.fullAddress}
                    </p>
                    <p>
                      <strong>City:</strong> {addr.city}
                    </p>
                    {addr.default && (
                      <span className="text-green-400 text-sm">Default</span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {showAddForm ? (
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <input
                  type="text"
                  placeholder="Type (e.g. Home, Work)"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full p-2 mb-2 bg-gray-800 rounded"
                />
                <input
                  type="text"
                  placeholder="Full address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full p-2 mb-2 bg-gray-800 rounded"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full p-2 mb-2 bg-gray-800 rounded"
                />
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={newDefault}
                    onChange={(e) => setNewDefault(e.target.checked)}
                  />
                  Set as default
                </label>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={handleAddAddress}
                    className="bg-amber-600 px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-600 px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-amber-600 px-4 py-2 rounded mb-4"
              >
                ➕ Add Address
              </button>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-gray-800 p-6 rounded-xl text-white">
            <h2 className="text-2xl mb-6">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 p-2 rounded-lg mt-1"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  readOnly={!editMode}
                />
              </div>
              <div>
                <label className="text-gray-400">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-700 p-2 rounded-lg mt-1"
                  value={user?.email}
                  readOnly
                />
              </div>
              <div>
                <label className="text-gray-400">Phone</label>
                <input
                  type="tel"
                  className="w-full bg-gray-700 p-2 rounded-lg mt-1"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  readOnly={!editMode}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {editMode ? (
                <>
                  <button
                    onClick={handleEditProfile}
                    className="bg-amber-600 px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-600 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-amber-600 px-4 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={() => setShowPasswordModal(true)}
                className="bg-gray-700 px-4 py-2 rounded-lg"
              >
                Change Password
              </button>
              <button
                onClick={handleSignOut}
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white">
              <h3 className="text-xl mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400">Old Password</label>
                  <input
                    type="password"
                    className="w-full bg-gray-700 p-2 rounded-lg"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-gray-400">New Password</label>
                  <input
                    type="password"
                    className="w-full bg-gray-700 p-2 rounded-lg"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="bg-gray-600 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className="bg-amber-600 px-4 py-2 rounded-lg"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
