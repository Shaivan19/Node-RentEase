const ImageModel = require("../models/ImageModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

// Multer Storage Engine (Temporary Local Storage)
const storage = multer.diskStorage({
  destination: "./uploads", // Temporary folder before Cloudinary upload
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Multer Upload Middleware
const upload = multer({
  storage: storage,
}).single("image");

// Add Image Without File Upload
const addImage = async (req, res) => {
  try {
    const savedImage = await ImageModel.create(req.body);
    res.status(201).json({
      message: "Image added successfully",
      data: savedImage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Images
const getAllImages = async (req, res) => {
  try {
    const images = await ImageModel.find();
    if (images.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }
    res.status(200).json({
      message: "Images retrieved successfully",
      data: images,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Image with File Upload (Cloudinary)
const addImageWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    try {
      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log("Cloudinary Response:", cloudinaryResponse);

      // Store image URL in database
      req.body.imageUrl = cloudinaryResponse.secure_url;
      const savedImage = await ImageModel.create(req.body);

      res.status(200).json({
        message: "Image uploaded and saved successfully",
        data: savedImage,
      });
    } catch (uploadError) {
      res.status(500).json({ message: "Error uploading image", error: uploadError.message });
    }
  });
};

module.exports = { addImage, getAllImages, addImageWithFile };
