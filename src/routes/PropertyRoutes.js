const express = require("express");
const routes = express.Router();

const propertyController = require("../controllers/PropertyController");


routes.post("/addproperties", propertyController.upload.array("images", 5), propertyController.createProperty)
routes.get("/properties", propertyController.getAllProperties);
// routes.post("/addproperties", propertyController.createProperty);
routes.get("/properties/:id", propertyController.getPropertyById);
routes.delete("/properties/:id", propertyController.deleteProperty);
routes.get("/properties/landlord/:landlordId", propertyController.getPropertiesByLandlord);
// routes.put("/properties/:id", propertyController.updateProperty);
routes.put("/properties/:id", propertyController.upload.array("images", 5), propertyController.updateProperty);

module.exports = routes;
