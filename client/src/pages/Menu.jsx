import React, { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, Star, Filter } from "lucide-react";

const Menu = ({ cart, setCart, handleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("name");

  const menuItems = [
    // Biryani Types
    {
      id: 1,
      name: "Hyderabadi Mutton Biryani",
      category: "Biryani",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d629?w=400&h=300&fit=crop",
      description:
        "Aromatic basmati rice layered with tender mutton, saffron, and traditional spices",
      rating: 4.8,
      spiceLevel: 3,
      isVeg: false,
    },
    {
      id: 2,
      name: "Chicken Dum Biryani",
      category: "Biryani",
      price: 380,
      image:
        "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
      description:
        "Fragrant basmati rice slow-cooked with succulent chicken pieces",
      rating: 4.7,
      spiceLevel: 2,
      isVeg: false,
    },
    {
      id: 3,
      name: "Vegetable Biryani",
      category: "Biryani",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
      description:
        "Mixed vegetables and paneer cooked with aromatic basmati rice",
      rating: 4.5,
      spiceLevel: 2,
      isVeg: true,
    },
    {
      id: 4,
      name: "Prawns Biryani",
      category: "Biryani",
      price: 520,
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      description:
        "Fresh prawns marinated in coastal spices with fragrant rice",
      rating: 4.6,
      spiceLevel: 3,
      isVeg: false,
    },

    // South Indian
    {
      id: 5,
      name: "Masala Dosa",
      category: "South Indian",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop",
      description:
        "Crispy rice crepe filled with spiced potato curry, served with sambar and chutney",
      rating: 4.6,
      spiceLevel: 2,
      isVeg: true,
    },
    {
      id: 6,
      name: "Rava Idli",
      category: "South Indian",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1606491956391-491a2b516ce4?w=400&h=300&fit=crop",
      description:
        "Steamed semolina cakes served with coconut chutney and sambar",
      rating: 4.4,
      spiceLevel: 1,
      isVeg: true,
    },
    {
      id: 7,
      name: "Chettinad Chicken",
      category: "South Indian",
      price: 380,
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
      description: "Spicy chicken curry from Tamil Nadu with aromatic spices",
      rating: 4.7,
      spiceLevel: 4,
      isVeg: false,
    },
    {
      id: 8,
      name: "Uttapam",
      category: "South Indian",
      price: 160,
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
      description: "Thick pancake topped with onions, tomatoes, and coriander",
      rating: 4.3,
      spiceLevel: 1,
      isVeg: true,
    },

    // Starters
    {
      id: 9,
      name: "Chicken 65",
      category: "Starters",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",
      description:
        "Spicy deep-fried chicken appetizer with curry leaves and red chilies",
      rating: 4.5,
      spiceLevel: 4,
      isVeg: false,
    },
    {
      id: 10,
      name: "Paneer Tikka",
      category: "Starters",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
      description: "Grilled cottage cheese marinated in yogurt and spices",
      rating: 4.4,
      spiceLevel: 2,
      isVeg: true,
    },
    {
      id: 11,
      name: "Mutton Seekh Kebab",
      category: "Starters",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
      description:
        "Minced mutton skewers grilled to perfection with aromatic spices",
      rating: 4.6,
      spiceLevel: 3,
      isVeg: false,
    },
    {
      id: 12,
      name: "Gobi Manchurian",
      category: "Starters",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1606491956391-491a2b516ce4?w=400&h=300&fit=crop",
      description:
        "Crispy cauliflower florets tossed in tangy Indo-Chinese sauce",
      rating: 4.3,
      spiceLevel: 2,
      isVeg: true,
    },

    // Pizza
    {
      id: 13,
      name: "Tandoori Chicken Pizza",
      category: "Pizza",
      price: 420,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      description:
        "Wood-fired pizza with tandoori chicken, onions, and mint chutney",
      rating: 4.5,
      spiceLevel: 2,
      isVeg: false,
    },
    {
      id: 14,
      name: "Paneer Makhani Pizza",
      category: "Pizza",
      price: 380,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      description:
        "Creamy tomato base with paneer, bell peppers, and mozzarella",
      rating: 4.4,
      spiceLevel: 1,
      isVeg: true,
    },
    {
      id: 15,
      name: "Spicy Keema Pizza",
      category: "Pizza",
      price: 460,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      description: "Minced lamb with onions, green chilies, and Indian spices",
      rating: 4.6,
      spiceLevel: 3,
      isVeg: false,
    },

    // Burgers
    {
      id: 16,
      name: "Bombay Chicken Burger",
      category: "Burgers",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      description: "Spiced chicken patty with mint chutney and crispy onions",
      rating: 4.3,
      spiceLevel: 2,
      isVeg: false,
    },
    {
      id: 17,
      name: "Aloo Tikki Burger",
      category: "Burgers",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      description:
        "Crispy potato patty with tamarind chutney and fresh vegetables",
      rating: 4.2,
      spiceLevel: 2,
      isVeg: true,
    },
    {
      id: 18,
      name: "Keema Burger",
      category: "Burgers",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      description: "Spiced minced lamb patty with onions and special sauce",
      rating: 4.4,
      spiceLevel: 3,
      isVeg: false,
    },

    // Pastries & Desserts
    {
      id: 19,
      name: "Gulab Jamun",
      category: "Pastries",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
      rating: 4.7,
      spiceLevel: 0,
      isVeg: true,
    },
    {
      id: 20,
      name: "Rasmalai",
      category: "Pastries",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      description:
        "Spongy cottage cheese dumplings in sweetened milk with cardamom",
      rating: 4.6,
      spiceLevel: 0,
      isVeg: true,
    },
    {
      id: 21,
      name: "Kulfi",
      category: "Pastries",
      price: 80,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      description:
        "Traditional Indian ice cream flavored with cardamom and pistachios",
      rating: 4.5,
      spiceLevel: 0,
      isVeg: true,
    },

    // North Indian
    {
      id: 22,
      name: "Butter Chicken",
      category: "North Indian",
      price: 380,
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
      description: "Creamy tomato-based curry with tender chicken pieces",
      rating: 4.8,
      spiceLevel: 2,
      isVeg: false,
    },
    {
      id: 23,
      name: "Dal Makhani",
      category: "North Indian",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
      description: "Slow-cooked black lentils with butter and cream",
      rating: 4.6,
      spiceLevel: 1,
      isVeg: true,
    },
    {
      id: 24,
      name: "Rogan Josh",
      category: "North Indian",
      price: 420,
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
      description: "Aromatic Kashmiri lamb curry with traditional spices",
      rating: 4.7,
      spiceLevel: 3,
      isVeg: false,
    },
  ];

  const categories = [
    "All",
    "Biryani",
    "South Indian",
    "Starters",
    "Pizza",
    "Burgers",
    "Pastries",
    "North Indian",
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (itemId, change) => {
    setCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.id === itemId
            ? {
                ...cartItem,
                quantity: Math.max(cartItem.quantity + change, 0),
              }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const getSpiceIndicator = (level) => {
    return "🌶️".repeat(level);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black px-7 pt-32 pb-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider text-white mb-4">
            Our<span className="italic text-amber-400">Menu</span>
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
          <p className="text-xl text-white/70 font-light tracking-wide">
            Discover authentic Indian flavors crafted with passion
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 pb-4 px-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-amber-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:bg-gray-800 transition-transform duration-300 transform hover:scale-105 group border border-gray-800"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => {
                      toggleFavorite(item.id);
                      handleFavorite({
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        rating: item.rating,
                      });
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      favorites.includes(item.id)
                        ? "bg-red-500 text-white scale-110"
                        : "bg-black/50 text-white hover:bg-red-500"
                    }`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={favorites.includes(item.id) ? "white" : "none"}
                    />
                  </button>
                  {item.isVeg && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-lg">
                    {getSpiceIndicator(item.spiceLevel)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-400">{item.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-400">
                    ₹{item.price}
                  </span>
                  {cart.find((cartItem) => cartItem.id === item.id) ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full transition-colors"
                      >
                        −
                      </button>
                      <span className="text-white font-medium min-w-[2rem] text-center">
                        {
                          cart.find((cartItem) => cartItem.id === item.id)
                            ?.quantity
                        }
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full transition-colors"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>

      <section className="bg-gradient-to-b from-gray-900 via-gray-950 to-black py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light text-white mb-4">
            <span className="italic text-orange-400">Ready to order?</span>
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Your favorite Indian dishes are just a click away with{" "}
            <span className="text-orange-300 font-medium">BiteHub</span>.
          </p>
          <button className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-sm uppercase tracking-wider transition duration-300 shadow-lg transform hover:scale-105">
            Place Your Order →<a href="/menu"></a>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Menu;
