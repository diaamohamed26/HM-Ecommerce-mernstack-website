import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; // ✅ baseURL already includes /api
import ProductCard from '../components/ProductCard';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // ✅ Remove extra /api
        const res = await axiosInstance.get('/products');

        console.log('API response:', res.data);

        const productsData = Array.isArray(res.data.products)
          ? res.data.products
          : Array.isArray(res.data)
            ? res.data
            : [];

        setProducts(productsData.slice(0, 6));
      } catch (err) {
        console.error('Error fetching featured products:', err.message || err);
      }
    };

    fetchFeatured();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.title);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
      <Toaster />
      <h1 className="text-3xl text-center font-bold mb-6">Featured Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/products"
          className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
