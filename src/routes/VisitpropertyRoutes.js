const express = require("express");
const router = express.Router();
const visitController = require("../controllers/VisitpropertyController");

router.post("/visit/schedule", visitController.scheduleVisit);
router.put("/visit/reschedule/:id", visitController.rescheduleVisit);
router.delete("/visit/cancel/:id", visitController.cancelVisit);
router.get("/allvisit", visitController.getAllVisits);
router.get("/visit/:id", visitController.getVisitById);

module.exports = router;
