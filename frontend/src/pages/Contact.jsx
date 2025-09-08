import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await axios.post('http://localhost:5000/api/contact', form);
      setStatus(res.data.message);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="w-screen relative flex items-center justify-center h-64 md:h-72 bg-gradient-to-r hero mb-10">
        <div className="absolute inset-0"></div>
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white text-center z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact H&M
        </motion.h1>
      </section>

      {/* Form Section */}
      <div className="max-w-4xl mb-10 mx-auto bg-white p-8 md:p-12 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded h-32 focus:ring-2 focus:ring-blue-400"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition font-semibold"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
