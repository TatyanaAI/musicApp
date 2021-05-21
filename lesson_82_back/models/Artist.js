const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  info: String,
  photo: String,
  published: {
    type: Boolean,
    enum: [true, false],
    default: false 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

ArtistSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}'
})

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;