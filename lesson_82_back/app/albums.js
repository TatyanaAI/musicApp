const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const config = require('../config');
const Album = require("../models/Album");
const Track = require("../models/Track");
const mongoose = require('mongoose');


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
  router.post("/", upload.single('cover'), async (req, res) => {
    let result = await Album.findOne({ title: req.body.title })
    if (result) {
      return res.send(result);
    }

    const album = { ...req.body };
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

  router.get("/", async (req, res) => {
    try {
      let filter = {}
      if (req.query.artist) {
        filter = { "artist": mongoose.Types.ObjectId(req.query.artist) }
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
      const album = await Album.findById(req.params.id).populate("artist");
      res.send(album);
    } catch (e) {
      console.error(e.message)
      res.sendStatus(500).send(e);;
    }
  });
  return router;
};

module.exports = createRouter;