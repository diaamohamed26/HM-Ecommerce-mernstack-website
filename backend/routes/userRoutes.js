// routes/userRoutes.js
import express from "express";
import { getProfile, uploadAvatar,updateProfile  } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/upload-avatar", protect, upload.single("avatar"), uploadAvatar);
router.put("/profile", protect, updateProfile);
router.get("/profile", protect, getProfile);


export default router;
