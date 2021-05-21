const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const { nanoid } = require("nanoid");
const multer = require('multer');
const path = require('path');
const config = require('../config');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const checkTokenState = require("../middleware/checkTokenState");
const Artist = require("../models/Artist");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const createRouter = () => {
  router.post("/", auth, upload.single('photo'), async (req, res) => {
    let result = await Artist.findOne({ name: req.body.name })
    if (result) {
      return res.send(result);
    }

    const artist = { ...req.body };

    if (req.file) {
      artist.photo = req.file.filename;
    }

    artist.user = req.user.id

    result = new Artist(artist);
    try {
      await result.save();
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.post("/:id/publish", [auth, permit('admin')], async (req, res) => {
    try {
      let artist = await Artist.findByIdAndUpdate(req.params.id, { "published": true }, { runValidators: true, new: true });
      if (!artist) {
        return res.status(400).send({ error: 'Incorrect artist id' });
      }
      res.send(artist);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.get("/", checkTokenState, async (req, res) => {
    try {
      let filter = { "published": true };
      if (req.user) {
        if (req.user.role === 'admin') {
          filter = {};
        } else if (req.user.role === 'user') {
          filter = { $or: [{ "published": true }, { "user": mongoose.Types.ObjectId(req.user.id) }] };
        }
      }
      const artists = await Artist.find(filter).sort({ "name": 1 });
      res.send(artists);
    } catch (e) {
      res.sendStatus(500).send(e);
    }
  });

  router.get("/:id", checkTokenState, async (req, res) => {
    try {
      let filter = { "published": true };
      if (req.user) {
        if (req.user.role === 'admin') {
          filter = {};
        } else if (req.user.role === 'user') {
          filter = { $or: [{ "published": true }, { "user": mongoose.Types.ObjectId(req.user.id) }] };
        }
      }

      const artist = await Artist.findOne({ $and: [{ "_id": mongoose.Types.ObjectId(req.params.id) }, filter] });

      res.send(artist);
    } catch (e) {
      res.sendStatus(500).send(e);
    }
  });

  router.delete("/:id", [auth, permit('admin')], async (req, res) => {
    let artist = await Artist.findById(req.params.id).populate("user");
    if (!artist) {
      return res.status(400).send({ error: 'Incorrect artist id' });
    }

    try {
      await artist.delete();
      return res.send({ message: "Artist deleted successfully" });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  return router;
};


module.exports = createRouter;