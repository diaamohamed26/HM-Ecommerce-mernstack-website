import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white px-6 pt-16 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
        <Link to="/" className=" font-bold text-blue-600">
          <img className="w-15 "  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png" alt="" />
        </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Fashion and quality at the best price in a sustainable way.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-md font-semibold mb-3 uppercase">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-md font-semibold mb-3 uppercase">Company Info</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">About H&M</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="text-md font-semibold mb-3 uppercase">Stay Connected</h3>
          <div className="flex space-x-4 mb-4 text-xl">
            <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
          </div>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email address"
              className="px-3 py-2 rounded text-black placeholder:text-sm"
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} H&M. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
