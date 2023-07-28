const express = require("express");
const adminControlller = require("./../../controllers/admin");
const router = express.Router();

router.post("/", adminControlller.create);
router.post("/login", adminControlller.login);

module.exports = router;
