var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: {
    type: String,
  },
  href: {
    type: String
  },
  comments: {
    type: Array
  }
});

var articles = mongoose.model("comments", articleSchema);

module.exports = articles;
