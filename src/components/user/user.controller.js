const {
  createUserService,
  deleteUserService,
  seedAdminService,
} = require("./user.service");

const createUser = async (req, res, next) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access Denied: Only admins can delete users");
  }
  try {
    const user = await deleteUserService(req.query);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const adminUser = async (req, res, next) => {
  try {
    await seedAdminService();
    res.status(200).json({ message: "Admin user checked" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  deleteUser,
  adminUser,
};
