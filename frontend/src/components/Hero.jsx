// components/Hero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroimg from '../assets/hero.jpg'

const Hero = () => {
  return (
    <section className="relative bg-gray-100 min-h-[100vh] flex items-center justify-center mt-15">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/src/assets/hero.jpg')] bg-cover    z-0" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
        >
          Discover Your Style
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-lg text-white/90"
        >
          Trendy collections for modern fashion lovers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex gap-4 justify-center"
        >
          <Link
            to="/products"
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-800 transition"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
