const User = require("./user.model");
const { errorResponse } = require("../../middleware/error-handling-middleware");

const createUserService = async (userData) => {
  const user = new User({
    authId: userData.authId, // MongoDB authentication ID
    userID: userData.userID, // email
    name: userData.name,
  });

  try {
    return await user.save();
  } catch (error) {
    return errorResponse(error);
  }
};

const deleteUserService = async (data) => {
  try {
    const user = await User.findByIdAndRemove(data.id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    errorResponse(error);
  }
  if (!user) {
    return errorResponse("Not Found with this ID");
  }
};

const seedAdminService = async () => {
  const adminExists = await User.findOne({ type: "Admin" });

  if (!adminExists) {
    const adminUser = new User({
      userID: "admin@test.com",
      name: "admin",
      type: "Admin",
    });

    await adminUser.save();
    console.log("Admin account created");
  } else {
    console.log("Admin account already exists");
  }
};

module.exports = {
  createUserService,
  deleteUserService,
  seedAdminService,
};
