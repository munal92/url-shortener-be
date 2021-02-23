const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

/// ROUTES
const UrlRoute = require("../Routes/url-route.js");
const GetUrlRoute = require("../Routes/get-url-route.js");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/", GetUrlRoute);
server.use("/api/url", UrlRoute);

server.get("/", (req, res) => {
  res.send("<h1>&emsp;&emsp;&emsp;&emsp;API IS UP 🤖<h1></h1>");
});
server.use((req, res, next) => {
  res.status(404).send("<h1>&emsp;&emsp;&emsp;&emsp;404 Page Not Found! </h1>");
});
module.exports = server;
