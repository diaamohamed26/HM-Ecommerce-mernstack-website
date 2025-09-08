import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/slug/${slug}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-red-500">Product not found</div>;

  const handleAddToCart = () => addToCart(product);
  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };
  const handleAddToWishlist = () => toggleWishlist(product);

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <section className="w-screen relative flex items-center justify-center h-64 md:h-72 bg-gradient-to-r hero mb-10">
        <div className="absolute inset-0"></div>
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white text-center z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {product.name}
        </motion.h1>
      </section>

      {/* Product Details Card */}
      <div className="max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img
            src={
            product?.images?.[0]
              ? `http://localhost:5000${product.images[0]}`
              : "/placeholder.png"
            }
            alt={product.name}
            className="w-full h-[500px] md:h-[600px] object-cover rounded-xl border"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">{product.name}</h2>
          <p className="text-2xl font-semibold text-gray-800">${product.price}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
