const User = require("./user.model");
const Auth = require("../auth/auth.model");

const bcrypt = require("bcrypt");
const { errorResponse } = require("../../middleware/error-handling-middleware");

//TODO change promises to async await

const createUserService = (data) => {
  return bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(data.password, salt);
    })
    .then((hashedPassword) => {
      const auth = new Auth({
        _id: data.userID, //email
        password: hashedPassword,
      });

      const user = new User({
        authId: auth._id,
        name: data.name,
      });

      return Promise.all([auth.save(), user.save()]);
    })
    .then(() => {
      return { message: "User created successfully" };
    })
    .catch((error) => {
      return errorResponse(error);
    });
};

const deleteUserService = (data) => {
  return Auth.findByIdAndRemove(data.id)
    .then((auth) => {
      if (!auth) {
        throw new Error("Auth not found with this ID");
      }

      return User.findOneAndRemove({ authId: auth._id });
    })
    .then((user) => {
      if (!user) {
        throw new Error("User not found with this authId");
      }

      return { message: "User deleted successfully" };
    })
    .catch((error) => {
      return errorResponse(error);
    });
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
