const express = require("express");
const router = express.Router();
const { createUser, deleteUser, adminUser } = require("./user.controller");

router.post("/create", createUser);
router.post("/adminseed", adminUser);
router.delete("/", deleteUser);

module.exports = router;
