const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  favoriteMovies: [{
    type: Schema.Types.ObjectId,
    ref: "Movie",
  }],
  watchedMovies: [{
    type: Schema.Types.ObjectId,
    ref: "Movie",
  }],
  queueMovies: [{
    type: Schema.Types.ObjectId,
    ref: "Movie",
  }],
  confirmationToken: String,
  confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);