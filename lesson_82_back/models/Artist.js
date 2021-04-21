const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  info: String,
  photo: String
});

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;