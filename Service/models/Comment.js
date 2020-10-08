var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({    
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    profile:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        }        
    ],    
    text: String,
    dated: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Comments", commentSchema);