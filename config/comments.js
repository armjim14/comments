const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    comment: {
        type: String
    }
})

var comment = mongoose.model("comment", commentSchema);

module.exports = comment;