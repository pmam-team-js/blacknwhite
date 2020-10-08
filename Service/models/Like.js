var mongoose = require("mongoose");

var likesSchema = mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    dated: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Likes", likesSchema);               
