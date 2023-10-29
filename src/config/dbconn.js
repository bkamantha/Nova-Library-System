const config = require("../config");
const mongoose = require("mongoose");

const { URL } = config;

const connectToMongo = () => {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const connection = mongoose.connection;

mongoose.set("strictQuery", false);

connection.on("error", (error) => {
  console.error(`MongoDB connection error`);
  setTimeout(connectToMongo, 5000); // Try to reconnect in 5 seconds
});

connection.once("open", () => {
  console.log("Mongodb Connection Success !");
});

module.exports.connectToMongo = connectToMongo;
