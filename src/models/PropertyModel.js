const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      zipCode: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
      default: [],
    },
    propertyType: {
      type: String,
      enum: ["Apartment", "House", "Villa", "Studio", "Commercial"],
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    availableFrom: {
      type: Date, // Optional if available immediately
    },
    amenities: {
      type: [String], // Array of amenities (e.g., "WiFi", "Gym")
      default: [],
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
