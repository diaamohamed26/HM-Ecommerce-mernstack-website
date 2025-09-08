import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "../data/products.js"; // sample data
import Product from "../models/Product.js"; // your product model

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log("🗑️ Products cleared");

    // Insert new products
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");

    process.exit(); // close
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
