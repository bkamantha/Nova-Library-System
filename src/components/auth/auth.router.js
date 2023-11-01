const express = require("express");
const router = express.Router();
const validateRequest = require("./auth.schema");
const { loginUser } = require("./auth.controller");

router.post("/login", validateRequest, loginUser);

module.exports = router;
