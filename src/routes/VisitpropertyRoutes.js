const express = require("express");
const router = express.Router();
const VisitController = require("../controllers/VisitpropertyController");

// Schedule a visit
router.post("/schedule", VisitController.scheduleVisit);

// Get all visits
router.get("/allvisit", VisitController.getAllVisits);

// Get visit by ID
router.get("/visit/:id", VisitController.getVisitById);

// Delete a visit request
router.delete("/visit/:id", VisitController.deleteVisit);

module.exports = router;
