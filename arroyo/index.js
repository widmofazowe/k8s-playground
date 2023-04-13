const express = require('express');
const { Proxy } = require('axios-express-proxy');
const {version} = require("./package.json");
const app = express();
const port = 3000;

const buildTime = new Date();

app.get('/whoami', (req, res) => {
  console.log(`request ${req.path}`);
  res.send("I'm arroyo");
});

app.get('/version', (req, res) => {
  console.log(`request ${req.path}`);
  res.json({
    buildTime,
    version,
    env: process.env.NODE_ENV,
  });
});

app.get('/api/*', (req, res) => {
  console.log(`request ${req.path}`);
  return Proxy('http://den', req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});