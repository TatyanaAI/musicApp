const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  video: {
    type: String
  },
  published: {
    type: Boolean,
    enum: [true, false],
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

TrackSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}'
})

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;