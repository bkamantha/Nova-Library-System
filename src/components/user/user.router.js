const express = require("express");
const router = express.Router();
const { createUser, deleteUser, adminUser } = require("./user.controller");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { validate } = require("../../middleware/validateMiddleware");
const { createUserSchema, deleteUserSchema } = require("./user.schema");

router.post("/adminseed", adminUser);

router.post("/create", validate(createUserSchema), createUser);

router.delete(
  "/",
  authMiddleware,
  validate(deleteUserSchema, "query"),
  deleteUser
);

module.exports = router;
