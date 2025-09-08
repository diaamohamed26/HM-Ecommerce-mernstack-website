import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filters & Controls
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 1000]);
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  // States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/products", {
        params: { search, category, price, rating, sort, page },
      });
      setProducts(data.products || []);
      setError("");
    } catch (err) {
      setError("Failed to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories (for filter dropdown)
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/categories");
      setCategories(data || []);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, price, rating, sort, page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative hero flex items-center justify-center h-64 md:h-72  mb-12">
        <div className="absolute inset-0 " />
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white text-center relative z-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          All Products
        </motion.h1>
      </section>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-wrap gap-4 mb-10 justify-center md:justify-between">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm w-full sm:w-64 focus:ring-2 focus:ring-black/70 outline-none"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-black/70 outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Price */}
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value.split(","))}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-black/70 outline-none"
          >
            <option value={[0, 1000]}>All Prices</option>
            <option value={[0, 50]}>$0 - $50</option>
            <option value={[50, 100]}>$50 - $100</option>
            <option value={[100, 500]}>$100 - $500</option>
          </select>

          {/* Rating */}
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-black/70 outline-none"
          >
            <option value="">All Ratings</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
            <option value="2">2★ & above</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-black/70 outline-none"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price Low → High</option>
            <option value="price-desc">Price High → Low</option>
            <option value="latest">Latest</option>
          </select>
        </div>

        {/* Loading & Error */}
        {loading && <p className="text-center text-gray-500 my-10">Loading products...</p>}
        {error && <p className="text-center text-red-500 my-10">{error}</p>}

        {/* No products */}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-600 my-10">No products found.</p>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.isArray(products) &&
            products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
        </div>

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-12 gap-4">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="px-5 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              >
                Previous
              </button>
            )}
            <button
              onClick={() => setPage(page + 1)}
              className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
