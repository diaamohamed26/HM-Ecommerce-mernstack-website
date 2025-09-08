// backend/seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ email: "diaamazize98@gmail.com" });

    if (adminExists) {
      console.log("✅ Admin already exists:", adminExists.email);
      process.exit();
    }

    const admin = await User.create({
      name: "diaa",
      email: "diaamazize98@gmail.com",
      password: "123456", // will be hashed by userModel.js pre-save
      role: "admin",
    });

    console.log("🎉 Admin created:", admin.email);
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
