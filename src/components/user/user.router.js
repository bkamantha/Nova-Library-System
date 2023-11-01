const express = require("express");
const router = express.Router();
const { createUser, deleteUser, adminUser } = require("./user.controller");
const { authMiddleware } = require("../../middleware/auth-Middleware");

router.post("/create", createUser);
router.post("/adminseed", adminUser);
router.delete("/", authMiddleware, deleteUser);

module.exports = router;
