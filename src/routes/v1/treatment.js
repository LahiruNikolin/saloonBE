const express = require("express");
const treatmentController = require("../../controllers/treatment");
const treatmentValidations = require("./../../middlewares/validations/treatment");
const router = express.Router();

router.post("/", treatmentValidations.create, treatmentController.create);
router.get("/", treatmentController.findAll);

module.exports = router;
