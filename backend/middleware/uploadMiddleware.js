import multer from "multer";
import path from "path";

// Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/avatars/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
