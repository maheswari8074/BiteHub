import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      if (res.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#111] to-gray-900 text-white pt-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light tracking-wide mb-4">
            Get <span className="italic text-amber-400">in Touch</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-white/70 font-light max-w-3xl mx-auto">
            Have questions or feedback? Reach out and we'll get back to you
            shortly.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 bg-black border border-white/10 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-amber-400">
                📍 Address
              </h3>
              <p className="text-white/70">
                Dwaraka Nagar, Vizag <br />
                Andhra Pradesh - 530016
              </p>
            </div>
            <div className="p-6 bg-black border border-white/10 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-amber-400">
                📞 Phone
              </h3>
              <p className="text-white/70">+91 98765 43210</p>
              <p className="text-white/60 text-sm">Support 24/7</p>
            </div>
            <div className="p-6 bg-black border border-white/10 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-amber-400">
                ✉️ Email
              </h3>
              <p className="text-white/70">hello@bitehub.com</p>
              <p className="text-white/60 text-sm">We respond within a day</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-black border border-white/10 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-3xl font-light tracking-wider mb-6 text-orange-400">
              Send a Message
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm mb-2 block text-white font-light">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-black/50 text-white px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block text-white font-light">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-black/50 text-white px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block text-white font-light">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your message..."
                  required
                  className="w-full bg-black/50 text-white px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 w-full py-3 rounded-lg text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-24 rounded-xl overflow-hidden shadow-lg border border-white/10">
          <iframe
            title="BiteHub Vizag Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1448149910175!2d83.3088106!3d17.726689299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395c40ac725fb9%3A0x2fd2f65d1eb0fbb4!2sDwaraka%20Nagar%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1626856612545!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-96 border-none"
          ></iframe>
        </div>

        {/* Toast Messages */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Contact;
