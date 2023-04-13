const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { version } = require("./package.json");
const app = express();
const port = 3000;

const buildTime = new Date();

app.use((req, res, next) => {
  console.log(`request ${req.path}`);
  next();
})

app.get('/whoami', (req, res) => {
  res.send("I'm arroyo");
});

app.get('/health', (req, res) => {
  res.send("ok");
});

app.get('/version', (req, res) => {
  res.json({
    buildTime,
    version,
    env: process.env.NODE_ENV,
  });
});

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://den-service/api',
    changeOrigin: true,
  })
);

app.use((req, res) => {
  res.status(404).end('Not found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});