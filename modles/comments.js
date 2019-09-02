const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    comment: {
        type: String
    }
})

var comments = mongoose.model("comment", commentSchema);

module.exports = comments;