const customerRoutes = require("./customer");
const employeeRoutes = require("./employee");
const appointmentRoutes = require("./appointment");
const treatmentRoutes = require("./treatment");
const consultantRoutes = require("./consultation");
const adminRoutes = require("./admin");
const express = require("express");

const router = express.Router();

router.use("/customer", customerRoutes);
router.use("/employee", employeeRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/treatment", treatmentRoutes);
router.use("/consultation", consultantRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
