const { Schema, model } = require("mongoose");
require("./Celebrity.model");

const MovieModel = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: "Celebrity",
    },
  ],
});

const Movie = model("Movie", MovieModel);

module.exports = Movie;
