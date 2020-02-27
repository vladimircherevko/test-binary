const multer = require("multer");
const path = require("path");
const mkdirp = require("mkdirp");
const sharp = require("sharp");

const diskStorage = require("../utils/diskStorage");

const storage = diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads"; // В данном случае без ветвления fs
    mkdirp(dir)
      .then(() => {
        cb(null, dir);
      })
      .catch(err => cb(err));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString(36) + path.extname(file.originalname));
  },
  sharp: (req, file, cb) => {
    cb(
      null,
      sharp()
        .resize(600, 600, {
          kernel: sharp.kernel.nearest,
          fit: "contain",
          position: "right top",
          background: { r: 255, g: 255, b: 255, alpha: 0.5 }
        })
        .extend({
          top: 10,
          bottom: 20,
          left: 10,
          right: 20,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
    );
  }
});

module.exports = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg") {
      let err = new Error();
      err.message = "Картинка может быть только в формате PNG, JPG, JPEG";
      cb(err);
    } else cb(null, true);
  }
}).single("image");
