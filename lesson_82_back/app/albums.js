const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const multer = require('multer');
const path = require('path');
const config = require('../config');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const checkTokenState = require("../middleware/checkTokenState");
const Album = require("../models/Album");

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
  router.post("/", auth, upload.single('cover'), async (req, res) => {
    let result = await Album.findOne({ title: req.body.title });
    if (result) {
      return res.send(result);
    }
    const album = { ...req.body };
    album.user = req.user.id

   if (req.file) {
      album.cover = req.file.filename;
    }
    result = new Album(album);
 
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
      let album = await Album.findByIdAndUpdate(req.params.id, { "published": true }, { runValidators: true, new: true });
      if (!album) {
        return res.status(400).send({ error: 'Incorrect album id' });
      }
      res.send(album);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.get("/", checkTokenState, async (req, res) => {
    try {
      let filter = { "published": true };
      if (req.user && req.query.artist) {
        if (req.user.role === 'admin') {
          filter = { "artist": mongoose.Types.ObjectId(req.query.artist) };
        } else if (req.user.role === 'user') {
          filter = { $and: [{ $or: [{ "published": true }, { "user": mongoose.Types.ObjectId(req.user.id) }] }, { "artist": mongoose.Types.ObjectId(req.query.artist) }] };
        }
      } else if (req.user) {
        if (req.user.role === 'admin') {
          filter = {};
        } else if (req.user.role === 'user') {
          filter = { $or: [{ "published": true }, { "user": mongoose.Types.ObjectId(req.user.id) }] };
        }
      } else if (req.query.artist) {
        filter = { "published": true, "artist": mongoose.Types.ObjectId(req.query.artist) }
      }

      let albums = await Album.find(filter).sort({ "year": 1 }).populate("artist");
      res.send(albums);
    } catch (e) {
      console.error(e.message)
      res.sendStatus(500).send(e);;
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      let filter = { "published": true };
      if (req.user) {
        if (req.user.role === 'admin') {
          filter = {};
        } else if (req.user.role === 'user') {
          filter = { $or: [{ "published": true }, { "user": mongoose.Types.ObjectId(req.user.id) }] };
        }
      }
      const album = await Album.findOne({ $and: [{ "_id": mongoose.Types.ObjectId(req.params.id) }, filter] }).populate("artist");
      res.send(album);
    } catch (e) {
      console.error(e.message)
      res.sendStatus(500).send(e);;
    }
  });

  router.delete("/:id", [auth, permit('admin')], async (req, res) => {
    let album = await Album.findById(req.params.id).populate("user");
    if (!album) {
      return res.status(400).send({ error: 'Incorrect album id' });
    }
    try {
      await album.delete();
      return res.send({ message: "Album deleted successfully" });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  return router;
};

module.exports = createRouter;