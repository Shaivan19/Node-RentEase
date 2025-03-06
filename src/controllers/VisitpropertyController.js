const Visit = require("../models/VisitpropertyModel");
const Property = require("../models/PropertyModel");

// Schedule a Visit
exports.scheduleVisit = async (req, res) => {
  try {
    const { property, visitorName, visitorEmail, visitorPhone, visitDate } = req.body;

    // Check if the property exists
    const existingProperty = await Property.findById(property);
    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Create a new visit request
    const newVisit = new Visit({
      property,
      visitorName,
      visitorEmail,
      visitorPhone,
      visitDate,
    });

    await newVisit.save();
    res.status(201).json({ message: "Visit scheduled successfully", visit: newVisit });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Visit Requests
exports.getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.find().populate("property", "title location");
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Visit by ID
exports.getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id).populate("property", "title location");
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }
    res.status(200).json(visit);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a Visit Request
exports.deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    await visit.deleteOne();
    res.status(200).json({ message: "Visit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
