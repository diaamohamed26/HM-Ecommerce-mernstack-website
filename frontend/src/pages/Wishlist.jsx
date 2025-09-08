import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <section className="w-screen hero relative flex items-center justify-center h-52 md:h-64 bg-gradient-to-r  mb-10">
        <div className="absolute inset-0 "></div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center z-10">
          Wishlist
        </h1>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        

        {/* Empty state */}
        {wishlist.length === 0 ? (
          <div className="text-center p-10 border rounded-lg bg-white shadow-md">
            <Heart className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">
              Your wishlist is empty.
            </p>
            <Link
              to="/products"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden relative group"
              >
                <Link to={`/product/${item.slug}`}>
                  <img
                    src={
                    item?.images?.[0]
                      ? `http://localhost:5000${item.images[0]}`
                      : "/placeholder.png"
                    }
                    alt={item.name}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="mt-2 text-gray-900 font-bold">${item.price}</p>

                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/product/${item.slug}`}
                      className="text-sm bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Heart badge */}
                <div className="absolute top-3 right-3 bg-white rounded-full shadow p-1">
                  <Heart className="text-red-500 w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
