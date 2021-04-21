const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  options: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  question: String,
  options: [optionSchema],
  voted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

mongoose.exports = mongoose.model("Poll", pollSchema);
