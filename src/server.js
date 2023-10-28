const config = require('./config');
const app = require('./app');

const port = config.port;

// Start the server
app.listen(port, () => {
    console.log(
      `Server is listening on port ${port} at http://localhost:${port}`
    );
  });