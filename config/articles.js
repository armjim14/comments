var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({

  title: {
    type: String,
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments"
    }
  ]

});

var article = mongoose.model("User", articleSchema);

module.exports = article;