const mongoose = require("mongoose");
const {Schema} = mongoose;

const movieSchema = new Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [{type: Number}],
  original_language: String,
  original_title: String,
  overview: String,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  popularity: Number,
});

module.exports = mongoose.model("Movie", movieSchema);