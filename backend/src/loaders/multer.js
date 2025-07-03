import multer, { memoryStorage } from "multer";

const multerUpload = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 512000, // 500 KB = 500 * 1024 bytes = 512000 bytes
    fieldNameSize: 100, // 100 bytes
    files: 1, // Number of files
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image")) {
      return cb(new Error("Please upload an image file"));
    }
    return cb(null, true);
  },
});

const dataUri = (file) => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};

export default { multerUpload, dataUri };
