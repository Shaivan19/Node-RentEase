const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true
     },
  email: {
      type: String,
      unique: true,
      required: true 
      },
  password: {
      type: String,
      required: true 
    },
  avatar: {
      type: String,
      default: null
  },
  userType: {
      type: String,
      default: "Tenant"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model("Tenant", TenantSchema);