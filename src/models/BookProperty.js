const mongoose = require("mongoose");
const bookPropertySchema = new mongoose.Schema(
  {
    tenant: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Tenant", 
      required: true 
    }, 
    landlord: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Landlord", 
      required: true 
    }, 
    property: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Property", 
      required: true 
    }, 
    bookingDate: { 
      type: Date, 
      required: true 
    }, 
    bookingTime: { 
      type: String, 
      required: true 
    }, 
    status: { 
      type: String, 
      enum: ["booked", "completed", "cancelled"], 
      default: "booked" 
    },
    message: { 
      type: String, 
      trim: true 
    }, // Store message from tenant to landlord
  },
  { timestamps: true }
);