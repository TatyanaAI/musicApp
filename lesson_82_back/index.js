const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const artists = require("./app/artists");
const albums = require("./app/albums");
const tracks = require("./app/tracks");
const users = require("./app/users");
// const trackHistory = require("./app/trackHistory");

const app = express();
const port = 8000;

const run = async () => {
  await mongoose.connect("mongodb://localhost/musicApp", {useNewUrlParser: true, useUnifiedTopology: true});

  app.use(cors());
  app.use(express.static('public'));
  app.use(express.json());

  app.use("/artists", artists());
  app.use("/albums", albums());
  app.use("/tracks", tracks());
  app.use("/users", users());
  // app.use("/track_history", trackHistory());

  app.listen(port, () => {
    console.log("Server started at http://localhost:" + port);
  });
};

run().catch(e => console.log(e));
