const express = require("express");
const router = express.Router();
const apiKeyController = require("../controllers/apiKeyController");

router.post("/generate", apiKeyController.generateKey);

module.exports = router;
