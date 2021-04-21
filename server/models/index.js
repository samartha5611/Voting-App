const mongoose = require("mongoose");
// import "mongoose";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/vote", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports.User = require("./user");
module.exports.Poll = require("./poll");
