const express = require("express");
const customerController = require("./../../controllers/customer");
const customerValidations = require("./../../middlewares/validations/customer");
const router = express.Router();

router.get("/", customerController.findAll);
router.get("/:id", customerController.findById);
router.post("/", customerValidations.create, customerController.create);
router.put("/:id", customerController.updateById);
router.delete("/:id", customerController.deleteById);

module.exports = router;
