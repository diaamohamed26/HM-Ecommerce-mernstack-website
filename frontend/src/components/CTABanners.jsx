import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ctaw from '../assets/cta-w.jpg'
import ctam from '../assets/cta-m.jpg'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const CTABanners = () => {
  const banners = [
    {
      id: 1,
      title: "Women's Collection",
      image: "/src/assets/cta-w.jpg",
      link: "/shop/women",
      alt: "Shop Women",
    },
    {
      id: 2,
      title: "Men's Collection",
      image: "/src/assets/cta-m.jpg",
      link: "/shop/men",
      alt: "Shop Men",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-7xl mx-auto py-16">
      {banners.map((banner, i) => (
        <motion.div
          key={banner.id}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative h-[400px]"
        >
          <img
            src={banner.image}
            alt={banner.alt}
            className="w-full h-full  rounded-xl"
          />
          <div className="absolute inset-0  bg-opacity-30 rounded-xl flex flex-col justify-center items-center text-white text-center">
            <h2 className="text-3xl font-bold mb-4">{banner.title}</h2>
            <Link
              to={banner.link}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              {banner.alt}
            </Link>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default CTABanners;
