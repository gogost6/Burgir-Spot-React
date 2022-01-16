const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("../middlewares/logger");
const auth = require("../middlewares/auth");
const config = require(".");
const routes = require("./routes");

module.exports = (app) => {
  app.use(express.urlencoded({ extended: false }));
  const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://burgir-spot.herokuapp.com/'];
  const corsOptions = {
    origin: function (origin, callback) {
      console.log("** Origin of request " + origin)
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        console.log("Origin acceptable")
        callback(null, true)
      } else {
        console.log("Origin rejected")
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  app.use(cors(corsOptions))
  // app.use(cors(config.CORS));
  app.use(cookieParser(config.TOKEN_SECRET));
  app.use(logger());
  app.use(auth());
  app.use(express.json());

  app.use("/api", routes);
};
