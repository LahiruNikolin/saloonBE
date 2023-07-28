const express = require("express");
const consultantController = require("./../../controllers/consultant");
 
const router = express.Router();

router.post("/",   consultantController.create);
router.get("/",   consultantController.findAll);
router.patch("/",   consultantController.update);
// router.get("/:date",   consultantController.findByDate);

module.exports = router;
