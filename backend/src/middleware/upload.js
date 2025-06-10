const multer = require("multer");
const AppError = require("../core/helper/appError");

// Use memory storage untuk upload ke Supabase
const storage = multer.memoryStorage();

// File filter untuk validasi image
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new AppError("Only image files are allowed!", 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

module.exports = upload;
