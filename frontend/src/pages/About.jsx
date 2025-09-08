import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutimg from '../assets/mission.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  return (


    
    <div className="overflow-hidden">
      
      {/* Hero */}
      <section className="hero w-screen   relative flex items-center justify-center h-64 md:h-72  ">
        
        <div className=" w-full h-full absolute top-0 left-0 z-0" />
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white text-center z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About H&M
        </motion.h1>
      </section>

      {/* Brand Story */}
      <motion.section
        className="py-16 px-6 max-w-5xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-semibold mb-6">Fashion with Purpose</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          H&M is a global fashion brand committed to offering quality and
          style at the best price in a sustainable way. From timeless
          essentials to bold statements, we inspire everyone to express their
          individuality through fashion.
        </p>
      </motion.section>

      {/* Image + Text Row */}
      <section className="flex flex-col md:flex-row items-center gap-10 px-6 max-w-7xl mx-auto py-16">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src={aboutimg}
            alt="Our stores"
            className="rounded-xl w-full"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Global Presence</h3>
          <p className="text-gray-600">
            With over 5,000 stores in 74 markets and an extensive online
            presence, H&M delivers fashion across the world. Our stores and
            eCommerce experience are crafted to meet the evolving needs of our
            customers.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <motion.section
        className="bg-gray-100 py-16 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3 className="text-2xl font-bold mb-4">Sustainability Matters</h3>
        <p className="text-gray-700 max-w-3xl mx-auto">
          We aim to lead the change toward circular and climate-positive
          fashion. By 2030, all our materials will be either recycled or
          sustainably sourced. H&M is driven by values of inclusivity,
          innovation, and environmental responsibility.
        </p>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3 className="text-3xl font-semibold mb-6">Join the Fashion Movement</h3>
        <p className="text-gray-600 mb-6">
          Explore our latest collections, become a member, or learn more about
          our initiatives.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </motion.section>
    </div>
  );
};

export default About;
