const express = require("express");
const employeeController = require("../../controllers/employee");
const employeeValidations = require("./../../middlewares/validations/employee");
const router = express.Router();

router.post("/", employeeValidations.create, employeeController.create);
router.get("/", employeeController.findAll);

module.exports = router;
