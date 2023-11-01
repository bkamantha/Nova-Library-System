const config = require("./config");
const app = require("./app");
const { connectToMongo } = require("./config/dbconn");

const { PORT } = config;

try {
  connectToMongo();

  // Start the server
  app.listen(PORT, () => {
    console.log(
      `Server is listening on PORT ${PORT} at http://localhost:${PORT}`
    );
  });
} catch (error) {
  console.error(`Failed to start the server: ${error}`);
}
