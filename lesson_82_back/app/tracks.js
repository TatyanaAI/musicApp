const express = require("express");
const router = express.Router();
const Track = require("../models/Track");
const Album = require("../models/Album");
const mongoose = require('mongoose');


const createRouter = () => {
  router.post("/", async (req, res) => {
    let result = await Track.findOne({ title: req.body.title })
    if (result) {
      return res.send(result);
    }
    const track = { ...req.body };
    result = new Track(track);
    try {
      await result.save();
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      let filter = {}
      if (req.query.album) {
        filter = { "album": mongoose.Types.ObjectId(req.query.album) }
      }

      if (req.query.artist) {
        const albums = (await Album.find({ "artist": mongoose.Types.ObjectId(req.query.artist) })).map(album => album.id)
        filter = { "album": { $in: albums } }
      }
      let tracks = await Track.find(filter).populate("album");
      res.send(tracks);
    } catch (e) {
      console.error(e.message)
      res.sendStatus(500).send(e);
    }
  });

  return router;
};


module.exports = createRouter;