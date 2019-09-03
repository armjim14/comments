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
  },
  change: {
    type: Boolean
  }
});

var articles = mongoose.model("comments", articleSchema);

module.exports = articles;
