const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    visitorName: {
      type: String,
      required: true,
      trim: true,
    },
    visitorEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    visitorPhone: {
      type: String,
      required: true,
      trim: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", visitSchema);
module.exports = Visit;