const express = require("express");
const routes = express.Router();

const propertyController = require("../controllers/PropertyController");

routes.get("/properties", propertyController.getAllProperties);
routes.post("/addproperties", propertyController.createProperty);
routes.get("/properties/:id", propertyController.getPropertyById);
routes.delete("/properties/:id", propertyController.deleteProperty);

module.exports = routes;

