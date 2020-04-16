const { createServer } = require("http");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const fetch = require("node-fetch");

const normalizePort = port => parseInt(port, 10);
const port = normalizePort(process.env.PORT || 5000);

const app = express();
const dev = app.get("env") !== "production";

if (!dev) {
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("common"));

  app.use(express.static(path.resolve(__dirname, "build")));
  app.get("/api/worldwide", (req, res) => {
    fetch("https://api.covid19api.com/summary")
      .then(res => res.text())
      .then(body => res.json(JSON.parse(body)));
  });

  app.get("/api/:country", (req, res) => {
    fetch(`https://api.covid19api.com/total/country/${req.params.country}`)
      .then(res => res.text())
      .then(body => res.json(JSON.parse(body)));
  });
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

if (dev) {
  app.use(morgan("dev"));
  app.get("/api/worldwide", (req, res) => {
    fetch("https://api.covid19api.com/summary")
      .then(res => res.text())
      .then(body => res.json(JSON.parse(body)));
  });

  app.get("/api/:country", (req, res) => {
    fetch(`https://api.covid19api.com/total/country/${req.params.country}`)
      .then(res => res.text())
      .then(body => res.json(JSON.parse(body)));
  });
}

const server = createServer(app);
server.listen(port, err => {
  if (err) throw err;

  console.log("server started");
});
