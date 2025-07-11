import React from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const increment = (itemId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (itemId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // assuming user stored after login

    if (!token || !user) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5555/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id, // or user.id depending on how you stored it
          items: cart,
          amount: total,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      setCart([]);
      localStorage.removeItem("cart");
      navigate("/thank-you");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Order placement failed.");
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 border-b pb-4">
          Your Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-center mt-12 text-lg">
            Your cart is empty. Go explore some delicious food!
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 bg-gray-800 rounded-lg p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-medium">{item.name}</h3>
                    <p className="text-gray-400">{item.category}</p>
                    <p className="text-sm mt-1">
                      ₹{item.price} x {item.quantity}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="bg-red-600 px-3 py-1 rounded-full hover:bg-red-700"
                      >
                        −
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="bg-green-600 px-3 py-1 rounded-full hover:bg-green-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-lg font-semibold text-amber-400">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Total: ₹{total}</h2>
              <button
                onClick={handleCheckout}
                className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-full text-white font-medium transition"
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
