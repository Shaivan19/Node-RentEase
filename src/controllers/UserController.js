const bcrypt = require("bcrypt");
const Tenant = require("../models/TenantModel");
const Landlord = require("../models/LandlordModel");

//------------------------> User Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check existence of tenant user
    let foundUser = await Tenant.findOne({ email }).populate('roleId');
    let userType = "Tenant";

    // not in tenant, check in Landlord collection
    if (!foundUser) {
      foundUser = await Landlord.findOne({ email });
      userType = "Landlord";
    }

    // if user does not exist in both
    if (!foundUser) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Compare entered password with the stored password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    res.status(200).json({
      message: `Login successful. Welcome ${userType}!`,
      userType,
      data:{
        userId:foundUser._id,
        username: foundUser.username,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login.", error: error.message });
  }
};

//-----------------> User Signup
const signup = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Cjeck if email is already registered in any collection
    const existingTenant = await Tenant.findOne({ email });
    const existingLandlord = await Landlord.findOne({ email });

    if (existingTenant || existingLandlord) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;
    
    if (userType === "tenant") {
      newUser = await Tenant.create({ ...req.body, password: hashedPassword });
    } else if (userType === "landlord") {
      newUser = await Landlord.create({ ...req.body, password: hashedPassword });
    } else {
      return res.status(400).json({ message: "Invalid user type. Must be 'tenant' or 'landlord'." });
    }

    res.status(201).json({ message: `${userType} registered successfully.`, data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user.", error: error.message });
  }
};

// -------------> Get All Users (Both Tenants and Landlords)
const getAllUsers = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    const landlords = await Landlord.find();

    res.status(200).json({
      message: "Users retrieved successfully.",
      tenants,
      landlords,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users.", error: error.message });
  }
};

//--------------> Delete User by ID (For Both Tenants and Landlords)
const deleteUser = async (req, res) => {
  try {
    let deletedUser = await Tenant.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      deletedUser = await Landlord.findByIdAndDelete(req.params.id);
    }

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully.", data: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user.", error: error.message });
  }
};

//-------------> Get User by ID
const getUserById = async (req, res) => {
  try {
    let user = await Tenant.findById(req.params.id);
    let userType = "Tenant";

    if (!user) {
      user = await Landlord.findById(req.params.id);
      userType = "Landlord";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: `${userType} retrieved successfully.`, data: user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user.", error: error.message });
  }
};

module.exports = {
  login,signup,getAllUsers,deleteUser,getUserById,
};