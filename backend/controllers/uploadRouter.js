const multer = require("multer");
const uploadRouter = require("express").Router();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.imageUrl);
  },
});

const upload = multer({ storage });

cloudinary.config({
  cloud_name: 'dlweshii1',
  api_key: '348665113567648',
  api_secret: 'DEL8csNSMNfyd-KvH-Y9sTo0UF4',  
});

uploadRouter.post("/", upload.single("photo"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'products' });
    console.log(result)
    req.imageUrl = result.secure_url;

    fs.unlink(req.file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Failed to delete local image file:", unlinkErr);
      }
    });

    return res.status(201).json({ message: "Successfully uploaded", imageUrl: req.imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Failed to upload image" });
  }
});

module.exports = uploadRouter;
