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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <section className="py-20 bg-orange-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-900">
            We'd love to hear from you! Reach out with any questions, feedback,
            or just to say hi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">📍 Address</h3>
              <p className="text-gray-400">
                123 Culinary Street
                <br />
                Food District, City 12345
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">📞 Phone</h3>
              <p className="text-gray-400">+1 (555) 123-4567</p>
              <p className="text-gray-400">Available 24/7</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">✉️ Email</h3>
              <p className="text-gray-400">hello@bitehub.com</p>
              <p className="text-gray-400">Quick responses guaranteed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your message..."
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Optional Image Suggestion */}
        <div className="mt-16 text-center">
          <p className="text-gray-400">
            Add a map illustration or contact-themed image here if you like.
          </p>
          <div className="h-64 bg-gradient-to-br from-orange-200 to-red-200 mt-4 rounded-xl flex items-center justify-center text-gray-600">
            📍 Map / Contact Image Placeholder
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </section>
  );
};

export default Contact;
