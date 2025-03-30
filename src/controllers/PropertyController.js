const Property = require("../models/PropertyModel");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const mailutil = require("../utils/MailUtil");
const Landlord = require("../models/LandlordModel");



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
    cb(null, "uploads/"); // Save files temporarily in "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// Multer upload middleware
const upload = multer({ storage: storage });

const createProperty = async (req, res) => {
  try {
    console.log("\n=== Property Creation Request ===");
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    console.log("Request Files:", req.files ? req.files.map(f => f.filename) : 'No files');
    
    const { 
      title, 
      description, 
      price, 
      location, 
      owner, 
      propertyType, 
      bedrooms, 
      bathrooms, 
      availableFrom,
      address,
      furnished,
      amenities 
    } = req.body;

    console.log("\n=== Parsed Fields ===");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Location:", location);
    console.log("Owner:", owner);
    console.log("Property Type:", propertyType);
    console.log("Bedrooms:", bedrooms);
    console.log("Bathrooms:", bathrooms);
    console.log("Available From:", availableFrom);
    console.log("Address:", address);
    console.log("Furnished:", furnished);
    console.log("Amenities:", amenities);

    // Check for missing required fields
    const missingFields = {
      title: !title,
      description: !description,
      price: !price,
      location: !location,
      owner: !owner,
      propertyType: !propertyType,
      bedrooms: bedrooms == null,
      bathrooms: bathrooms == null,
      availableFrom: !availableFrom,
      address: !address
    };

    console.log("\n=== Missing Fields Check ===");
    console.log(JSON.stringify(missingFields, null, 2));

    if (!title || !description || !price || !location || !owner || !propertyType || 
        bedrooms == null || bathrooms == null || !availableFrom || !address) {
      return res.status(400).json({ 
        error: "Missing required fields",
        missingFields: Object.entries(missingFields)
          .filter(([_, isMissing]) => isMissing)
          .map(([field]) => field)
      });
    }

    // Validate address fields
    const missingAddressFields = {
      street: !address.street,
      city: !address.city,
      state: !address.state,
      zipCode: !address.zipCode,
      country: !address.country
    };

    console.log("\n=== Missing Address Fields Check ===");
    console.log(JSON.stringify(missingAddressFields, null, 2));

    if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
      return res.status(400).json({ 
        error: "Missing required address fields",
        missingFields: Object.entries(missingAddressFields)
          .filter(([_, isMissing]) => isMissing)
          .map(([field]) => field)
      });
    }

    // Validate owner ID format
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid owner ID" });
    }

    // Get landlord details for email
    const landlord = await Landlord.findById(owner);
    if (!landlord) {
      return res.status(404).json({ error: "Landlord not found" });
    }

    // Handle image uploads to Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      try {
        // Upload each image to Cloudinary
        for (const file of req.files) {
          const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(file);
          imageUrls.push(cloudinaryResponse.secure_url);
        }
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({ error: "Error uploading images to cloud storage" });
      }
    }

    // Create property with Cloudinary image URLs
    const property = new Property({
      ...req.body,
      images: imageUrls,
      furnished: furnished === 'true',
      amenities: amenities ? amenities.split(',') : []
    });

    await property.save();

    // Send confirmation email to landlord
    const emailSubject = "Property Listed Successfully!";
    const emailBody = `
      Dear ${landlord.username},

      Congratulations! Your property "${title}" has been successfully listed on RentEase.

      Property Details:
      - Title: ${title}
      - Location: ${location}
      - Price: ₹${price}
      - Type: ${propertyType}
      - Bedrooms: ${bedrooms}
      - Bathrooms: ${bathrooms}
      - Available From: ${new Date(availableFrom).toLocaleDateString()}
      - Address: ${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}

      You can manage your property listing from your dashboard.

      Best regards,
      The RentEase Team
    `;

    try {
      await mailutil.sendingMail(landlord.email, emailSubject, emailBody);
      console.log("✅ Property creation confirmation email sent successfully");
    } catch (emailError) {
      console.error("🔥 Error sending property creation email:", emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json(property);
  } catch (error) {
    console.error("Property Creation Error:", error);
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

// Get properties by landlord ID
const getPropertiesByLandlord = async (req, res) => {
  try {
    const landlordId = req.params.landlordId;
    
    // Validate landlord ID format
    if (!mongoose.Types.ObjectId.isValid(landlordId)) {
      return res.status(400).json({ error: "Invalid landlord ID" });
    }

    // Find all properties where owner matches the landlord ID
    const properties = await Property.find({ owner: landlordId })
      .sort({ createdAt: -1 }); // Sort by newest first

    if (!properties || properties.length === 0) {
      return res.status(200).json([]); // Return empty array if no properties found
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching landlord properties:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createProperty, 
  getAllProperties, 
  getPropertyById, 
  deleteProperty, 
  upload,
  getPropertiesByLandlord 
};