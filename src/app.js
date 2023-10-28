const express = require('express');
const cors = require('cors');
const router = require('./components/main.routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(router)

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.all('*', (req, res) => {
  res.send('Undefine URL');
});

module.exports = app