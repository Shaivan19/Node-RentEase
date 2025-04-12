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
    // Add currentTenant field
    currentTenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    // Add savedBy field for saved properties feature
    savedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    images: {
      type: [String],
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
      type: Date,
    },
    amenities: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance", "Reserved"],
      default: "Available"
    }
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;