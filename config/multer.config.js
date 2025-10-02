const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
fs.mkdirSync(uploadDir, { recursive: true });

// Configure disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${base}-${unique}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB cap (adjust if you like)
  // Optional: restrict types
  // fileFilter: (req, file, cb) => cb(null, /image\/|pdf$/.test(file.mimetype))
});

module.exports = upload;
