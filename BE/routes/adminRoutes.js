const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authAdmin = require("../middleware/authAdmin");

router.post("/register", adminController.register);
router.post("/login", adminController.login);

// protected
router.get("/list", authAdmin, adminController.listUsersAndKeys);

// delete user
router.delete("/user/:id", authAdmin, adminController.deleteUser);

module.exports = router;
