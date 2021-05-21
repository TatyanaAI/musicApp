const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const checkTokenState = require("../middleware/checkTokenState");
const Track = require("../models/Track");
const Album = require("../models/Album");

const createRouter = () => {
  router.post("/", auth, async (req, res) => {
    let result = await Track.findOne({ title: req.body.title })
    if (result) {
      return res.send(result);
    }

    if (isNaN(req.body.number)) {
      return res.status(400).send({ error: 'Incorrect type of value. Enter number' });
    }

    const track = { ...req.body };
    track.user = req.user.id

    result = new Track(track);
    try {
      await result.save();
      res.send(result);
    } catch (err) {
      console.error(e.message)
      res.status(400).send(err);
    }
  });

  router.post("/:id/publish", [auth, permit('admin')], async (req, res) => {
    try {
      let track = await Track.findByIdAndUpdate(req.params.id, { "published": true }, { runValidators: true, new: true });
      if (!track) {
        return res.status(400).send({ error: 'Incorrect track id' });
      }

      res.send(track);
    } catch (err) {
      console.error(e.message)
      res.status(400).send(err);
    }
  });

  router.get("/", checkTokenState, async (req, res) => {
    try {
      let filter = { "published": true };

      if (req.user && req.query.album) {
        if (req.user.role === 'admin') {
          filter = { "album": mongoose.Types.ObjectId(req.query.album) };
        } else if (req.user.role === 'user') {
          filter = { $and: [{ $or: [{ "published": true }, { "user": mongoose.Types.ObjectId(req.user.id) }] }, { "album": mongoose.Types.ObjectId(req.query.album) }] };
        }
      } else if (req.user && req.query.artist) {
        if (req.user.role === 'admin') {
          const albums = (await Album.find({ "artist": mongoose.Types.ObjectId(req.query.artist) })).map(album => album.id)
          filter = { "album": { $in: albums } }
        } else if (req.user.role === 'user') {
          const albums = (await Album.find({ "artist": mongoose.Types.ObjectId(req.query.artist) })).map(album => album.id)
          filter = { $and: [{ $or: [{ "published": true }, { "user": mongoose.Types.ObjectId(req.user.id) }] }, { "album": { $in: albums } }] };
        }
      } else if (req.user) {
        if (req.user.role === 'admin') {
          filter = {};
        } else if (req.user.role === 'user') {
          filter = { $or: [{ "published": true }, { "user": mongoose.Types.ObjectId(req.user.id) }] };
        }
      } else if (req.query.album) {
        filter = { "published": true, "album": mongoose.Types.ObjectId(req.query.album) }
      } else if (req.query.artist) {
        const albums = (await Album.find({ "artist": mongoose.Types.ObjectId(req.query.artist) })).map(album => album.id)
        filter = { "published": true, "album": { $in: albums } }
      }

      let tracks = await Track.find(filter).sort({ "number": 1 }).populate({ path: "album", populate: { path: "artist" } });

      res.send(tracks);
    } catch (e) {
      console.error(e.message)
      res.sendStatus(500).send(e);
    }
  });

  router.delete("/:id", [auth, permit('admin')], async (req, res) => {
    let track = await Track.findById(req.params.id).populate("user");
    if (!track) {
      return res.status(400).send({ error: 'Incorrect track id' });
    }

    try {
      await track.delete();
      return res.send({ message: "Track deleted successfully" });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  return router;
};

module.exports = createRouter;