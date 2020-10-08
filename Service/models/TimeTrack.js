var mongoose = require("mongoose");

var TimeTrackSchema = mongoose.Schema({
    TimeLogged: {
        type:Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    play:Boolean
});

module.exports = mongoose.model("TimeTrack", TimeTrackSchema);