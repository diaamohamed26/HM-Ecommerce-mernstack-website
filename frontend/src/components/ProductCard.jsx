import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item._id === product?._id);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
      {/* Wishlist Icon */}
      <div
        className="absolute top-3 right-3 text-red-500 text-xl cursor-pointer z-10 transition-transform hover:scale-110"
        onClick={() => toggleWishlist(product)}
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </div>

      <Link to={`/product/${product?.slug}`} className="block relative w-full h-64">
        <img
          src={
            product?.images?.[0]
              ? `http://localhost:5000${product.images[0]}`
              : "/placeholder.png"
          }
          alt={product?.name || "Product"}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
          NEW
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product?.name || "Untitled Product"}
        </h3>
        <p className="text-gray-600 text-sm mt-1 mb-2 truncate">
          {product?.description || "No description available"}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-black">
            ${product?.price ?? "N/A"}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-colors"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
