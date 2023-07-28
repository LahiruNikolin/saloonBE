const express = require("express");
const appointmentController = require("./../../controllers/appointment");

const router = express.Router();

router.post("/", appointmentController.create);
router.get("/", appointmentController.findAll);
router.get("/:date", appointmentController.findByDate);
router.patch("/", appointmentController.update);
router.get("/customer/:customerID", appointmentController.findByCustomer);
router.get("/id/:id", appointmentController.findById);

module.exports = router;
