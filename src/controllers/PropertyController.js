const Property = require("../models/PropertyModel");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");



// Create new property
// const createProperty = async (req, res) => {
//   try {
//     const property = new Property(req.body);
//     await property.save();
//     res.status(201).json(property);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// Multer upload middleware
const upload = multer({ storage: storage }); // 4 images allowed


const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, owner, propertyType, bedrooms, bathrooms, availableFrom } = req.body;

    // Check for missing required fields
    if (!title || !description || !price || !location || !owner || !propertyType || bedrooms == null || bathrooms == null || !availableFrom) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate owner ID format
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid owner ID" });
    }

    // Handle image uploads
    let imagePaths = [];
    if (req.files) {
      imagePaths = req.files.map(file => file.path);
    }

    // Create property with uploaded image paths
    const property = new Property({
      ...req.body,
      images: imagePaths, // Store file paths in database
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete property by ID
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProperty, getAllProperties, getPropertyById, deleteProperty, upload };
