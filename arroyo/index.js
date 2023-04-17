const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { version } = require("./package.json");
const app = express();
const port = 3000;

const buildTime = new Date();

app.use((req, res, next) => {
  console.log(`request ${req.path}`);
  return next();
})

app.get('/whoami', (req, res) => {
  return res.send("I'm arroyo");
});

app.get('/health', (req, res) => {
  return res.send("ok");
});

app.get('/version', (req, res) => {
  return res.json({
    buildTime,
    version,
    env: process.env.NODE_ENV,
  });
});

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://den-service/api',
  })
);

app.use((req, res) => {
  return res.status(404).end('Not found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});