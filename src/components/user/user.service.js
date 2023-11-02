const User = require("./user.model");
const Auth = require("../auth/auth.model");

const bcrypt = require("bcrypt");
const { errorResponse } = require("../../middleware/error-handling-middleware");

const createUserService = async (data) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const auth = new Auth({
      _id: data.userID, //email
      password: hashedPassword,
    });

    const user = new User({
      authId: auth._id,
      name: data.name,
    });

    await Promise.all([auth.save(), user.save()]);

    return { message: "User created successfully" };
  } catch (error) {
    return errorResponse(error);
  }
};

const deleteUserService = async (data) => {
  try {
    const auth = await Auth.findByIdAndRemove(data.id);
    if (!auth) {
      throw new Error("Auth not found with this ID");
    }

    const user = await User.findOneAndRemove({ authId: auth._id });
    if (!user) {
      throw new Error("User not found with this authId");
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    return errorResponse(error);
  }
};

const seedAdminService = () => {
  return User.findOne({ type: "Admin" })
    .then((adminExists) => {
      if (!adminExists) {
        const hashedPassword = bcrypt.hashSync("admin@123", 10);

        const adminAuth = new Auth({
          _id: "admin@test.com",
          password: hashedPassword,
        });

        const adminUser = new User({
          authId: adminAuth._id,
          name: "admin",
          type: "Admin",
        });

        return Promise.all([adminAuth.save(), adminUser.save()]);
      } else {
        console.log("Admin account already exists");
      }
    })
    .then(() => {
      console.log("Admin account created");
    })
    .catch((error) => {
      return errorResponse(error);
    });
};

module.exports = {
  createUserService,
  deleteUserService,
  seedAdminService,
};
